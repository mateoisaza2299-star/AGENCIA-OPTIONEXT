import { MessageCircle } from "lucide-react"
import { About } from "@/components/home/About"
import { Contact } from "@/components/home/Contact"
import { CtaFinal } from "@/components/home/CtaFinal"
import { Faq } from "@/components/home/Faq"
import { Garantia } from "@/components/home/Garantia"
import { Hero } from "@/components/home/Hero"
import { Mecanismo } from "@/components/home/Mecanismo"
import { Niveles } from "@/components/home/Niveles"
import { Oferta } from "@/components/home/Oferta"
import { Plans } from "@/components/home/Plans"
import { Portafolio } from "@/components/home/Portafolio"
import { Problems } from "@/components/home/Problems"
import { Process } from "@/components/home/Process"
import { Services } from "@/components/home/Services"
import { Testimonials } from "@/components/home/Testimonials"
import { whatsappHref } from "@/config"

export function Landing() {
  return (
    <main id="contenido">
      <Hero />
      <Problems />
      <Mecanismo />
      <Oferta />
      <Niveles />
      <Testimonials />
      <Portafolio />
      <Garantia />
      <Process />
      <About />
      <Services />
      <Plans />
      <Faq />
      <Contact />
      <CtaFinal />
      <a className="btn-primary float-wa fixed right-4 bottom-4 z-40" href={whatsappHref()} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp">
        <MessageCircle aria-hidden="true" />
      </a>
    </main>
  )
}
