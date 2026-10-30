import { motion, useReducedMotion } from "motion/react"
import { SectionGlow } from "@/components/ui/glow-card"
import { DIAGNOSIS_MESSAGE, PRECIOS_URL, whatsappHref } from "@/config"

export function Hero() {
  const reduce = useReducedMotion()
  return (
    <section id="inicio" className="hero-wash relative overflow-hidden pt-28" aria-labelledby="hero-title">
      <SectionGlow>
        <div className="mx-auto w-full max-w-[1120px] px-4 py-16 md:py-24">
          <p className="eyebrow">Sabana de Occidente · Cundinamarca</p>
          <h1 id="hero-title" className="font-display mt-3 max-w-4xl text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.05] font-bold tracking-[-0.04em] text-white">
            Primero el <em className="text-[#efe8ff] not-italic">diagnóstico</em>. Después, la solución que sí sirve.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[#d6d1e8]">
            Acompañamos a MIPYMES y negocios locales. Entendemos cómo trabaja tu operación y recién ahí implementamos el sitio, el bot de WhatsApp, la automatización o la inteligencia artificial que hace falta.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <motion.a
              className="btn-primary"
              href={whatsappHref(DIAGNOSIS_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Agenda un diagnóstico
            </motion.a>
            <motion.a
              className="btn-ghost"
              href={PRECIOS_URL}
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Ver precios
            </motion.a>
          </div>
          <p className="mt-5 text-sm font-semibold text-[#efe8ff]">Garantía contractual de 90 días, según el contrato.</p>
        </div>
      </SectionGlow>
    </section>
  )
}
