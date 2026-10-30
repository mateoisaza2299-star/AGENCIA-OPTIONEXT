import { MessageCircle, Monitor, Sparkles, Workflow } from "lucide-react"
import { HoverLift, Reveal } from "@/components/motion/Reveal"

const services = [
  {
    title: "Páginas web",
    text: "Para que te encuentren y entiendan qué haces. La armamos según cómo vendes: qué debe verse primero, cómo te escriben y qué sobra.",
    Icon: Monitor,
  },
  {
    title: "Bots de WhatsApp",
    text: "El canal donde ya están tus clientes. El bot responde, toma el pedido o aparta la cita, y deja lo importante en manos de una persona.",
    Icon: MessageCircle,
  },
  {
    title: "Automatizaciones con n8n",
    text: "Conectamos lo que hoy se copia a mano: del chat a la hoja, del formulario al recordatorio, del pago al comprobante.",
    Icon: Workflow,
  },
  {
    title: "Soluciones con Inteligencia Artificial",
    text: "Cuando el diagnóstico lo pide, la IA clasifica, resume o responde. Siempre sobre una tarea concreta del negocio, nunca como adorno.",
    Icon: Sparkles,
  },
]

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-24 px-4 py-16" aria-labelledby="servicios-title">
      <div className="mx-auto w-full max-w-[1120px]">
        <Reveal>
          <p className="eyebrow">Servicios</p>
          <h2 id="servicios-title" className="section-title">Lo que implementamos, después de entender.</h2>
          <p className="mt-4 max-w-2xl text-lg text-[#d6d1e8]">No son productos sueltos. Son las piezas con las que armamos la solución cuando el diagnóstico ya encontró el problema.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map(({ title, text, Icon }, index) => (
            <Reveal key={title} delay={index * 0.05}>
              <HoverLift className="h-full rounded-[24px] border border-white/10 bg-[#14182c] p-6">
                <Icon className="text-[#efe8ff]" aria-hidden="true" />
                <h3 className="font-display mt-4 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-[#d6d1e8]">{text}</p>
              </HoverLift>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
