import { useEffect } from "react"
import type { ReactNode } from "react"
import { Reveal } from "@/components/motion/Reveal"
import { DIAGNOSIS_MESSAGE, planQuote, whatsappHref } from "@/config"
import { appHref } from "@/lib/path"
import {
  addonNotes,
  addons,
  automations,
  conditions,
  diagnostico,
  faq,
  formatMoney,
  launchNotice,
  licenseClear,
  licenseIntro,
  licenseNote,
  licenses,
  maintenance,
  maintenanceNotes,
  paquetes,
  stepNote,
  web,
} from "@/data/precios"

const landingTitle = "OPTIONEXT | Diagnóstico y soluciones digitales para MIPYMES"
const landingDescription = "Equipo joven de la Sabana de Occidente, Cundinamarca. Diagnosticamos cómo trabaja tu negocio e implementamos sitios web, bots de WhatsApp, automatizaciones con n8n e inteligencia artificial."

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    const meta = document.querySelector('meta[name="description"]')
    const previous = meta?.getAttribute("content") ?? ""
    meta?.setAttribute("content", description)
    return () => {
      document.title = landingTitle
      meta?.setAttribute("content", previous || landingDescription)
    }
  }, [title, description])
}

type Pair = { launch: number; standard?: number }
type ScopeItem = { name: string; label?: string; includes: string[]; excludes: string[] }

function Dual({ pair, unit }: { pair: Pair; unit?: string }) {
  return (
    <div>
      <p className="text-white">
        <span className="mr-2 text-xs font-bold tracking-wide text-[#efe8ff] uppercase">Lanzamiento</span>
        <strong>{formatMoney(pair.launch)}</strong>
        {unit ? <span className="text-[#d6d1e8]"> {unit}</span> : null}
      </p>
      {pair.standard != null ? <p className="text-sm text-[#d6d1e8]">Estándar: {formatMoney(pair.standard)}</p> : null}
    </div>
  )
}

function Scope({ item, quote }: { item: ScopeItem; quote?: boolean }) {
  return (
    <div>
      <details className="text-sm text-[#d6d1e8]">
        <summary className="cursor-pointer font-semibold text-white">Ver alcance</summary>
        {item.includes.length ? (
          <>
            <p className="mt-3 font-semibold text-white">Qué incluye</p>
            <ul className="mt-1 list-disc pl-5">{item.includes.map((line) => <li key={line}>{line}</li>)}</ul>
          </>
        ) : null}
        {item.excludes.length ? (
          <>
            <p className="mt-3 font-semibold text-white">No incluye</p>
            <ul className="mt-1 list-disc pl-5">{item.excludes.map((line) => <li key={line}>{line}</li>)}</ul>
          </>
        ) : null}
      </details>
      {quote ? (
        <a className="btn-ghost mt-4" href={whatsappHref(planQuote(item.name))} target="_blank" rel="noopener noreferrer">Cotizar por WhatsApp</a>
      ) : null}
    </div>
  )
}

