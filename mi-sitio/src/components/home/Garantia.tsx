import { Reveal } from "@/components/motion/Reveal"
import { DIAGNOSIS_MESSAGE, whatsappHref } from "@/config"

export function Garantia() {
  return (
    <section id="garantia" className="band band-warm scroll-mt-24 px-4 py-16" aria-labelledby="garantia-title">
      <div className="mx-auto w-full max-w-[1120px]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Garantía</p>
          <h2 id="garantia-title" className="section-title">3 meses.</h2>
          <p className="mt-4 text-lg text-[#d6d1e8]">
            Garantía contractual de 3 meses, según el contrato. Cubre los defectos que defina el contrato.
          </p>
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
