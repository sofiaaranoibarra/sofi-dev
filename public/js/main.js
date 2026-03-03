document.addEventListener("DOMContentLoaded", () => {
  console.log("main.js cargó ✅");

  // =========================
  // CONTACT FORM
  // =========================
  const contactForm = document.getElementById("contactForm");

  contactForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result.message);
    } catch (err) {
      console.error("Error enviando contacto:", err);
      alert("Hubo un error enviando el mensaje.");
    }
  });

  // =========================
  // NAVBAR SCROLL EFFECT
  // =========================
  const navbar = document.querySelector(".navbar");

  function updateNavbar() {
    if (!navbar) return;
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar);

  // =========================
  // DARK MODE (persistencia)
  // =========================
  const themeToggle = document.getElementById("themeToggle");
  const themeIconPath = document.getElementById("themeIconPath");

  // SVG paths (minimalistas)
  const ICON_SUN = "M12 4v2M12 18v2M4 12h2M18 12h2M6.34 6.34l1.41 1.41M16.24 16.24l1.41 1.41M6.34 17.66l1.41-1.41M16.24 7.76l1.41-1.41M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8Z";
  const ICON_MOON = "M21 12.8A7.5 7.5 0 0 1 11.2 3a6.8 6.8 0 1 0 9.8 9.8Z";

  // Si nunca eligió tema, usar preferencia del sistema
  if (!localStorage.getItem("darkMode")) {
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    localStorage.setItem("darkMode", prefersDark ? "enabled" : "disabled");
  }

  function applyTheme() {
    const enabled = localStorage.getItem("darkMode") === "enabled";
    document.body.classList.toggle("dark-mode", enabled);

    // En dark mode mostramos "sol" (para pasar a claro), en claro mostramos "luna"
    if (themeIconPath) themeIconPath.setAttribute("d", enabled ? ICON_SUN : ICON_MOON);

    themeToggle?.setAttribute("aria-pressed", String(enabled));
  }

  applyTheme();

  themeToggle?.addEventListener("click", () => {
    const enabled = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", enabled ? "disabled" : "enabled");
    applyTheme();
  });

  // =========================
  // MOBILE NAV (hamburguesa)
  // =========================
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const navBackdrop = document.getElementById("navBackdrop");

  function openMenu() {
    if (!navLinks || !navBackdrop || !navToggle) return;
    navLinks.classList.add("open");
    navBackdrop.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú");
    navToggle.textContent = "✕";
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!navLinks || !navBackdrop || !navToggle) return;
    navLinks.classList.remove("open");
    navBackdrop.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
    navToggle.textContent = "☰";
    document.body.style.overflow = "";
  }

  navToggle?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
  });

  navBackdrop?.addEventListener("click", closeMenu);

  navLinks?.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && navLinks.classList.contains("open")) {
      closeMenu();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks?.classList.contains("open")) {
      closeMenu();
    }
  });

  // =========================
  // DIVIDER REVEAL (IntersectionObserver)
  // =========================
  const divider = document.getElementById("divider");

  if (divider) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            divider.classList.add("visible");
            obs.unobserve(divider); // 👈 se activa una vez y listo
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(divider);
  }
});