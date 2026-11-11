import type { CSSProperties } from "react"
import { GlowCard } from "@/components/ui/glow-card"
import { Reveal } from "@/components/motion/Reveal"
import type { Accent } from "@/components/ui/glow-card"

const items: { title: string; text: string; accent: Accent }[] = [
  { title: "Pedidos perdidos en el chat", text: "WhatsApp atiende y también se traga la fila.", accent: "brand" },
  { title: "Inventario en un cuaderno", text: "Nadie sabe a tiempo qué se agotó.", accent: "magenta" },
  { title: "Cobros y avisos a mano", text: "El comprobante depende de que alguien se acuerde.", accent: "amber" },
]

export function Problems() {
  return (
    <section className="band band-lift px-4 py-16" aria-labelledby="negocio-title">
      <div className="mx-auto w-full max-w-[1120px]">
        <Reveal>
          <p className="eyebrow">El costo oculto</p>
          <h2 id="negocio-title" className="section-title">El <span className="grad">problema</span></h2>
          <p className="mt-3 text-[#d6d1e8]">Cada semana se pierde plata por cosas que nadie midió.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <div key={item.title} className="scroll-in h-full" style={{ "--scroll-i": index } as CSSProperties}>
              <GlowCard accent={item.accent} className="h-full min-h-[180px]">
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-[#d6d1e8]">{item.text}</p>
              </GlowCard>
            </div>
          ))}
        </div>
        <p className="mt-6 font-semibold text-[#efe8ff]">No es falta de esfuerzo. Es falta de un sistema.</p>
      </div>
    </section>
  )
}
