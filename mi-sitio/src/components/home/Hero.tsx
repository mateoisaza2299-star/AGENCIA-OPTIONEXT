import { SectionGlow } from "@/components/ui/glow-card"
import { DIAGNOSIS_MESSAGE, whatsappHref } from "@/config"
import { appHref } from "@/lib/path"

export function Hero() {
  return (
    <section id="inicio" className="band band-deep relative pt-28" aria-labelledby="hero-title">
      <SectionGlow>
        <div className="mx-auto w-full max-w-[1120px] px-4 py-16 md:py-24">
          <p className="eyebrow">Sabana de Occidente · Cundinamarca</p>
          <h1 id="hero-title" className="font-display mt-3 max-w-4xl text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.05] font-bold tracking-[-0.04em] text-white">
            Tu negocio deja de perder clientes por no responder a tiempo — en 14 días, sin que toques una línea de código, sin pagar hasta verlo funcionar.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[#d6d1e8]">
            Encontramos exactamente qué te está robando tiempo y plata. Lo automatizamos. Tú lo ves funcionar antes de pagar un peso.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a className="btn-primary" href={whatsappHref(DIAGNOSIS_MESSAGE)} target="_blank" rel="noopener noreferrer">
              Agenda tu diagnóstico gratis
            </a>
            <a className="btn-ghost" href={appHref("/precios")}>
              Ver precios
            </a>
          </div>
          <p className="mt-5 text-sm font-semibold text-[#efe8ff]">✓ Diagnóstico gratis · ✓ 14 días de piloto sin costo · ✓ Si no ves resultados, no pagas — sin letra chica</p>
        </div>
      </SectionGlow>
    </section>
  )
}
