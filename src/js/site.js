(function () {
  var header = document.getElementById("site-header");
  var burger = document.getElementById("hamburger");
  var menu = document.getElementById("mobile-menu");

  function setOpen(open) {
    menu.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  }

  burger.addEventListener("click", function () {
    setOpen(!menu.classList.contains("open"));
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Hero: dissolvenza tra le foto (la prima è già caricata, le altre dopo il load)
  var slides = document.querySelectorAll(".hero-slide");
  if (slides.length > 1) {
    window.addEventListener("load", function () {
      slides.forEach(function (s) {
        if (s.dataset.bg) s.style.backgroundImage = "url('" + s.dataset.bg + "')";
      });
    });
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var current = 0;
      setInterval(function () {
        if (document.hidden) return;
        slides[current].classList.remove("active");
        current = (current + 1) % slides.length;
        slides[current].classList.add("active");
      }, 6000);
    }
  }

  // Consenso cookie: la mappa Google viene caricata solo dopo "Accetta"/"Mostra la mappa".
  var CONSENT_KEY = "cookieConsent"; // "all" | "necessary"
  var banner = document.getElementById("cookie-banner");
  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function loadMaps() {
    document.querySelectorAll(".map-consent").forEach(function (box) {
      var iframe = document.createElement("iframe");
      iframe.className = "map-embed";
      iframe.loading = "lazy";
      iframe.title = box.dataset.mapTitle || "Mappa";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.src = box.dataset.mapSrc;
      box.replaceWith(iframe);
    });
  }
  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
    banner.hidden = true;
    if (value === "all") loadMaps();
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-consent-accept]")) setConsent("all");
    else if (e.target.closest("[data-consent-reject]")) setConsent("necessary");
    else if (e.target.closest("[data-consent-reset]")) {
      try { localStorage.removeItem(CONSENT_KEY); } catch (err) {}
      location.reload();
    }
  });
  var consent = getConsent();
  if (consent === "all") loadMaps();
  else if (!consent) banner.hidden = false;
})();
