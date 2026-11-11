import { Reveal } from "@/components/motion/Reveal"
import { DIAGNOSIS_MESSAGE, whatsappHref } from "@/config"

const items = [
  ["Diagnóstico", "Gratis. 30–45 min. Mapeamos dónde exactamente pierdes tiempo y clientes.", "Valor: $400.000 COP"],
  ["Mapa", "Plan escrito de tu operación: tareas a eliminar y horas que recuperas por semana.", "Valor: $200.000 COP"],
  ["Piloto", "14 días gratis. La solución funcionando en tu negocio antes de pagar un peso.", "Valor: $800.000 COP"],
  ["Implementación", "Solo lo que el diagnóstico dice. Precio según tu nivel real.", "según nivel"],
  ["Soporte", "30 días post-implementación. Ajustamos hasta que funcione.", "Valor: $300.000 COP"],
  ["Bonus", "Guía: Los 5 cuellos de botella más comunes en negocios de servicio. Gratis al agendar.", "Valor: $150.000 COP"],
]

export function Oferta() {
  return (
    <section id="oferta" className="band band-lift scroll-mt-24 px-4 py-16" aria-labelledby="oferta-title">
      <div className="mx-auto grid w-full max-w-[1120px] gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <p className="eyebrow">La oferta</p>
          <h2 id="oferta-title" className="section-title">La oferta.</h2>
          <p className="mt-4 text-lg text-[#d6d1e8]">Solo abrimos 3 diagnósticos nuevos al mes.</p>
          <p className="mt-4 font-semibold text-white">Valor total recibido: $1.850.000 COP. Tu inversión: según tu nivel real, después del diagnóstico.</p>
          <p className="mt-4 font-semibold text-[#efe8ff]">Solo abrimos 3 diagnósticos nuevos al mes.</p>
          <p className="mt-6">
            <a className="btn-primary" href={whatsappHref(DIAGNOSIS_MESSAGE)} target="_blank" rel="noopener noreferrer">
              Agenda tu diagnóstico gratis
            </a>
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="sheet p-6" aria-label="Qué incluye la oferta">
            <p className="font-display font-semibold text-white">Qué recibes</p>
            <ol className="mt-2">
              {items.map(([title, text, value], index) => (
                <li key={title} className="flex gap-3 border-t border-white/10 py-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#efe8ff] font-display text-sm font-bold text-[#4b2e9e]" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
                    <p className="text-[#d6d1e8]">{text}</p>
                    <p className="mt-1 text-sm font-semibold text-[#efe8ff]">{value}</p>
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
