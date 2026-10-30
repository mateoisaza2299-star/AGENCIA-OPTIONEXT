import { GlowCard } from "@/components/ui/glow-card"
import { Reveal } from "@/components/motion/Reveal"
import type { Accent } from "@/components/ui/glow-card"

const items: { title: string; text: string; accent: Accent }[] = [
  { title: "Pedidos perdidos en el chat", text: "WhatsApp atiende y también se traga la fila.", accent: "brand" },
  { title: "Inventario en un cuaderno", text: "Nadie sabe a tiempo qué se agotó.", accent: "violet" },
  { title: "Cobros y avisos a mano", text: "El comprobante depende de que alguien se acuerde.", accent: "indigo" },
]

export function Problems() {
  return (
    <section className="px-4 py-16" aria-labelledby="negocio-title">
      <div className="mx-auto w-full max-w-[1120px]">
        <Reveal>
          <p className="eyebrow">Diagnóstico</p>
          <h2 id="negocio-title" className="section-title">Lo que suele aparecer primero</h2>
          <p className="mt-3 text-[#d6d1e8]">Negocio local</p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <Reveal key={item.title}>
              <GlowCard accent={item.accent} className="h-full min-h-[180px]">
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-[#d6d1e8]">{item.text}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 font-semibold text-[#efe8ff]">Siguiente paso: una propuesta a medida, no un paquete genérico.</p>
      </div>
    </section>
  )
}
