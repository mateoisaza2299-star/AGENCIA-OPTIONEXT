import { Reveal } from "@/components/motion/Reveal"
import { CardTitle, GlowCard, TypingLog, type TerminalLine } from "@/components/ui/glow-card"

const lines: TerminalLine[] = [
  { mark: "1", markClass: "text-[#c084fc]", textClass: "text-white", text: "Diagnóstico gratuito" },
  { mark: "·", markClass: "text-[#a78bfa]", textClass: "text-[#d6d1e8]", text: "Conversamos sobre tu operación y señalamos los cuellos de botella: pedidos, cobros, respuestas y lo que se hace a pulso." },
  { mark: "2", markClass: "text-[#c084fc]", textClass: "text-white", text: "Propuesta a medida" },
  { mark: "·", markClass: "text-[#a78bfa]", textClass: "text-[#d6d1e8]", text: "Te mostramos qué construir, en qué orden y cuál plan cubre la implementación. Si algo no aporta, queda fuera." },
  { mark: "3", markClass: "text-[#c084fc]", textClass: "text-white", text: "Implementación" },
  { mark: "·", markClass: "text-[#a78bfa]", textClass: "text-[#d6d1e8]", text: "Ponemos en marcha el sitio, el bot, las automatizaciones o la inteligencia artificial que acordamos. Queda funcionando en tu negocio." },
  { mark: "4", markClass: "text-[#c084fc]", textClass: "text-white", text: "Soporte continuo" },
  { mark: "·", markClass: "text-[#a78bfa]", textClass: "text-[#d6d1e8]", text: "Ajustamos, medimos y seguimos cerca para que la herramienta sirva cuando el negocio cambia, no solo el día de la entrega." },
]

export function Process() {
  return (
    <section id="proceso" className="band band-warm scroll-mt-24 px-4 py-16" aria-labelledby="proceso-title">
      <div className="mx-auto w-full max-w-[1120px]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Cómo trabajamos</p>
          <h2 id="proceso-title" className="section-title">Cuatro pasos, del <span className="grad">diagnóstico</span> al soporte.</h2>
          <p className="mt-4 text-lg text-[#d6d1e8]">Un recorrido corto. Sin entregarte una herramienta que nadie pidió y sin dejarte solo cuando ya está en marcha.</p>
        </Reveal>
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <GlowCard accent="magenta" className="min-h-[340px]">
            <CardTitle
              right={
                <span className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </span>
              }
            >
              Del diagnóstico al soporte
            </CardTitle>
            <TypingLog lines={lines} label="Cuatro pasos, del diagnóstico al soporte" />
          </GlowCard>
        </Reveal>
      </div>
    </section>
  )
}
