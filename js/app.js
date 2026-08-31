(function () {
  "use strict";

  const config = window.CARTA_CONFIG || {};
  const perf = config.rendimiento || {};
  const platos = Array.isArray(config.platos) ? config.platos : [];

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const optimizeImages = perf.optimizarImagenes !== false;
  const logoWidth = perf.anchoLogo || 320;
  const dishWidth = isMobile ? perf.anchoPlato || 340 : 420;
  const quality = perf.calidad || 80;

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

  function smoothstep(t) {
    t = Math.max(0, Math.min(1, t));
    return t * t * (3 - 2 * t);
  }

  function easeOutCubic(t) {
    t = Math.max(0, Math.min(1, t));
    return 1 - Math.pow(1 - t, 3);
  }

  function easeInOutCubic(t) {
    t = Math.max(0, Math.min(1, t));
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
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

  DISHES.forEach(function (d) {
    preloadImage(d.src);
  });

  var stage = document.getElementById("carousel-stage");
  if (!stage) return;

  if (DISHES.length === 0) {
    stage.innerHTML =
      '<p class="carousel-empty">Agrega imágenes en <strong>js/config.js</strong></p>';
    return;
  }

  var total = DISHES.length;
  var rotation = 0;
  /* rad/segundo — móvil más rápido; independiente del FPS */
  var speedPerSec = prefersReducedMotion ? 0.25 : isMobile ? 0.72 : 0.42;
  var radiusX = 0;
  var radiusY = 0;
  var plateSize = 0;
  var items = [];
  var rafId = null;
  var lastTs = 0;

  /* Anillo elíptico — todos los platos orbitan como en la referencia */
  var SCALE_BACK = 0.4;
  var SCALE_FRONT = 1.18;

  function getMetrics() {
    var w = window.innerWidth;
    radiusX = Math.min(w * 0.36, 150);
    radiusY = Math.min(w * 0.13, 46);
    plateSize = Math.min(w * 0.3, 128);
  }

  function buildCarousel() {
    stage.innerHTML = "";
    items = [];

    var fragment = document.createDocumentFragment();
    var half = plateSize / 2;

    DISHES.forEach(function (dish, index) {
      var item = document.createElement("div");
      item.className = "carousel-item";

      var frame = document.createElement("div");
      frame.className = "carousel-item__frame";

      var img = document.createElement("img");
      img.alt = dish.alt;
      img.decoding = "async";
      img.draggable = false;
      img.src = dish.src;
      img.loading = "eager";
      if (index === 0) img.fetchPriority = "high";

      img.addEventListener("error", function () {
        item.classList.add("is-broken");
        img.alt = "Imagen no disponible: " + dish.alt;
      });

      frame.appendChild(img);
      item.appendChild(frame);

      item.style.width = plateSize + "px";
      item.style.height = plateSize + "px";
      item.style.marginLeft = -half + "px";
      item.style.marginTop = -half + "px";

      fragment.appendChild(item);
      items.push({ el: item, index: index });
    });

    stage.appendChild(fragment);
  }

  function updateCarousel() {
    items.forEach(function (entry) {
      var angle = rotation + (entry.index / total) * Math.PI * 2;
      var depth = (Math.cos(angle) + 1) / 2;

      /* Órbita elíptica: atrás arriba y pequeño → adelante abajo y grande */
      var prominence = easeInOutCubic(smoothstep(depth));
      var scale = lerp(SCALE_BACK, SCALE_FRONT, easeOutCubic(prominence));
      var x = Math.sin(angle) * radiusX;
      var y = (1 - depth) * -radiusY;

      entry.el.style.visibility = "visible";
      entry.el.style.opacity = lerp(0.62, 1, prominence).toFixed(3);
      entry.el.style.zIndex = String(Math.round(depth * 1000));
      entry.el.style.transform =
        "translate3d(" +
        x.toFixed(2) +
        "px, " +
        y.toFixed(2) +
        "px, 0) scale(" +
        scale.toFixed(4) +
        ")";

      var img = entry.el.querySelector("img");
      if (img) {
        img.style.opacity = lerp(0.7, 1, prominence).toFixed(3);
        var shadowY = lerp(2, 12, prominence);
        var shadowBlur = lerp(6, 16, prominence);
        var shadowAlpha = lerp(0.05, 0.18, prominence);
        img.style.filter =
          "drop-shadow(0 " +
          shadowY.toFixed(1) +
          "px " +
          shadowBlur.toFixed(1) +
          "px rgba(0,0,0," +
          shadowAlpha.toFixed(2) +
          "))";
      }

      entry.el.classList.toggle("is-leader", depth > 0.92);
    });
  }

  function tick(ts) {
    if (!lastTs) lastTs = ts;
    var dt = Math.min((ts - lastTs) / 1000, 0.05);
    lastTs = ts;
    rotation += speedPerSec * dt;
    updateCarousel();
    rafId = requestAnimationFrame(tick);
  }

  getMetrics();
  buildCarousel();
  updateCarousel();
  rafId = requestAnimationFrame(tick);

  var resizeTimer;
  window.addEventListener(
    "resize",
    function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        getMetrics();
        var half = plateSize / 2;
        items.forEach(function (entry) {
          entry.el.style.width = plateSize + "px";
          entry.el.style.height = plateSize + "px";
          entry.el.style.marginLeft = -half + "px";
          entry.el.style.marginTop = -half + "px";
        });
        updateCarousel();
      }, 150);
    },
    { passive: true }
  );

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      lastTs = 0;
    } else if (!rafId) {
      lastTs = 0;
      rafId = requestAnimationFrame(tick);
    }
  });
})();
