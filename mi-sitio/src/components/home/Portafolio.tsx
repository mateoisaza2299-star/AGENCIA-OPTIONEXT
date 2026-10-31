import { motion, useReducedMotion } from "motion/react"
import { useState, type PointerEvent, type ReactNode } from "react"
import { GlowCard, type Accent } from "@/components/ui/glow-card"
import { MEDIDA_ESCRITORIO, MEDIDA_MOVIL, portafolio, type Portadas, type SitioPortafolio } from "@/data/portafolio"

const acentos: Accent[] = ["brand", "violet", "champagne", "amber", "cyan", "emerald", "indigo"]

type SitioPublicado = SitioPortafolio & { url: string; portadas: Portadas }

function publicado(sitio: SitioPortafolio): sitio is SitioPublicado {
  return Boolean(sitio.url && sitio.portadas)
}

function archivoPublico(nombre: string) {
  return `${import.meta.env.BASE_URL}portafolio/${nombre}`
}

export function Portafolio() {
  return (
    <section id="portafolio" className="band band-color scroll-mt-24 px-4 py-16" aria-labelledby="portafolio-title">
      <div className="mx-auto w-full max-w-[1120px]">
        <Entrada index={0} className="max-w-2xl">
          <p className="eyebrow">Portafolio</p>
          <h2 id="portafolio-title" className="section-title">
            Páginas que hemos <span className="grad">hecho</span>.
          </h2>
          <p className="mt-4 text-lg text-[#d6d1e8]">Así abren las páginas que ya publicamos.</p>
        </Entrada>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {portafolio.filter(publicado).map((sitio, index) => (
            <Entrada key={sitio.slug} index={index + 1} className="min-w-0">
              <Tarjeta sitio={sitio} acento={acentos[index] ?? "brand"} />
            </Entrada>
          ))}
        </div>
      </div>
    </section>
  )
}

function Entrada({ index, className, children }: { index: number; className?: string; children: ReactNode }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
    >
      {children}
    </motion.div>
  )
}

function Tarjeta({ sitio, acento }: { sitio: SitioPublicado; acento: Accent }) {
  const [abierta, setAbierta] = useState(false)

  function alTocar(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") return
    const nodo = event.target
    if (nodo instanceof Element && nodo.closest("a")) return
    setAbierta((valor) => !valor)
  }

  const { portadas } = sitio

  return (
    <div className="group h-full min-w-0" data-open={abierta ? "true" : undefined} onPointerUp={alTocar}>
      <GlowCard accent={acento} className="h-full">
        <div className="overflow-hidden rounded-xl border border-white/15 bg-[#140f2c]">
          <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
            <span className="flex shrink-0 gap-1" aria-hidden="true">
              <span className="size-2 rounded-full bg-[#fb7185]/80" />
              <span className="size-2 rounded-full bg-[#fbbf24]/80" />
              <span className="size-2 rounded-full bg-[#34d399]/80" />
            </span>
            <p className="min-w-0 flex-1 truncate font-mono text-[11px] text-[#d6d1e8]" title={sitio.url}>
              {sitio.url.replace(/^https?:\/\//, "")}
            </p>
          </div>
          <div className="relative aspect-[1280/800] overflow-hidden bg-[#1a1438]">
            <img
              className="portafolio-shot h-full w-full object-cover object-top"
              src={archivoPublico(portadas.escritorio)}
              width={MEDIDA_ESCRITORIO.ancho}
              height={MEDIDA_ESCRITORIO.alto}
              alt={`Portada de ${sitio.nombre}`}
              loading="lazy"
              decoding="async"
            />
            <div className="portafolio-cta absolute inset-x-0 top-3 z-20 flex justify-center px-3">
              <a className="btn-primary" href={sitio.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver sitio de ${sitio.nombre}`}>
                Ver sitio
              </a>
            </div>
            <div className="pointer-events-none absolute right-2 bottom-2 z-10 aspect-[390/844] h-[58%] overflow-hidden rounded-[1.05rem] border-2 border-[#efe8ff]/75 bg-[#0c0a1c] shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
              <span className="absolute top-1 left-1/2 z-10 h-1 w-6 -translate-x-1/2 rounded-full bg-white/40" aria-hidden="true" />
              <img
                className="h-full w-full object-cover object-top"
                src={archivoPublico(portadas.movil)}
                width={MEDIDA_MOVIL.ancho}
                height={MEDIDA_MOVIL.alto}
                alt={`Portada de ${sitio.nombre}`}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
        <h3 className="font-display mt-4 text-xl font-semibold text-white">{sitio.nombre}</h3>
        <p className="mt-1 text-[#d6d1e8]">{sitio.tipo}</p>
      </GlowCard>
    </div>
  )
}
