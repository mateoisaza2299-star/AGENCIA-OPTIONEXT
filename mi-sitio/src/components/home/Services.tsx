import { MessageCircle, Monitor, Sparkles, Workflow } from "lucide-react"
import { useEffect, useState, type FocusEvent } from "react"
import { Reveal } from "@/components/motion/Reveal"
import { GlowCard, type Accent } from "@/components/ui/glow-card"

const services: { title: string; text: string; accent: Accent; icon: typeof Monitor }[] = [
  {
    title: "Páginas web",
    text: "Para que te encuentren y entiendan qué haces. La armamos según cómo vendes: qué debe verse primero, cómo te escriben y qué sobra.",
    accent: "brand",
    icon: Monitor,
  },
  {
    title: "Bots de WhatsApp",
    text: "El canal donde ya están tus clientes. El bot responde, toma el pedido o aparta la cita, y deja lo importante en manos de una persona.",
    accent: "violet",
    icon: MessageCircle,
  },
  {
    title: "Automatizaciones con n8n",
    text: "Conectamos lo que hoy se copia a mano: del chat a la hoja, del formulario al recordatorio, del pago al comprobante.",
    accent: "magenta",
    icon: Workflow,
  },
  {
    title: "Soluciones con Inteligencia Artificial",
    text: "Cuando el diagnóstico lo pide, la IA clasifica, resume o responde. Siempre sobre una tarea concreta del negocio, nunca como adorno.",
    accent: "amber",
    icon: Sparkles,
  },
]

export function Services() {
  return (
    <section id="servicios" className="band band-deep scroll-mt-24 px-4 py-16" aria-labelledby="servicios-title">
      <div className="mx-auto w-full max-w-[1120px]">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Servicios</p>
          <h2 id="servicios-title" className="section-title">Lo que implementamos, después de <span className="grad">entender</span>.</h2>
          <p className="mt-4 text-lg text-[#d6d1e8]">No son productos sueltos. Son las piezas con las que armamos la solución cuando el diagnóstico ya encontró el problema.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <Reveal key={service.title}>
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ title, text, accent, icon: Icon }: (typeof services)[number]) {
  const [open, setOpen] = useState(false)
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches)
  }, [])

  function close(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
  }

  const shown = open || !canHover

  return (
    <GlowCard
      accent={accent}
      className="h-full min-h-[210px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#efe8ff]"
      tabIndex={0}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={close}
    >
      <div className="flex items-center gap-3">
        <Icon aria-hidden="true" className="text-[#efe8ff]" />
        <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className={`mt-4 text-[#d6d1e8] ${shown ? "tb-fade" : "opacity-0"}`}>{text}</p>
    </GlowCard>
  )
}
