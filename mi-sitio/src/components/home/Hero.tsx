import { SectionGlow } from "@/components/ui/glow-card"
import { DIAGNOSIS_MESSAGE, whatsappHref } from "@/config"

export function Hero() {
  return (
    <section id="inicio" className="band band-deep relative pt-28" aria-labelledby="hero-title">
      <SectionGlow>
        <div className="mx-auto w-full max-w-[1120px] px-4 py-16 md:py-24">
          <p className="eyebrow">Sabana de Occidente · Cundinamarca</p>
          <h1 id="hero-title" className="font-display mt-3 max-w-4xl text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.05] font-bold tracking-[-0.04em] text-white">
            Deja de perder clientes.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[#d6d1e8]">
            En 14 días automatizamos lo que te hace perder pedidos y tiempo. Sin código. Lo ves funcionar antes de pagar.
          </p>
          <div className="mt-7">
            <a className="btn-primary" href={whatsappHref(DIAGNOSIS_MESSAGE)} target="_blank" rel="noopener noreferrer">
              Agenda tu diagnóstico gratis
            </a>
          </div>
          <p className="mt-5 text-sm font-semibold text-[#efe8ff]">✓ Diagnóstico gratis · ✓ Piloto 14 días · ✓ Garantía 3 meses · ✓ Solo 3 cupos al mes</p>
        </div>
      </SectionGlow>
    </section>
  )
}
