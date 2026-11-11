import { Reveal } from "@/components/motion/Reveal"
import { GlowCard } from "@/components/ui/glow-card"
import { DIAGNOSIS_MESSAGE, whatsappHref } from "@/config"

const rows = [
  ["Web por un lado, automatización por otro", "Web + automatización como un solo sistema"],
  ["Pagan doble, coordinan dos proveedores", "Un equipo que entiende el negocio completo"],
  ["Paquetes cerrados sin diagnóstico", "Solo implementan lo del nivel correcto"],
  ["Los sistemas no se hablan entre sí", "Todo conectado desde el día uno"],
  ["Soporte por ticket", "Seguimiento hasta que funcione"],
]

export function Mecanismo() {
  return (
    <section id="mecanismo" className="band band-color scroll-mt-24 px-4 py-16" aria-labelledby="mecanismo-title">
      <div className="mx-auto w-full max-w-[1120px]">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">El Método Optionext</p>
          <h2 id="mecanismo-title" className="section-title">Una agencia web por un lado. Automatizaciones por otro. Pagan doble y los sistemas no se hablan.</h2>
          <p className="mt-4 text-[#d6d1e8]">
            La mayoría de negocios locales contratan una agencia web por un lado y buscan quién les automatice por otro. Pagan doble, nadie entiende el negocio completo y los sistemas no se hablan entre sí.
          </p>
          <p className="mt-4 font-semibold text-white">
            Optionext diagnostica, construye la web y automatiza los procesos internos como un solo sistema. La reserva que llega a la web dispara el aviso al dueño por WhatsApp. El formulario alimenta la base de datos. Todo conectado, desde el Nivel 1 hasta donde el negocio lo necesite.
          </p>
          <p className="mt-4 text-[#d6d1e8]">
            Como entendemos el negocio completo antes de tocar una herramienta, no hay trabajo innecesario. Por eso los precios tienen sentido para un negocio local.
          </p>
        </Reveal>

        <Reveal className="mt-8">
          <div className="grid gap-4 md:grid-cols-2">
            <GlowCard accent="magenta" className="h-full">
              <h3 className="font-display text-xl font-semibold text-white">Agencias tradicionales</h3>
              <ul className="mt-4 space-y-3 text-[#d6d1e8]">
                {rows.map(([traditional]) => (
                  <li key={traditional} className="border-t border-white/10 pt-3 first:border-0 first:pt-0">
                    {traditional}
                  </li>
                ))}
              </ul>
            </GlowCard>
            <GlowCard accent="brand" className="h-full">
              <h3 className="font-display text-xl font-semibold text-white">Optionext</h3>
              <ul className="mt-4 space-y-3 text-[#d6d1e8]">
                {rows.map(([, optionext]) => (
                  <li key={optionext} className="border-t border-white/10 pt-3 first:border-0 first:pt-0">
                    {optionext}
                  </li>
                ))}
              </ul>
            </GlowCard>
          </div>
        </Reveal>

        <Reveal className="mt-8 max-w-3xl">
          <p className="font-semibold text-[#efe8ff]">Nadie puede comprarnos nada hasta que el diagnóstico diga exactamente en qué nivel está el negocio.</p>
          <p className="mt-6">
            <a className="btn-primary" href={whatsappHref(DIAGNOSIS_MESSAGE)} target="_blank" rel="noopener noreferrer">
              Agenda tu diagnóstico gratis
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
