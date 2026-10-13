import { supabase } from "./supabase.js";
import { authMessage, panelPath, showMessage, validEmail } from "./session.js";
import "./menu.js";
import "./nav-session.js";

const form = document.getElementById("login-form");
const button = document.getElementById("login-submit");

async function redirectIfSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;
  window.location.replace(await panelPath(session.user.id));
}

supabase.auth.onAuthStateChange((event, session) => {
  if (event !== "SIGNED_IN" || !session) return;
  const userId = session.user.id;
  setTimeout(() => {
    panelPath(userId).then((path) => window.location.replace(path));
  }, 0);
});

redirectIfSession();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = form.email.value.trim();
  const password = form.password.value;
  if (!email && !password) {
    showMessage("form-error", "Escribe tu correo y tu contraseña.");
    form.email.focus();
    return;
  }
  if (!email) {
    showMessage("form-error", "Escribe tu correo.");
    form.email.focus();
    return;
  }
  if (!validEmail(email)) {
    showMessage("form-error", "Escribe un correo válido.");
    form.email.focus();
    return;
  }
  if (!password) {
    showMessage("form-error", "Escribe tu contraseña.");
    form.password.focus();
    return;
  }
  showMessage("form-error", "");
  const idle = button.textContent;
  button.disabled = true;
  button.textContent = "Entrando…";
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      showMessage("form-error", authMessage(error));
      return;
    }
    window.location.assign(await panelPath(data.user.id));
  } catch {
    showMessage("form-error", "No pudimos conectar. Intenta de nuevo.");
  } finally {
    button.disabled = false;
    button.textContent = idle;
  }
});
