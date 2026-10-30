import { Reveal } from "@/components/motion/Reveal"

const steps = [
  ["Diagnóstico", "Vemos cómo atiendes, cobras y entregas antes de hablar de herramientas."],
  ["Solución a medida", "Elegimos solo lo que crea valor. Si una pieza no hace falta, no la vendemos."],
  ["Puesta en marcha", "Lo dejamos funcionando en tu negocio y seguimos cerca para ajustarlo."],
]

export function About() {
  return (
    <section id="nosotros" className="scroll-mt-24 px-4 py-16" aria-labelledby="nosotros-title">
      <div className="mx-auto grid w-full max-w-[1120px] gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <p className="eyebrow">Sobre nosotros</p>
          <h2 id="nosotros-title" className="section-title">Un equipo joven, al lado de negocios que ya existen.</h2>
          <p className="mt-4 text-[#d6d1e8]">OPTIONEXT nace en la Sabana de Occidente, Cundinamarca. Trabajamos con MIPYMES y negocios de la zona: tiendas, talleres, fincas, restaurantes y empresas familiares que ya tienen clientes y una forma de hacer las cosas.</p>
          <p className="mt-4 text-[#d6d1e8]">Muchas veces les ofrecen una página, un bot o una automatización como si eso, solo, arreglara el día a día. Nosotros empezamos al revés. Miramos cómo entran los pedidos, quién responde, qué se anota a mano y dónde se va el tiempo. Con eso claro, implementamos la herramienta que sí hace falta.</p>
          <p className="mt-4 font-semibold text-white">El sitio, el WhatsApp, n8n o la inteligencia artificial entran cuando resuelven un problema real de tu operación.</p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="rounded-[24px] border border-white/10 bg-[#14182c] p-6" aria-label="Cómo pensamos un proyecto">
            <p className="font-display font-semibold text-white">De diagnóstico a solución</p>
            <ol className="mt-2">
              {steps.map(([title, text], index) => (
                <li key={title} className="flex gap-3 border-t border-white/10 py-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#efe8ff] font-display text-sm font-bold text-[#4b2e9e]" aria-hidden="true">{index + 1}</span>
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
