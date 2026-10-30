import { motion, useReducedMotion } from "motion/react"
import { Reveal } from "@/components/motion/Reveal"
import { GlowCard, useAnimatedNumber, type Accent } from "@/components/ui/glow-card"
import { PRECIOS_URL } from "@/config"
import { formatMoney, paquetes } from "@/data/precios"

const accents: Accent[] = ["indigo", "brand", "violet"]

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
          {paquetes.map((plan, index) => (
            <Reveal key={plan.id}>
              <GlowCard accent={accents[index] ?? "brand"} className={plan.recommended ? "h-full ring-1 ring-[#6c3ce0]" : "h-full"}>
                {plan.recommended ? <p className="mb-3 text-xs font-bold tracking-wide text-[#efe8ff]">Recomendado</p> : null}
                <h3 className="font-display text-2xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-4 text-[#d6d1e8]">
                  <span className="mr-2 rounded-full bg-[#4b2e9e] px-2 py-0.5 text-xs font-bold text-white">Lanzamiento</span>
                  <Money amount={plan.monthly.launch} />
                  <span>/mes</span>
                </p>
                <p className="mt-2 text-sm text-[#d6d1e8]">Estándar: {formatMoney(plan.monthly.standard)}</p>
                <p className="mt-1 text-sm text-[#d6d1e8]">Configuración: {formatMoney(plan.setup.launch)}</p>
                <p className="mt-4 flex-1 text-[#d6d1e8]">{plan.ideal}</p>
                <motion.a
                  className="btn-primary mt-6"
                  href={`${PRECIOS_URL}#${plan.id}`}
                  whileHover={reduce ? undefined : { scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  Ver el plan
                </motion.a>
              </GlowCard>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center">
          <motion.a className="btn-ghost" href={PRECIOS_URL} whileHover={reduce ? undefined : { scale: 1.03 }} transition={{ duration: 0.2 }}>
            Ver planes y precios
          </motion.a>
        </p>
      </div>
    </section>
  )
}

function Money({ amount }: { amount: number }) {
  const value = useAnimatedNumber(amount)
  return <span className="font-display text-3xl font-bold text-white tabular-nums">{formatMoney(value)}</span>
}
