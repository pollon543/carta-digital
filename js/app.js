(function () {
  "use strict";

  const config = window.CARTA_CONFIG || {};
  const perf = config.rendimiento || {};
  const platos = Array.isArray(config.platos) ? config.platos : [];

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const optimizeImages = perf.optimizarImagenes !== false;
  const logoWidth = perf.anchoLogo || 320;
  const dishWidth = isMobile ? perf.anchoPlato || 280 : 400;
  const quality = perf.calidad || 78;

  /** Reduce peso de imágenes ImageKit (webp automático, tamaño menor) */
  function optimizeImageUrl(url, width) {
    if (!optimizeImages || !url || url.indexOf("ik.imagekit.io") === -1) {
      return url;
    }

    try {
      var parsed = new URL(url);
      var parts = parsed.pathname.split("/").filter(Boolean);

      if (parts.length < 2 || parts[1].indexOf("tr:") === 0) {
        return url;
      }

      var account = parts[0];
      var path = parts.slice(1).join("/");
      var transform = "tr:w-" + width + ",q-" + quality + ",f-auto";

      parsed.pathname = "/" + account + "/" + transform + "/" + path;
      return parsed.toString();
    } catch (e) {
      return url;
    }
  }

  function preloadImage(url) {
    if (!url) return;
    var link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  }

  const DISHES = platos
    .filter(function (p) {
      return p && typeof p.url === "string" && p.url.trim() !== "";
    })
    .map(function (p) {
      return {
        src: optimizeImageUrl(p.url.trim(), dishWidth),
        alt: p.nombre || "Plato El Pollón",
      };
    });

  /* Logo y botón INGRESAR */
  var logoEl = document.querySelector(".brand-logo");
  var logoUrl = typeof config.logoUrl === "string" ? config.logoUrl.trim() : "";
  var logoOptimized = optimizeImageUrl(logoUrl, logoWidth);

  if (logoEl && logoUrl && logoUrl.indexOf("PEGA_AQUI") === -1) {
    preloadImage(logoOptimized);
    logoEl.src = logoOptimized;
    logoEl.width = logoWidth;
    logoEl.height = Math.round(logoWidth * 0.56);
  } else if (logoEl) {
    logoEl.classList.add("brand-logo--pending");
    logoEl.alt = "Agrega logoUrl en js/config.js";
  }

  var btnIngresar = document.querySelector(".btn-ingresar");
  if (btnIngresar && config.ingresarUrl) {
    btnIngresar.href = config.ingresarUrl;
  }

  /* Precargar los 2 primeros platos (lo que se ve primero) */
  DISHES.slice(0, 2).forEach(function (d) {
    preloadImage(d.src);
  });

  var stage = document.getElementById("carousel-stage");
  var floor = document.getElementById("carousel-floor");
  if (!stage) return;

  if (DISHES.length === 0) {
    stage.innerHTML =
      '<p class="carousel-empty">Agrega imágenes en <strong>js/config.js</strong></p>';
    return;
  }

  document.body.classList.toggle("is-mobile", isMobile);

  var total = DISHES.length;
  var rotation = 0;
  var speed = prefersReducedMotion ? 0.0012 : isMobile ? 0.0075 : 0.0055;
  var radius = 0;
  var baseSize = 0;
  var items = [];
  var rafId = null;

  function getMetrics() {
    var w = window.innerWidth;
    radius = Math.min(w * 0.36, 185);
    baseSize = Math.min(w * 0.26, 148);
  }

  function loadImageLazy(img, src) {
    if (img.dataset.loaded === "1") return;

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              img.src = src;
              img.dataset.loaded = "1";
              observer.disconnect();
            }
          });
        },
        { rootMargin: "120px" }
      );
      observer.observe(img);
    } else {
      img.src = src;
      img.dataset.loaded = "1";
    }
  }

  function buildCarousel() {
    stage.innerHTML = "";
    items = [];

    var fragment = document.createDocumentFragment();

    DISHES.forEach(function (dish, index) {
      var item = document.createElement("div");
      item.className = "carousel-item";

      var img = document.createElement("img");
      img.alt = dish.alt;
      img.decoding = "async";
      img.draggable = false;
      img.width = dishWidth;
      img.height = dishWidth;

      if (index < 2) {
        img.src = dish.src;
        img.loading = "eager";
        img.fetchPriority = index === 0 ? "high" : "auto";
        img.dataset.loaded = "1";
      } else {
        img.loading = "lazy";
        loadImageLazy(img, dish.src);
      }

      img.addEventListener("error", function () {
        item.classList.add("is-broken");
        img.alt = "Imagen no disponible: " + dish.alt;
      });

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
    var heroDepth = -1;
    var heroX = 0;

    items.forEach(function (entry) {
      var angle = rotation + (entry.index / total) * Math.PI * 2;
      var depth = depthFromAngle(angle);

      var x = Math.sin(angle) * radius;
      var z = Math.cos(angle) * radius;
      var lift = (depth - 0.5) * 34;

      var scale = 0.34 + Math.pow(depth, 1.35) * 0.98;
      var opacity = 0.28 + depth * 0.72;

      var size = baseSize * scale;
      var half = size / 2;

      entry.el.style.width = size + "px";
      entry.el.style.height = size + "px";
      entry.el.style.marginLeft = -half + "px";
      entry.el.style.marginTop = -half + "px";
      entry.el.style.opacity = "1";
      entry.el.style.zIndex = String(Math.round(depth * 1000));
      entry.el.style.transform =
        "translate3d(" + x.toFixed(1) + "px, " + lift.toFixed(1) + "px, " + z.toFixed(1) + "px)";

      var img = entry.el.querySelector("img");
      if (img) {
        img.style.opacity = String(opacity);
        img.style.transform = "scale(" + (0.92 + depth * 0.12).toFixed(2) + ")";
        img.style.filter = "none";
      }

      var isHero = depth > 0.86;
      entry.el.classList.toggle("is-hero", isHero);

      if (depth > heroDepth) {
        heroDepth = depth;
        heroX = x;
      }
    });

    if (floor) {
      var shadowScale = 0.48 + heroDepth * 0.62;
      var shadowOpacity = 0.05 + heroDepth * 0.16;
      floor.style.transform =
        "translate(calc(-50% + " +
        (heroX * 0.42).toFixed(0) +
        "px), -50%) scale(" +
        shadowScale.toFixed(2) +
        ", " +
        (shadowScale * 0.42).toFixed(2) +
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

  var resizeTimer;
  window.addEventListener(
    "resize",
    function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        getMetrics();
        updateCarousel();
      }, 150);
    },
    { passive: true }
  );

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!rafId) {
      rafId = requestAnimationFrame(tick);
    }
  });
})();
