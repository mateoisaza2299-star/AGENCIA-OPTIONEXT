import { MessageCircle } from "lucide-react"
import { About } from "@/components/home/About"
import { Contact } from "@/components/home/Contact"
import { Hero } from "@/components/home/Hero"
import { Plans } from "@/components/home/Plans"
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
      <About />
      <Services />
      <Plans />
      <Process />
      <Testimonials />
      <Contact />
      <a className="fixed right-4 bottom-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#4b2e9e] text-white shadow-lg" href={whatsappHref()} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp">
        <MessageCircle aria-hidden="true" />
      </a>
    </main>
  )
}
