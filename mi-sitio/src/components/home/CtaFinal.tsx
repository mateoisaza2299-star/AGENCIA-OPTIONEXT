import { Reveal } from "@/components/motion/Reveal"
import { DIAGNOSIS_MESSAGE, whatsappHref } from "@/config"

export function CtaFinal() {
  return (
    <section id="cta-final" className="band band-color scroll-mt-24 px-4 py-16" aria-labelledby="cta-final-title">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 id="cta-final-title" className="section-title">Agenda ahora.</h2>
          <p className="mt-4 text-lg text-[#d6d1e8]">
            Diagnóstico gratis. 30 minutos. Sales sabiendo qué falla y cómo arreglarlo.
          </p>
          <p className="mt-4 font-semibold text-[#efe8ff]">Solo 3 diagnósticos nuevos este mes. Garantía de 3 meses.</p>
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
