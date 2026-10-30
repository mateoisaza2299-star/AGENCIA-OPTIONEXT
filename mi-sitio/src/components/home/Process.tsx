import { motion, useReducedMotion } from "motion/react"
import { Reveal } from "@/components/motion/Reveal"

const steps = [
  ["Diagnóstico gratuito", "Conversamos sobre tu operación y señalamos los cuellos de botella: pedidos, cobros, respuestas y lo que se hace a pulso."],
  ["Propuesta a medida", "Te mostramos qué construir, en qué orden y cuál plan cubre la implementación. Si algo no aporta, queda fuera."],
  ["Implementación", "Ponemos en marcha el sitio, el bot, las automatizaciones o la inteligencia artificial que acordamos. Queda funcionando en tu negocio."],
  ["Soporte continuo", "Ajustamos, medimos y seguimos cerca para que la herramienta sirva cuando el negocio cambia, no solo el día de la entrega."],
]

export function Process() {
  const reduce = useReducedMotion()
  return (
    <section id="proceso" className="scroll-mt-24 px-4 py-16" aria-labelledby="proceso-title">
      <div className="mx-auto w-full max-w-[1120px]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Cómo trabajamos</p>
          <h2 id="proceso-title" className="section-title">Cuatro pasos, del diagnóstico al soporte.</h2>
          <p className="mt-4 text-lg text-[#d6d1e8]">Un recorrido corto. Sin entregarte una herramienta que nadie pidió y sin dejarte solo cuando ya está en marcha.</p>
        </Reveal>
        <div className="relative mx-auto mt-12 max-w-3xl">
          <motion.span
            className="absolute top-2 bottom-2 left-3 w-px origin-top bg-[#6c3ce0]"
            aria-hidden="true"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 0.9, ease: "easeOut" }}
          />
          <ol className="space-y-6 pl-10">
            {steps.map(([title, text], index) => (
              <motion.li
                key={title}
                className="relative"
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="absolute top-0 -left-10 grid h-7 w-7 place-items-center rounded-full bg-[#4b2e9e] font-display text-sm font-bold text-white" aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
                <p className="mt-1 text-[#d6d1e8]">{text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
