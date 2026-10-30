import { motion, useReducedMotion } from "motion/react"
import { useState } from "react"
import type { FormEvent } from "react"
import { Reveal } from "@/components/motion/Reveal"
import { GlowCard } from "@/components/ui/glow-card"
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_TEL, isPending, mailtoHref, whatsappHref } from "@/config"

const messages: Record<string, string> = {
  nombre: "Escribe tu nombre.",
  negocio: "Escribe el nombre del negocio.",
  telefono: "Escribe un teléfono o WhatsApp.",
  mensaje: "Cuéntanos brevemente qué pasa en el negocio.",
}

type Fields = {
  nombre: string
  negocio: string
  telefono: string
  mensaje: string
}

const empty: Fields = { nombre: "", negocio: "", telefono: "", mensaje: "" }

export function Contact() {
  const reduce = useReducedMotion()
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Partial<Fields>>({})
  const [ready, setReady] = useState<string | null>(null)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next: Partial<Fields> = {}
    if (!fields.nombre.trim()) next.nombre = messages.nombre
    if (!fields.negocio.trim()) next.negocio = messages.negocio
    if (!fields.telefono.trim()) next.telefono = messages.telefono
    else if (fields.telefono.trim().length < 7) next.telefono = "Revisa el teléfono: se ve incompleto."
    if (!fields.mensaje.trim()) next.mensaje = messages.mensaje
    setErrors(next)
    if (Object.keys(next).length) return

    const nombre = fields.nombre.trim()
    const lines = [
      "Hola, equipo OPTIONEXT. Quiero agendar un diagnóstico.",
      `Nombre: ${nombre}`,
      `Negocio: ${fields.negocio.trim()}`,
      `Teléfono: ${fields.telefono.trim()}`,
      "Plan de interés: aún no elijo",
      `Mensaje: ${fields.mensaje.trim()}`,
    ]
    setReady(whatsappHref(lines.join("\n")))
  }

  return (
    <section id="contacto" className="scroll-mt-24 px-4 py-16" aria-labelledby="contacto-title">
      <div className="mx-auto grid w-full max-w-[1120px] gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Contacto</p>
          <h2 id="contacto-title" className="section-title">Agenda un diagnóstico.</h2>
          <p className="mt-4 text-lg text-[#d6d1e8]">Cuéntanos cómo atiendes, cobras y entregas. En la primera conversación buscamos el problema. No te empujamos un paquete.</p>
          <ul className="mt-5 space-y-2 text-[#d6d1e8]">
            <li>Diagnóstico gratuito, para ver si hay algo que valga la pena construir.</li>
            <li>Propuesta según tu operación, con un plan de precio cerrado.</li>
            <li>Respuesta por WhatsApp si prefieres no llenar el formulario.</li>
            <li>
              {isPending(PHONE_TEL) ? PHONE_DISPLAY : <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>}
            </li>
            <li>
              <a className="text-[#efe8ff]" href={mailtoHref()}>{CONTACT_EMAIL}</a>
            </li>
          </ul>
          <p className="mt-6">
            <motion.a
              className="btn-primary"
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduce ? undefined : { scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              Escribir por WhatsApp
            </motion.a>
          </p>
        </Reveal>
        <Reveal>
          <GlowCard accent="brand" className="h-full">
            {ready ? (
              <div role="status" tabIndex={-1}>
                <h3 className="font-display text-2xl font-semibold text-white">{fields.nombre.trim() ? `Listo, ${fields.nombre.trim()}.` : "Listo"}</h3>
                <p className="mt-3 text-[#d6d1e8]">Preparamos el mensaje con los datos de tu negocio. Ábrelo en WhatsApp y envíalo para agendar el diagnóstico.</p>
                <p className="mt-3 text-sm text-[#d6d1e8]">Este formulario todavía no está conectado a un servidor: el mensaje no queda guardado hasta que lo envíes por WhatsApp.</p>
                <a className="btn-primary mt-5 w-full" href={ready} target="_blank" rel="noopener noreferrer">Continuar en WhatsApp</a>
                <button className="btn-ghost mt-3 w-full" type="button" onClick={() => setReady(null)}>Editar datos</button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit}>
                <Field id="nombre" label="Nombre" value={fields.nombre} error={errors.nombre} autoComplete="name" maxLength={80} placeholder="María Gómez" onChange={(value) => setFields({ ...fields, nombre: value })} />
                <Field id="negocio" label="Negocio" value={fields.negocio} error={errors.negocio} autoComplete="organization" maxLength={120} placeholder="Panadería La Espiga" onChange={(value) => setFields({ ...fields, negocio: value })} />
                <Field id="telefono" label="Teléfono" value={fields.telefono} error={errors.telefono} autoComplete="tel" type="tel" maxLength={20} placeholder="300 000 0000" onChange={(value) => setFields({ ...fields, telefono: value })} />
                <label className="mt-4 block text-sm font-semibold text-white" htmlFor="mensaje">Mensaje</label>
                <textarea id="mensaje" name="mensaje" required maxLength={1000} placeholder="Cuéntanos cómo atiendes hoy y qué se está enredando." className="field" value={fields.mensaje} onChange={(event) => setFields({ ...fields, mensaje: event.target.value })} />
                {errors.mensaje ? <p className="mt-1 text-sm text-[#ffb4b4]">{errors.mensaje}</p> : null}
                <button className="btn-primary mt-5 w-full" type="submit">Agendar diagnóstico</button>
              </form>
            )}
          </GlowCard>
        </Reveal>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  ...props
}: {
  id: string
  label: string
  value: string
  error?: string
  onChange: (value: string) => void
  type?: string
  autoComplete?: string
  maxLength?: number
  placeholder?: string
}) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-semibold text-white" htmlFor={id}>{label}</label>
      <input id={id} name={id} type={type} required className="field" value={value} aria-invalid={error ? true : undefined} onChange={(event) => onChange(event.target.value)} {...props} />
      {error ? <p className="mt-1 text-sm text-[#ffb4b4]">{error}</p> : null}
    </div>
  )
}
