import { Menu, X } from "lucide-react"
import { useEffect, useId, useState } from "react"
import logo from "@/assets/optionext-logo.webp"
import { DIAGNOSIS_MESSAGE, whatsappHref } from "@/config"
import { appHref } from "@/lib/path"

const links = [
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/precios", label: "Precios" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#contacto", label: "Contacto" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0c1020]/90 backdrop-blur-md">
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <div className="mx-auto flex h-[76px] w-full max-w-[1120px] items-center justify-between gap-4 px-4">
        <a className="flex items-center gap-3 no-underline" href={appHref("/#inicio")}>
          <img src={logo} width={48} height={48} alt="" className="h-12 w-12 rounded-full" />
          <span className="font-display text-sm font-semibold tracking-[0.16em] text-white">OPTIONEXT</span>
        </a>

        <button
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white md:hidden"
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <div className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-[76px] flex-col gap-4 border-b border-white/10 bg-[#0c1020] px-4 py-5 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`} id={panelId}>
          <nav aria-label="Principal">
            <ul className="flex flex-col gap-3 md:flex-row md:gap-5">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    className="font-display text-sm font-medium text-[#f4f2fb] no-underline hover:text-white"
                    href={appHref(link.href)}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            className="btn-primary md:ml-2"
            href={whatsappHref(DIAGNOSIS_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Agenda un diagnóstico
          </a>
        </div>
      </div>
    </header>
  )
}
