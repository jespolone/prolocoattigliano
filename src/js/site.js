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
})();