export function PricesPage() {
  usePageMeta(
    "Precios para digitalizar tu negocio | OPTIONEXT",
    "Diagnóstico inicial gratis y planes Startex, Pro Option y Businext para negocios de la Sabana de Occidente. Tarifas comerciales en pesos, sin permanencia en la mensualidad.",
  )

  return (
    <main id="contenido" className="pt-28">
      <section id="diagnostico" className="band band-deep px-4 py-16" aria-labelledby="dx-title">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Disponible esta semana: 3 cupos</p>
          <h1 id="dx-title" className="section-title">Primero entendemos tu negocio, después decidimos qué <span className="grad">tecnología</span> sirve</h1>
          <p className="mt-4 text-lg text-[#d6d1e8]">30-45 min. Presencial en Sabana Occidente o virtual. Sin compromiso. Te entregamos un documento de una página con 3 problemas detectados, una oportunidad rápida y una recomendación honesta.</p>
          <p className="font-display mt-4 text-3xl font-bold text-white">{diagnostico.gratis ? `Gratis · ${formatMoney(diagnostico.price)}` : formatMoney(diagnostico.price)}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a className="btn-primary" href={whatsappHref(DIAGNOSIS_MESSAGE)} target="_blank" rel="noopener noreferrer">Agendar diagnóstico gratis</a>
            <a className="btn-ghost" href="#paquetes">Ver precios y planes</a>
          </div>
          <ul className="mt-6 space-y-1 text-[#d6d1e8]">
            <li>Sin tarjeta de crédito</li>
            <li>Sin compromiso de compra</li>
            <li>3 estudiantes, no vendedores</li>
          </ul>
        </div>
      </section>

      <section id="paquetes" className="band band-lift scroll-mt-24 px-4 py-16" aria-labelledby="paquetes-title">
        <div className="mx-auto max-w-[1120px]">
          <Reveal>
            <h2 id="paquetes-title" className="section-title text-center"><span className="grad">Paquetes</span></h2>
            <p className="mt-3 text-center text-lg text-[#d6d1e8]">Configuración única y mensualidad, siempre separadas.</p>
            <p className="mx-auto mt-4 max-w-3xl text-[#d6d1e8]">{launchNotice}</p>
          </Reveal>
          <div className="sheets mt-8 grid gap-4 lg:grid-cols-3">
            {paquetes.map((plan) => (
              <article key={plan.id} id={plan.id} className={`sheet scroll-mt-28 p-6 ${plan.recommended ? "sheet-hot" : ""}`}>
                {plan.recommended ? <p className="mb-2 text-xs font-bold text-[#efe8ff]">Recomendado</p> : null}
                <h3 className="font-display text-2xl font-semibold text-white">{plan.name}</h3>
                <p className="text-[#d6d1e8]">{plan.label}</p>
                <div className="mt-4 space-y-3">
                  <p className="text-xs font-bold tracking-wide text-[#efe8ff] uppercase">Mensualidad</p>
                  <Dual pair={plan.monthly} unit="/mes" />
                  <p className="text-xs font-bold tracking-wide text-[#efe8ff] uppercase">Configuración</p>
                  <Dual pair={plan.setup} />
                </div>
                <p className="mt-4 text-[#d6d1e8]">{plan.ideal}</p>
                <Scope item={plan} quote />
              </article>
            ))}
          </div>
          <p className="mt-6 text-[#d6d1e8]">Qué cubre la mensualidad: gestión y soporte del servicio contratado, revisión funcional periódica si se indica en la propuesta y pequeños ajustes dentro de un límite acordado por escrito. El mantenimiento solo está incluido cuando la propuesta lo indica. El precio de configuración y el mensual se muestran siempre separados.</p>
          <p className="mt-3 text-sm text-[#d6d1e8]">El setup se paga una sola vez al contratar. La mensualidad se cobra entre el día 1 y el 5 de cada mes. Cancelación: aviso de 15 días, sin penalidad.</p>
        </div>
      </section>

      <SheetSection id="web" band="band-color" title="Web" lede="Solo mensualidad, tarifa de lanzamiento." items={web} price={(item) => <Dual pair={item.monthly} unit="/mes" />} />
      <SheetSection id="automatizaciones" band="band-deep" title="Automatizaciones" lede="Instalación única. La mensualidad de mantenimiento es opcional." items={automations} price={(item) => <Dual pair={item.setup} />} note={stepNote} />
      <SheetSection id="mantenimiento" band="band-warm" title="Mantenimiento opcional de automatizaciones" lede="Mensual, solo para algo ya construido. No incluye flujos nuevos." items={maintenance} price={(item) => <Dual pair={item.monthly} unit="/mes" />} notes={maintenanceNotes} />

      <section id="adicionales" className="band band-lift scroll-mt-24 px-4 py-16" aria-labelledby="addon-title">
        <div className="mx-auto max-w-[1120px]">
          <h2 id="addon-title" className="section-title text-center">Servicios adicionales</h2>
          <p className="mt-3 text-center text-[#d6d1e8]">
            Para CRM recomendamos <a className="text-[#efe8ff]" href="https://kommo.com" target="_blank" rel="noopener noreferrer">Kommo</a> o <a className="text-[#efe8ff]" href="https://www.hubspot.com" target="_blank" rel="noopener noreferrer">HubSpot Free</a>.
          </p>
          <div className="sheets mt-8 space-y-4">
            {addons.map((item) => (
              <article key={item.name} className="sheet p-5">
                <h3 className="font-display text-xl font-semibold text-white">{item.name}</h3>
                <p className="mt-2 text-white">
                  <strong>{item.from ? `desde ${formatMoney(item.price)}` : formatMoney(item.price)}</strong>
                  {item.unit ? <span className="text-[#d6d1e8]"> {item.unit}</span> : null}
                </p>
                <Scope item={item} quote />
              </article>
            ))}
          </div>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-[#d6d1e8]">{addonNotes.map((line) => <li key={line}>{line}</li>)}</ul>
        </div>
      </section>

      <section id="licencias" className="band band-deep scroll-mt-24 px-4 py-16" aria-labelledby="license-title">
        <div className="mx-auto max-w-[1120px]">
          <h2 id="license-title" className="section-title text-center">Licencias</h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-[#d6d1e8]">{licenseIntro}</p>
          <div className="sheets mt-8 space-y-4">
            {licenses.map((item) => (
              <article key={item.name} className="sheet p-5">
                <h3 className="font-display text-xl font-semibold text-white">{item.name}</h3>
                <p className="mt-2 font-bold text-white">{formatMoney(item.price)}</p>
                <Scope item={item} quote />
              </article>
            ))}
          </div>
          <h3 className="font-display mt-8 text-xl font-semibold text-white">Qué debe quedar claro</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[#d6d1e8]">{licenseClear.map((line) => <li key={line}>{line}</li>)}</ul>
          <aside className="sheet sheet-hot mt-8 p-5">
            <h3 className="font-display text-xl font-semibold text-white">Importante antes de comprar una licencia</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[#d6d1e8]">
              <li>No hay soporte, actualizaciones, monitoreo, backups automáticos ni seguridad gestionada.</li>
              <li>Necesitas VPS propio (mínimo Hetzner CX33 $75.000/mes) y nociones básicas de Linux, Docker o Coolify.</li>
              <li>WhatsApp Meta, OpenRouter, Supabase, Wompi y Metabase: cuentas y facturación 100% tuyas.</li>
              <li>Si se rompe algo por una actualización de un tercero (Meta, n8n, Baserow), lo arreglas tú o pagas un pack de 5 horas ($150.000).</li>
              <li>El alojamiento o la infraestructura administrados por OPTIONEXT aplican según la modalidad acordada en la propuesta de ese cliente: Modalidad A (suscripción) o Modalidad B (implementación alojada / llave en mano). No quedan incluidos en todos los planes.</li>
            </ul>
          </aside>
          <p className="mt-4 text-sm text-[#d6d1e8]">{licenseNote}</p>
        </div>
      </section>

      <section id="condiciones" className="band band-color scroll-mt-24 px-4 py-16" aria-labelledby="conditions-title">
        <div className="mx-auto max-w-3xl">
          <h2 id="conditions-title" className="section-title text-center">Condiciones generales</h2>
          <details className="sheet mt-6 p-5" open>
            <summary className="cursor-pointer font-semibold text-white">Condiciones generales</summary>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[#d6d1e8]">{conditions.map((line) => <li key={line}>{line}</li>)}</ul>
          </details>
        </div>
      </section>

      <section id="faq" className="band band-warm scroll-mt-24 px-4 py-16" aria-labelledby="faq-title">
        <div className="mx-auto max-w-3xl">
          <h2 id="faq-title" className="section-title text-center">Preguntas frecuentes</h2>
          <p className="mt-3 text-center text-[#d6d1e8]">Respuestas honestas, sin letra chica.</p>
          <div className="sheets mt-6 space-y-3">
            {faq.map((item) => (
              <details key={item.q} className="sheet p-5">
                <summary className="cursor-pointer font-semibold text-white">{item.q}</summary>
                <p className="mt-3 text-[#d6d1e8]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-lift px-4 py-16" aria-labelledby="cierre-title">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="cierre-title" className="section-title">¿Listo para empezar? El <span className="grad">diagnóstico</span> es gratis.</h2>
          <p className="mt-4 text-lg text-[#d6d1e8]">30 minutos. 3 problemas detectados. 1 oportunidad rápida. 0 compromiso.</p>
          <a className="btn-primary mt-6" href={appHref("/#contacto")}>Agenda un diagnóstico</a>
        </div>
      </section>
    </main>
  )
}

function SheetSection<T extends ScopeItem>({
  id,
  band,
  title,
  lede,
  items,
  price,
  note,
  notes,
}: {
  id: string
  band: string
  title: string
  lede: string
  items: T[]
  price: (item: T) => ReactNode
  note?: string
  notes?: string[]
}) {
  return (
    <section id={id} className={`band ${band} scroll-mt-24 px-4 py-16`} aria-labelledby={`${id}-title`}>
      <div className="mx-auto max-w-[1120px]">
        <h2 id={`${id}-title`} className="section-title text-center"><span className="grad">{title}</span></h2>
        <p className="mt-3 text-center text-lg text-[#d6d1e8]">{lede}</p>
        <div className="sheets mt-8 space-y-4">
          {items.map((item) => (
            <article key={item.name} className="sheet p-5">
              <h3 className="font-display text-xl font-semibold text-white">{item.name}</h3>
              {item.label ? <p className="text-[#d6d1e8]">{item.label}</p> : null}
              <div className="mt-3">{price(item)}</div>
              <Scope item={item} quote />
            </article>
          ))}
        </div>
        {note ? <p className="mt-6 text-[#d6d1e8]">{note}</p> : null}
        {notes ? <ul className="mt-4 list-disc space-y-2 pl-5 text-[#d6d1e8]">{notes.map((line) => <li key={line}>{line}</li>)}</ul> : null}
      </div>
    </section>
  )
}
