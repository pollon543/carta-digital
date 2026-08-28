(function () {
  "use strict";

  const DISHES = [
    {
      src: "assets/dishes/pollo.png",
      alt: "Pollo a la brasa",
    },
    {
      src: "assets/dishes/chaufa.png",
      alt: "Arroz chaufa",
    },
    {
      src: "assets/dishes/papas.png",
      alt: "Papas fritas",
    },
    {
      src: "assets/dishes/ensalada.png",
      alt: "Ensalada fresca",
    },
    {
      src: "assets/dishes/combo.png",
      alt: "Combo familiar",
    },
    {
      src: "assets/dishes/nuggets.png",
      alt: "Nuggets crocantes",
    },
    {
      src: "assets/dishes/lomo.png",
      alt: "Lomo saltado",
    },
    {
      src: "assets/dishes/bebida.png",
      alt: "Bebida refrescante",
    },
  ];

  const stage = document.getElementById("carousel-stage");
  const floor = document.getElementById("carousel-floor");
  if (!stage) return;

  const total = DISHES.length;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let rotation = 0;
  const speed = prefersReducedMotion ? 0.0012 : 0.0042;
  let radius = 0;
  let baseSize = 0;
  let items = [];
  let rafId = null;

  function getMetrics() {
    const w = window.innerWidth;
    radius = Math.min(w * 0.36, 185);
    baseSize = Math.min(w * 0.26, 148);
  }

  function buildCarousel() {
    stage.innerHTML = "";
    items = [];

    const fragment = document.createDocumentFragment();

    DISHES.forEach(function (dish, index) {
      const item = document.createElement("div");
      item.className = "carousel-item";

      const img = document.createElement("img");
      img.src = dish.src;
      img.alt = dish.alt;
      img.loading = index < 3 ? "eager" : "lazy";
      img.decoding = "async";
      img.draggable = false;

      item.appendChild(img);
      fragment.appendChild(item);
      items.push({ el: item, index: index });
    });

    stage.appendChild(fragment);
  }

  function depthFromAngle(angle) {
    return (Math.cos(angle) + 1) / 2;
  }

  function updateCarousel() {
    let heroDepth = -1;
    let heroX = 0;

    items.forEach(function (entry) {
      const angle = rotation + (entry.index / total) * Math.PI * 2;
      const depth = depthFromAngle(angle);

      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const lift = (depth - 0.5) * 34;

      /* Zoom cinematográfico: el plato al frente domina la escena */
      const scale = 0.34 + Math.pow(depth, 1.35) * 0.98;
      const opacity = 0.28 + depth * 0.72;
      const blur = Math.pow(1 - depth, 1.8) * 2.2;

      const size = baseSize * scale;
      const half = size / 2;

      entry.el.style.width = size + "px";
      entry.el.style.height = size + "px";
      entry.el.style.marginLeft = -half + "px";
      entry.el.style.marginTop = -half + "px";
      entry.el.style.opacity = String(opacity);
      entry.el.style.zIndex = String(Math.round(depth * 1000));
      entry.el.style.transform =
        "translate3d(" + x.toFixed(2) + "px, " + lift.toFixed(2) + "px, " + z.toFixed(2) + "px)";

      const img = entry.el.querySelector("img");
      if (img) {
        const shadowY = Math.round(10 + depth * 26);
        const shadowBlur = Math.round(14 + depth * 22);
        const shadowAlpha = (0.1 + depth * 0.26).toFixed(2);

        img.style.filter =
          "drop-shadow(0 " +
          shadowY +
          "px " +
          shadowBlur +
          "px rgba(0,0,0," +
          shadowAlpha +
          "))" +
          (blur > 0.15 ? " blur(" + blur.toFixed(2) + "px)" : "");

        img.style.transform = "scale(" + (0.92 + depth * 0.12).toFixed(3) + ")";
      }

      const isHero = depth > 0.86;
      entry.el.classList.toggle("is-hero", isHero);

      if (depth > heroDepth) {
        heroDepth = depth;
        heroX = x;
      }
    });

    if (floor) {
      const shadowScale = 0.48 + heroDepth * 0.62;
      const shadowOpacity = 0.05 + heroDepth * 0.16;
      floor.style.transform =
        "translate(calc(-50% + " +
        (heroX * 0.42).toFixed(1) +
        "px), -50%) scale(" +
        shadowScale.toFixed(3) +
        ", " +
        (shadowScale * 0.42).toFixed(3) +
        ")";
      floor.style.opacity = String(shadowOpacity);
    }
  }

  function tick() {
    rotation += speed;
    updateCarousel();
    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (rafId) cancelAnimationFrame(rafId);
    getMetrics();
    updateCarousel();
    rafId = requestAnimationFrame(tick);
  }

  buildCarousel();
  start();

  window.addEventListener("resize", function () {
    getMetrics();
    updateCarousel();
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!rafId) {
      rafId = requestAnimationFrame(tick);
    }
  });
})();
