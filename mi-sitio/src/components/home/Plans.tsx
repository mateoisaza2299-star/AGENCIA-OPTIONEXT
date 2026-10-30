import { motion, useReducedMotion } from "motion/react"
import { HoverLift, Reveal } from "@/components/motion/Reveal"
import { formatMoney, paquetes } from "@/data/precios"
import { appHref } from "@/lib/path"

export function Plans() {
  const reduce = useReducedMotion()
  return (
    <section id="precios" className="scroll-mt-24 px-4 py-16" aria-labelledby="precios-title">
      <div className="mx-auto w-full max-w-[1120px]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Precios</p>
          <h2 id="precios-title" className="section-title">Tres niveles. Uno para tu etapa.</h2>
          <p className="mt-4 text-lg text-[#d6d1e8]">Startex, Pro Option y Businext salen de la misma lista que la página de precios. El diagnóstico y los demás servicios están allá.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {paquetes.map((plan) => (
            <Reveal key={plan.id}>
              <HoverLift className={`flex h-full flex-col rounded-[24px] border p-6 ${plan.recommended ? "border-[#6c3ce0] bg-[#1a1430]" : "border-white/10 bg-[#14182c]"}`}>
                {plan.recommended ? <p className="mb-3 text-xs font-bold tracking-wide text-[#efe8ff]">Recomendado</p> : null}
                <h3 className="font-display text-2xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-4 text-[#d6d1e8]">
                  <span className="mr-2 rounded-full bg-[#4b2e9e] px-2 py-0.5 text-xs font-bold text-white">Lanzamiento</span>
                  <span className="font-display text-3xl font-bold text-white">{formatMoney(plan.monthly.launch)}</span>
                  <span>/mes</span>
                </p>
                <p className="mt-2 text-sm text-[#d6d1e8]">Estándar: {formatMoney(plan.monthly.standard)}</p>
                <p className="mt-1 text-sm text-[#d6d1e8]">Configuración: {formatMoney(plan.setup.launch)}</p>
                <p className="mt-4 flex-1 text-[#d6d1e8]">{plan.ideal}</p>
                <a className="btn-primary mt-6" href={appHref(`/precios#${plan.id}`)}>Ver el plan</a>
              </HoverLift>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center">
          <motion.a
            className="btn-ghost"
            href={appHref("/precios")}
            whileHover={reduce ? undefined : { scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            Ver planes y precios
          </motion.a>
        </p>
      </div>
    </section>
  )
}
