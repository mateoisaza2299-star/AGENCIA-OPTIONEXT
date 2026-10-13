import { supabase } from "./supabase.js";
import { authMessage, panelPath, showMessage, validEmail } from "./session.js";
import "./menu.js";
import "./nav-session.js";

const form = document.getElementById("register-form");
const button = document.getElementById("register-submit");

async function redirectIfSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;
  window.location.replace(await panelPath(session.user.id));
}

redirectIfSession();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;
  const confirm = form.confirm.value;
  if (!nombre || !email || !password || !confirm) {
    showMessage("form-error", "Completa todos los campos.");
    showMessage("form-note", "");
    return;
  }
  if (!validEmail(email)) {
    showMessage("form-error", "Escribe un correo válido.");
    showMessage("form-note", "");
    form.email.focus();
    return;
  }
  if (password.length < 6) {
    showMessage("form-error", "La contraseña debe tener al menos 6 caracteres.");
    showMessage("form-note", "");
    form.password.focus();
    return;
  }
  if (password !== confirm) {
    showMessage("form-error", "Las contraseñas no coinciden.");
    showMessage("form-note", "");
    form.confirm.focus();
    return;
  }
  showMessage("form-error", "");
  showMessage("form-note", "");
  const idle = button.textContent;
  button.disabled = true;
  button.textContent = "Creando cuenta…";
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nombre } },
    });
    if (error) {
      showMessage("form-error", authMessage(error));
      return;
    }
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        nombre,
        rol: "cliente",
      });
      const duplicate = profileError?.code === "23505";
      if (profileError && !duplicate && data.session) {
        showMessage("form-error", "La cuenta se creó, pero no pudimos guardar tu perfil. Inicia sesión e inténtalo de nuevo.");
        return;
      }
    }
    if (data.session) {
      window.location.assign("cliente.html");
      return;
    }
    showMessage("form-note", "Revisa tu correo para confirmar la cuenta. Después podrás iniciar sesión.");
    form.reset();
  } catch {
    showMessage("form-error", "No pudimos conectar. Intenta de nuevo.");
  } finally {
    button.disabled = false;
    button.textContent = idle;
  }
});
