import { Reveal } from "@/components/motion/Reveal"

const faq = [
  {
    q: "¿Cuánto cuesta?",
    a: "El diagnóstico es gratis. La propuesta llega después, según tu operación, con un plan de precio cerrado.",
  },
  {
    q: "¿Tengo que entender de tecnología?",
    a: "No. Empezamos viendo cómo trabaja tu negocio. La herramienta entra cuando resuelve un problema real.",
  },
  {
    q: "¿Qué pasa si no me sirve?",
    a: "Hay garantía de 3 meses, según el contrato. Cubre los defectos que defina el contrato.",
  },
  {
    q: "¿Cómo trabajan?",
    a: "Diagnóstico, propuesta a medida, puesta en marcha y soporte. Si una pieza no hace falta, no la vendemos.",
  },
  {
    q: "¿Con quién trabajan?",
    a: "Con MIPYMES y negocios locales de la Sabana de Occidente y la zona: tiendas, talleres, restaurantes y empresas familiares.",
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
