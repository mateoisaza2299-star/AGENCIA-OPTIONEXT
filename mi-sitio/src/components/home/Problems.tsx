import { HoverLift, Reveal } from "@/components/motion/Reveal"

const items = [
  ["Pedidos perdidos en el chat", "WhatsApp atiende y también se traga la fila."],
  ["Inventario en un cuaderno", "Nadie sabe a tiempo qué se agotó."],
  ["Cobros y avisos a mano", "El comprobante depende de que alguien se acuerde."],
]

export function Problems() {
  return (
    <section className="px-4 py-16" aria-label="Ejemplo de cómo se ve un diagnóstico">
      <Reveal className="mx-auto w-full max-w-[1120px]">
        <HoverLift className="rounded-[24px] border border-white/10 bg-[#14182c] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.25)] md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-[#4b2e9e] px-3 py-1 text-xs font-bold tracking-wide text-white">Diagnóstico</span>
            <span className="text-sm text-[#d6d1e8]">Negocio local</span>
          </div>
          <p className="font-display mt-5 text-2xl font-semibold text-white">Lo que suele aparecer primero</p>
          <ul className="mt-5 space-y-4">
            {items.map(([title, text], index) => (
              <li key={title} className="flex gap-3 border-t border-white/10 pt-4">
                <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${index === 0 ? "bg-[#6c3ce0]" : "bg-white/25"}`} aria-hidden="true" />
                <div>
                  <strong className="block text-white">{title}</strong>
                  <span className="text-[#d6d1e8]">{text}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-5 font-semibold text-[#efe8ff]">Siguiente paso: una propuesta a medida, no un paquete genérico.</p>
        </HoverLift>
      </Reveal>
    </section>
  )
}
