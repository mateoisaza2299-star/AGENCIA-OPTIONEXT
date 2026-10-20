export const whatsappNumber = "573108813365";
export const phoneDisplay = "310 881 3365";
export const phoneTel = "+573108813365";
export const contactEmail = "mateoisaza2299@gmail.com";
export const diagnosisMessage = "Hola, quiero agendar un diagnóstico gratis para mi negocio.";
export const emailSubject = "Quiero agendar un diagnóstico";

const bookingLabels = new Set([
  "Agenda un diagnóstico",
  "Agendar diagnóstico gratis",
  "Por WhatsApp",
  "WhatsApp",
]);

export function whatsappHref(text = diagnosisMessage) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function mailtoHref(subject = emailSubject) {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`;
}

export function planMessage(name) {
  return `Hola, me interesa el plan ${name} y quiero agendar un diagnóstico.`;
}

export function applyContact() {
  const bookingHref = whatsappHref();
  document.querySelectorAll("a").forEach((link) => {
    if (link.id === "success-whatsapp") return;
    const label = link.textContent.replace(/\s+/g, " ").trim();
    if (!link.hasAttribute("data-whatsapp") && !bookingLabels.has(label)) return;
    link.href = bookingHref;
    link.target = "_blank";
    link.rel = "noopener";
  });
  document.querySelectorAll("[data-phone]").forEach((link) => {
    link.href = `tel:${phoneTel}`;
    link.textContent = phoneDisplay;
  });
  document.querySelectorAll("[data-email]").forEach((link) => {
    link.href = mailtoHref();
    link.textContent = contactEmail;
  });
}
