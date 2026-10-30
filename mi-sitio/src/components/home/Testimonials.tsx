import { Reveal } from "@/components/motion/Reveal"
import { GlowCard } from "@/components/ui/glow-card"

const quotes = [
  ["Llegamos pidiendo un bot y nos pararon. El problema era que los domicilios se perdían en el chat. El bot salió de ese diagnóstico, no de un catálogo.", "Tienda de barrio · Madrid, Cundinamarca"],
  ["En el taller el cuaderno de turnos ya no daba abasto. Vieron eso antes de hablarnos de páginas. Hoy el cliente aparta por WhatsApp y a mí me queda el trabajo.", "Taller de motos · Mosquera"],
  ["No queríamos inteligencia artificial por moda. Queríamos dejar de copiar pedidos a mano. Unieron WhatsApp con la hoja de entregas, y ahí sí se sintió.", "Floristería · Facatativá"],
]

export function Testimonials() {
  return (
    <section id="testimonios" className="scroll-mt-24 px-4 py-16" aria-labelledby="testimonios-title">
      <div className="mx-auto w-full max-w-[1120px]">
        <Reveal>
          <p className="eyebrow">Testimonios</p>
          <h2 id="testimonios-title" className="section-title">Negocios de la zona, contado por ellos.</h2>
          <p className="mt-4 max-w-2xl text-lg text-[#d6d1e8]">Historias del tipo de trabajo que hacemos: primero el problema, después la herramienta.</p>
          <p className="mt-3 text-sm font-semibold tracking-wide text-[#efe8ff] uppercase">Ejemplos del tipo de trabajo que hacemos</p>
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {quotes.map(([text, meta]) => (
            <Reveal key={meta}>
              <GlowCard accent="brand" className="h-full">
                <figure className="flex h-full flex-col">
                  <blockquote>
                    <p className="text-[#f4f2fb]">{text}</p>
                  </blockquote>
                  <figcaption className="mt-4 text-sm text-[#d6d1e8]">Ejemplo · {meta}</figcaption>
                </figure>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
