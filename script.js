/* ============================================================================
   CONFIGURACIÓN — editar aquí
   El número de WhatsApp, el correo y las redes viven en este bloque.
   Los precios están solo en js/pricing-data.js.
   ========================================================================= */

// Reemplazar con el número real: código de país + número, sin + ni espacios.
const WHATSAPP_NUMBER = "573000000000";

// Reemplazar con el correo real de OPTIONEXT.
const CONTACT_EMAIL = "hola@optionext.com";

// Reemplazar "#" por los perfiles reales. Si sigue en "#", el enlace no abre otra pestaña.
const SOCIAL_LINKS = [
  { id: "instagram", href: "#" },
  { id: "facebook", href: "#" },
  { id: "linkedin", href: "#" },
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let selectedPlanName = "";

function formatPhone(number) {
  if (/^57\d{10}$/.test(number)) {
    return `+57 ${number.slice(2, 5)} ${number.slice(5, 8)} ${number.slice(8)}`;
  }
  return `+${number}`;
}

function whatsappUrl(text) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

function initWhatsApp() {
  document.querySelectorAll("[data-whatsapp]").forEach((node) => {
    node.setAttribute("href", whatsappUrl(""));
  });

  const display = formatPhone(WHATSAPP_NUMBER);
  document.querySelectorAll("[data-whatsapp-display]").forEach((node) => {
    node.textContent = display;
  });

  const email = document.getElementById("footer-email");
  if (email) {
    email.textContent = CONTACT_EMAIL;
    email.href = `mailto:${CONTACT_EMAIL}`;
  }

  document.querySelectorAll("[data-social]").forEach((link) => {
    const item = SOCIAL_LINKS.find((entry) => entry.id === link.dataset.social);
    if (!item) return;
    link.href = item.href;
    if (item.href.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });
}

function initNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("menu-toggle");
  const panel = document.getElementById("nav-panel");
  const label = document.getElementById("menu-label");

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open) => {
    panel.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    label.textContent = open ? "Cerrar menú" : "Abrir menú";
  };

  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) setMenu(false);
  });

  const links = [...document.querySelectorAll(".nav__links a")];
  const sections = links
    .map((link) => {
      const href = link.getAttribute("href") || "";
      if (!href.startsWith("#")) return null;
      return document.querySelector(href);
    })
    .filter(Boolean);

  if (!("IntersectionObserver" in window)) return;
  const byId = new Map(sections.map((section) => [section.id, section]));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const id = (link.getAttribute("href") || "").slice(1);
        link.classList.toggle("is-active", byId.get(id) === entry.target);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });

  sections.forEach((section) => observer.observe(section));
}

function initReveal() {
  if (reduceMotion || !("IntersectionObserver" in window)) return;
  const nodes = [...document.querySelectorAll(".reveal")];
  nodes.forEach((node) => node.classList.add("reveal--pending"));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });
  nodes.forEach((node) => observer.observe(node));
}

const FIELD_MESSAGES = {
  nombre: "Escribe tu nombre.",
  negocio: "Escribe el nombre del negocio.",
  telefono: "Escribe un teléfono o WhatsApp.",
  mensaje: "Cuéntanos brevemente qué pasa en el negocio.",
};

function initForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const success = document.getElementById("form-success");
  const fields = [...form.querySelectorAll("input, textarea")];

  fields.forEach((field) => {
    field.addEventListener("input", () => field.setCustomValidity(""));
  });

  form.addEventListener("submit", (event) => {
    // No hay servidor conectado: no se hace fetch ni se envía el formulario a ningún backend.
    event.preventDefault();

    let invalid = null;
    fields.forEach((field) => {
      field.setCustomValidity("");
      const value = field.value.trim();
      if (!value) {
        field.setCustomValidity(FIELD_MESSAGES[field.name] || "Completa este campo.");
      } else if (field.validity.tooShort) {
        field.setCustomValidity("Revisa el teléfono: se ve incompleto.");
      }
      if (!field.checkValidity() && !invalid) invalid = field;
    });

    if (invalid) {
      invalid.reportValidity();
      invalid.focus();
      return;
    }

    const nombre = form.nombre.value.trim();
    const negocio = form.negocio.value.trim();
    const telefono = form.telefono.value.trim();
    const mensaje = form.mensaje.value.trim();
    const lines = [
      "Hola, equipo OPTIONEXT. Quiero agendar un diagnóstico.",
      `Nombre: ${nombre}`,
      `Negocio: ${negocio}`,
      `Teléfono: ${telefono}`,
      selectedPlanName ? `Plan de interés: ${selectedPlanName}` : "Plan de interés: aún no elijo",
      `Mensaje: ${mensaje}`,
    ];

    document.getElementById("success-name").textContent = nombre;
    document.getElementById("success-whatsapp").href = whatsappUrl(lines.join("\n"));
    form.hidden = true;
    success.hidden = false;
    success.focus();
  });

  document.getElementById("edit-form").addEventListener("click", () => {
    success.hidden = true;
    form.hidden = false;
    form.nombre.focus();
  });
}

initWhatsApp();
initNav();
initReveal();
initForm();
