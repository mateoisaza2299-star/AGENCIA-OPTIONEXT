import type { CSSProperties } from "react"
import { Reveal } from "@/components/motion/Reveal"
import { GlowCard, type Accent } from "@/components/ui/glow-card"
import { DIAGNOSIS_MESSAGE, whatsappHref } from "@/config"

const niveles: { title: string; text: string; accent: Accent }[] = [
  { title: "Nivel 1", text: "Formulario + Google Sheets — donde está la mayoría de negocios locales", accent: "brand" },
  { title: "Nivel 2", text: "Automatización con n8n — cuando el Nivel 1 ya no da abasto", accent: "violet" },
  { title: "Nivel 3", text: "Base de datos — cuando el volumen lo exige", accent: "magenta" },
  { title: "Nivel 4", text: "Dashboard + reportes — cuando necesitas ver el negocio en tiempo real", accent: "amber" },
  { title: "Nivel 5", text: "IA + integraciones avanzadas — solo cuando los 4 anteriores ya están", accent: "brand" },
]

export function Niveles() {
  return (
    <section id="niveles" className="band band-deep scroll-mt-24 px-4 py-16" aria-labelledby="niveles-title">
      <div className="mx-auto w-full max-w-[1120px]">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">El Sistema de los 5 Niveles</p>
          <h2 id="niveles-title" className="section-title">Tu nivel correcto.</h2>
          <p className="mt-4 text-lg text-[#d6d1e8]">Te decimos en cuál nivel estás. Nunca te vendemos el más caro. Nadie tiene que llegar al Nivel 5: implementamos solo lo que el diagnóstico dice que necesitas.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {niveles.map((nivel, index) => (
            <div key={nivel.title} className="scroll-in h-full" style={{ "--scroll-i": index } as CSSProperties}>
              <GlowCard accent={nivel.accent} className="h-full min-h-[160px]">
                <h3 className="font-display text-xl font-semibold text-white">{nivel.title}</h3>
                <p className="mt-3 text-[#d6d1e8]">{nivel.text}</p>
              </GlowCard>
            </div>
          ))}
        </div>
        <Reveal className="mt-8 max-w-3xl">
          <p className="font-semibold text-[#efe8ff]">No vendemos tecnología. Vendemos el diagnóstico. La tecnología es solo el resultado.</p>
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
