import logo from "@/assets/optionext-logo.webp"
import {
  CONTACT_EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  isPending,
  mailtoHref,
  whatsappHref,
} from "@/config"
import { appHref } from "@/lib/path"

const map = [
  ["/#nosotros", "Sobre nosotros"],
  ["/#servicios", "Servicios"],
  ["/precios", "Precios"],
  ["/#proceso", "Cómo trabajamos"],
  ["/#testimonios", "Testimonios"],
  ["/#contacto", "Contacto"],
] as const

const socials = [
  { label: "Instagram", href: INSTAGRAM_URL, icon: "instagram" },
  { label: "Facebook", href: FACEBOOK_URL, icon: "facebook" },
  { label: "LinkedIn", href: LINKEDIN_URL, icon: "linkedin" },
] as const

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090c18]">
      <div className="mx-auto grid w-full max-w-[1120px] gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <a className="flex items-center gap-3 no-underline" href={appHref("/#inicio")}>
            <img src={logo} width={56} height={56} alt="" className="h-14 w-14 rounded-full" />
            <span className="font-display text-sm font-semibold tracking-[0.16em] text-white">OPTIONEXT</span>
          </a>
          <p className="mt-4 max-w-xs text-[#d6d1e8]">Diagnóstico y soluciones digitales para MIPYMES y negocios locales.</p>
        </div>
        <div>
          <h2 className="font-display text-sm font-semibold tracking-wide text-white">Mapa</h2>
          <ul className="mt-4 space-y-2">
            {map.map(([href, label]) => (
              <li key={href}>
                <a className="text-[#d6d1e8] no-underline hover:text-white" href={appHref(href)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm font-semibold tracking-wide text-white">Contacto</h2>
          <p className="mt-4 text-[#d6d1e8]">Sabana de Occidente, Cundinamarca</p>
          <p className="mt-2">
            <a className="text-[#d6d1e8] no-underline hover:text-white" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </p>
          <p className="mt-2">
            {isPending(PHONE_TEL) ? (
              <span>{PHONE_DISPLAY}</span>
            ) : (
              <a className="text-[#d6d1e8] no-underline hover:text-white" href={`tel:${PHONE_TEL}`}>
                {PHONE_DISPLAY}
              </a>
            )}
          </p>
          <p className="mt-2">
            <a className="text-[#d6d1e8] no-underline hover:text-white" href={mailtoHref()}>
              {CONTACT_EMAIL}
            </a>
          </p>
          <ul className="mt-4 flex gap-3" aria-label="Redes sociales">
            {socials.map(({ label, href, icon }) => (
              <li key={label}>
                {isPending(href) ? (
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white" role="img" aria-label={`${label} (PENDIENTE)`} title="PENDIENTE">
                    <SocialIcon name={icon} />
                  </span>
                ) : (
                  <a className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <SocialIcon name={icon} />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[1120px] px-4 py-5 text-sm text-[#d6d1e8]">© 2026 OPTIONEXT · Sabana de Occidente, Cundinamarca</p>
      </div>
    </footer>
  )
}

function SocialIcon({ name }: { name: "instagram" | "facebook" | "linkedin" }) {
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" />
      </svg>
    )
  }
  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M14 8.5V7.2c0-.7.5-1.1 1.2-1.1H17V3.4h-2.1C12.2 3.4 11 4.8 11 7v1.5H9v2.6h2V20h3v-8.9h2.1l.4-2.6H14Z" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 10.5V16M8 7.8v.2M12 16v-3.3a1.8 1.8 0 0 1 3.2-1.2c.2.3.3.8.3 1.2V16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
