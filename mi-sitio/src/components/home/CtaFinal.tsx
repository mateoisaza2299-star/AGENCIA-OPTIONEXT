import { Reveal } from "@/components/motion/Reveal"
import { DIAGNOSIS_MESSAGE, whatsappHref } from "@/config"

export function CtaFinal() {
  return (
    <section id="cta-final" className="band band-color scroll-mt-24 px-4 py-16" aria-labelledby="cta-final-title">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 id="cta-final-title" className="section-title">¿Cuánto tiempo y plata lleva perdiéndose en tu negocio esta semana?</h2>
          <p className="mt-4 text-lg text-[#d6d1e8]">
            El diagnóstico es gratis. La conversación dura 30 minutos. Y al final sabes exactamente qué está fallando y cómo arreglarlo.
          </p>
          <p className="mt-4 font-semibold text-[#efe8ff]">No vendemos tecnología. Vendemos el diagnóstico. La tecnología es solo el resultado.</p>
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
