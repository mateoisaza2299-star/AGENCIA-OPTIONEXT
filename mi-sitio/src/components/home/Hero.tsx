import { motion, useReducedMotion } from "motion/react"
import { GlassReveal21st } from "@/components/ui/liquid-glass-logo-reveal"
import { DIAGNOSIS_MESSAGE, whatsappHref } from "@/config"
import { appHref } from "@/lib/path"

export function Hero() {
  const reduce = useReducedMotion()
  return (
    <section id="inicio" className="hero-wash relative overflow-hidden pt-28" aria-labelledby="hero-title">
      <div className="mx-auto grid w-full max-w-[1120px] items-center gap-10 px-4 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-16">
        <div>
          <p className="eyebrow">Sabana de Occidente · Cundinamarca</p>
          <h1 id="hero-title" className="font-display mt-3 text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.05] font-bold tracking-[-0.04em] text-white">
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
              href={appHref("/precios")}
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Ver precios
            </motion.a>
          </div>
          <p className="mt-5 text-sm font-semibold text-[#efe8ff]">Garantía contractual de 90 días, según el contrato.</p>
        </div>
        <GlassReveal21st loop={false} className="h-[min(78vw,520px)] min-h-[360px] w-full" />
      </div>
    </section>
  )
}
