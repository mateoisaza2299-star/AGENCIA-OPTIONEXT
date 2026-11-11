import { Reveal } from "@/components/motion/Reveal"
import { DIAGNOSIS_MESSAGE, whatsappHref } from "@/config"

const items = [
  ["Diagnóstico", "Gratis. Vemos cómo atiendes, cobras y entregas antes de hablar de herramientas."],
  ["Propuesta", "Según tu operación, con un plan de precio cerrado. Si algo no aporta, queda fuera."],
  ["Implementación", "Sitio, bot de WhatsApp, automatización o IA solo cuando resuelven un problema real."],
  ["Puesta en marcha", "Lo dejamos funcionando en tu negocio y seguimos cerca para ajustarlo."],
]

export function Oferta() {
  return (
    <section id="oferta" className="band band-lift scroll-mt-24 px-4 py-16" aria-labelledby="oferta-title">
      <div className="mx-auto grid w-full max-w-[1120px] gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <p className="eyebrow">La oferta</p>
          <h2 id="oferta-title" className="section-title">Qué recibes.</h2>
          <p className="mt-4 text-lg text-[#d6d1e8]">
            Diagnóstico gratuito. Propuesta a medida. Sin empujarte un paquete genérico.
          </p>
          <p className="mt-6">
            <a className="btn-primary" href={whatsappHref(DIAGNOSIS_MESSAGE)} target="_blank" rel="noopener noreferrer">
              Agenda tu diagnóstico gratis
            </a>
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="sheet p-6" aria-label="Qué incluye">
            <p className="font-display font-semibold text-white">Del diagnóstico al soporte</p>
            <ol className="mt-2">
              {items.map(([title, text], index) => (
                <li key={title} className="flex gap-3 border-t border-white/10 py-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#efe8ff] font-display text-sm font-bold text-[#4b2e9e]" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
                    <p className="text-[#d6d1e8]">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
