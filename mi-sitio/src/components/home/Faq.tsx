import { Reveal } from "@/components/motion/Reveal"

const faq = [
  {
    q: "¿Cuánto cuesta?",
    a: "El diagnóstico es gratis. La propuesta de precio llega después, basada en tu nivel real. Sin paquetes cerrados ni precios inventados.",
  },
  {
    q: "¿Tengo que entender de tecnología?",
    a: "No. Nosotros hacemos el diagnóstico, elegimos el nivel y lo dejamos funcionando. Tu trabajo es contarnos cómo opera tu negocio hoy.",
  },
  {
    q: "¿Qué pasa si no me sirve?",
    a: "Tienes garantía de 3 meses. Si lo implementado no funciona como acordamos, lo corregimos sin costo extra. Sin letra chica.",
  },
  {
    q: "¿Cuánto tarda en funcionar?",
    a: "El Nivel 1 puede estar listo en días. Los niveles más altos dependen de la complejidad, pero siempre empezamos por lo que genera impacto rápido.",
  },
  {
    q: "¿Solo trabajan con un tipo de negocio?",
    a: "No. Trabajamos con cualquier negocio local: restaurantes, barberías, tiendas, talleres, salones, cafeterías. El diagnóstico aplica igual.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="band band-lift scroll-mt-24 px-4 py-16" aria-labelledby="faq-landing-title">
      <div className="mx-auto w-full max-w-[1120px]">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2 id="faq-landing-title" className="section-title">FAQ.</h2>
        </Reveal>
        <Reveal className="mx-auto mt-8 max-w-3xl">
          <div className="sheets space-y-3">
            {faq.map((item) => (
              <details key={item.q} className="sheet p-5">
                <summary className="cursor-pointer font-semibold text-white">{item.q}</summary>
                <p className="mt-3 text-[#d6d1e8]">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
