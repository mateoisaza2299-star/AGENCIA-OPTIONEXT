import { supabase } from "./supabase.js";

export function formatCOP(amount) {
  const withDots = String(Math.round(Number(amount) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${withDots}`;
}

export function formatDate(value) {
  if (!value) return "—";
  const iso = String(value);
  const date = new Date(iso.includes("T") ? iso : `${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

export function statusLabel(estado) {
  if (estado === "pagada") return "Pagada";
  if (estado === "pendiente") return "Pendiente";
  if (estado === "vencida") return "Vencida";
  return estado || "—";
}

export function showMessage(id, message) {
  const node = document.getElementById(id);
  if (!node) return;
  node.hidden = !message;
  node.textContent = message || "";
}

export function authMessage(error) {
  const text = `${error?.message || ""} ${error?.code || ""}`.toLowerCase();
  if (text.includes("invalid login") || text.includes("invalid_credentials")) return "Correo o contraseña incorrectos.";
  if (text.includes("email not confirmed")) return "Confirma tu correo antes de entrar.";
  if (text.includes("already registered") || text.includes("user already")) return "Ese correo ya tiene una cuenta. Inicia sesión.";
  if (text.includes("password")) return "La contraseña debe tener al menos 6 caracteres.";
  if (text.includes("email")) return "Escribe un correo válido.";
  return "No pudimos completar la acción. Intenta de nuevo.";
}

export function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function panelPath(userId) {
  const { data } = await supabase.from("profiles").select("rol").eq("id", userId).maybeSingle();
  return data?.rol === "admin" ? "admin.html" : "cliente.html";
}

export async function requireRole(role) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.replace("login.html");
    return null;
  }
  const path = await panelPath(session.user.id);
  const expected = role === "admin" ? "admin.html" : "cliente.html";
  if (path !== expected) {
    window.location.replace(path);
    return null;
  }
  supabase.auth.onAuthStateChange((event, next) => {
    if (event === "SIGNED_OUT" || !next) window.location.replace("login.html");
  });
  return session;
}
