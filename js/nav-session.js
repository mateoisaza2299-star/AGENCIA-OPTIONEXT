import { supabase } from "./supabase.js";
import { panelPath } from "./session.js";

export async function applyNavSession(session) {
  const slot = document.getElementById("nav-session");
  if (!slot) return;
  slot.replaceChildren();
  if (!session) {
    const link = document.createElement("a");
    link.className = "btn btn--ghost btn--sm";
    link.href = "login.html";
    link.textContent = "Iniciar sesión";
    slot.append(link);
    return;
  }
  const panel = document.createElement("a");
  panel.className = "btn btn--ghost btn--sm";
  panel.href = "cliente.html";
  panel.textContent = "Mi panel";
  const logout = document.createElement("button");
  logout.type = "button";
  logout.className = "btn btn--primary btn--sm";
  logout.textContent = "Cerrar sesión";
  logout.addEventListener("click", async () => {
    logout.disabled = true;
    logout.textContent = "Saliendo…";
    await supabase.auth.signOut();
  });
  slot.append(panel, logout);
  panel.href = await panelPath(session.user.id);
}

async function syncNav() {
  const { data: { session } } = await supabase.auth.getSession();
  await applyNavSession(session);
}

supabase.auth.onAuthStateChange((_event, session) => {
  setTimeout(() => {
    applyNavSession(session);
  }, 0);
});

syncNav();
