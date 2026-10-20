import { applyContact } from "./config.js";

applyContact();

const toggle = document.getElementById("menu-toggle");
const panel = document.getElementById("nav-panel");
const label = document.getElementById("menu-label");
const nav = document.getElementById("nav");

if (toggle && panel && nav) {
  const setOpen = (open) => {
    panel.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (label) label.textContent = open ? "Cerrar menú" : "Abrir menú";
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  panel.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) setOpen(false);
  });
}
