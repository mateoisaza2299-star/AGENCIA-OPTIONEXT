/** PENDIENTE: número visible. No reemplazar por un dato inventado. */
export const PHONE_DISPLAY = "PENDIENTE"

/** PENDIENTE: teléfono para el enlace tel:. No reemplazar por un dato inventado. */
export const PHONE_TEL = "PENDIENTE"

/** PENDIENTE: perfil de Instagram. */
export const INSTAGRAM_URL = "PENDIENTE"

/** PENDIENTE: perfil de Facebook. La página actual no publica una URL. */
export const FACEBOOK_URL = "PENDIENTE"

/** PENDIENTE: perfil de LinkedIn. La página actual no publica una URL. */
export const LINKEDIN_URL = "PENDIENTE"

export const CONTACT_EMAIL = "mateoisaza2299@gmail.com"
export const EMAIL_SUBJECT = "Quiero agendar un diagnóstico"
export const DIAGNOSIS_MESSAGE = "Hola, quiero agendar un diagnóstico gratis para mi negocio."

export const isPending = (value: string) => value === "PENDIENTE"

export function whatsappHref(text = DIAGNOSIS_MESSAGE) {
  const digits = PHONE_TEL.replace(/\D/g, "")
  const base = digits ? `https://wa.me/${digits}` : "https://wa.me/"
  return `${base}?text=${encodeURIComponent(text)}`
}

export function mailtoHref(subject = EMAIL_SUBJECT) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
}

export function planQuote(name: string) {
  return `Hola, quiero cotizar ${name}.`
}
