import { spawnSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, statSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { pathToFileURL } from "node:url"

const LIMITE = 120 * 1024
const VISTAS = [
  { clave: "escritorio", ancho: 1280, alto: 800, archivo: (slug) => `${slug}-desktop.webp` },
  { clave: "movil", ancho: 390, alto: 844, archivo: (slug) => `${slug}-mobile.webp` },
]

const raiz = join(import.meta.dirname, "..")
const salida = join(raiz, "public", "portafolio")
const datos = pathToFileURL(join(raiz, "src/data/portafolio.ts")).href

function exigirCwebp() {
  const bin = spawnSync("cwebp", ["-version"], { encoding: "utf8" })
  if (bin.status !== 0) {
    console.error("Falta cwebp (paquete webp). No se convierten las capturas.")
    process.exit(1)
  }
}

function aWebp(png, webp, ancho, alto) {
  let calidad = 80
  let w = ancho
  let h = alto
  for (let intento = 0; intento < 14; intento += 1) {
    const resultado = spawnSync(
      "cwebp",
      ["-quiet", "-q", String(calidad), "-m", "6", "-metadata", "none", "-resize", String(w), String(h), png, "-o", webp],
      { encoding: "utf8" },
    )
    if (resultado.status !== 0) {
      throw new Error(resultado.stderr || "cwebp falló")
    }
    const peso = statSync(webp).size
    if (peso <= LIMITE) return { peso, calidad, w, h }
    if (calidad > 40) calidad -= 8
    else {
      w = Math.max(320, Math.round(w * 0.86))
      h = Math.max(200, Math.round(h * 0.86))
    }
  }
  return { peso: statSync(webp).size, calidad, w, h }
}

async function estado(url) {
  const respuesta = await fetch(url, { redirect: "follow" })
  return respuesta.status
}

async function cerrarBanners(page) {
  for (let ronda = 0; ronda < 4; ronda += 1) {
    const cerrado = await page.evaluate(() => {
      const visible = (el) => {
        if (!(el instanceof HTMLElement)) return false
        if (el.closest("[hidden]")) return false
        const estilo = getComputedStyle(el)
        if (estilo.display === "none" || estilo.visibility === "hidden" || Number(estilo.opacity) === 0) return false
        const caja = el.getBoundingClientRect()
        return caja.width > 8 && caja.height > 8
      }
      const texto = (el) => `${el.getAttribute("aria-label") || ""} ${el.textContent || ""}`.trim()
      const esCierre = (el) => /cerrar|close|aceptar|acepto|entendido|rechazar|no gracias|×/i.test(texto(el))
      const cajas = [...document.querySelectorAll("[role='dialog'], dialog[open], [class*='cookie' i], [id*='cookie' i], [class*='consent' i], [class*='banner' i], [class*='popup' i], [class*='modal' i]")]
      for (const caja of cajas) {
        if (!visible(caja)) continue
        const boton = [...caja.querySelectorAll("button, [role='button']")].find((nodo) => visible(nodo) && esCierre(nodo))
        if (boton instanceof HTMLElement) {
          boton.click()
          return true
        }
      }
      return false
    })
    if (!cerrado) return
    await page.waitForTimeout(250)
  }
}

async function abrir(page, url) {
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 })
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : String(error)
    if (!/Timeout/i.test(mensaje)) throw error
    const lista = await page
      .evaluate(() => document.readyState === "complete" && (document.body?.innerText || "").trim().length > 40)
      .catch(() => false)
    if (!lista) throw error
    console.warn(`AVISO ${url}: networkidle no cerró; se captura con el contenido ya visible.`)
  }
  await page.waitForTimeout(1500)
}

async function capturar(browser, sitio) {
  const temporales = []
  try {
    const codigo = await estado(sitio.url)
    if (codigo !== 200) {
      console.error(`AVISO ${sitio.nombre}: ${sitio.url} respondió ${codigo}. Queda como sin URL.`)
      return { ok: false, motivo: `HTTP ${codigo}` }
    }
    for (const vista of VISTAS) {
      const context = await browser.newContext({
        viewport: { width: vista.ancho, height: vista.alto },
        deviceScaleFactor: 2,
        locale: "es-CO",
      })
      const page = await context.newPage()
      try {
        await abrir(page, sitio.url)
        await cerrarBanners(page)
        const png = join(mkdtempSync(join(tmpdir(), "portafolio-")), "captura.png")
        temporales.push(png)
        await page.screenshot({ path: png, fullPage: false, type: "png", animations: "allow" })
        const destino = join(salida, vista.archivo(sitio.slug))
        const info = aWebp(png, destino, vista.ancho, vista.alto)
        const kb = (info.peso / 1024).toFixed(1)
        console.log(`${sitio.slug} ${vista.clave}: ${info.w}×${info.h} q${info.calidad} ${kb} KB`)
        if (info.peso > LIMITE) {
          rmSync(destino, { force: true })
          return { ok: false, motivo: `${vista.clave} supera 120 KB` }
        }
      } finally {
        await context.close()
      }
    }
    return { ok: true }
  } catch (error) {
    for (const vista of VISTAS) rmSync(join(salida, vista.archivo(sitio.slug)), { force: true })
    const mensaje = error instanceof Error ? error.message : String(error)
    console.error(`OMITIDO ${sitio.nombre}: ${mensaje.split("\n")[0]}`)
    return { ok: false, motivo: mensaje.split("\n")[0] }
  } finally {
    for (const png of temporales) rmSync(join(png, ".."), { recursive: true, force: true })
  }
}

async function main() {
  exigirCwebp()
  const { portafolio } = await import(datos)
  const sitios = portafolio.filter((sitio) => sitio.url && sitio.portadas)
  if (sitios.length === 0) {
    console.error("No hay URLs en src/data/portafolio.ts")
    process.exit(1)
  }
  mkdirSync(salida, { recursive: true })
  const { chromium } = await import("playwright")
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  })
  const omitidos = []
  try {
    for (const sitio of sitios) {
      const resultado = await capturar(browser, sitio)
      if (!resultado.ok) omitidos.push(`${sitio.nombre}: ${resultado.motivo}`)
    }
  } finally {
    await browser.close()
  }
  if (omitidos.length) {
    console.error("\nSitios omitidos:")
    for (const linea of omitidos) console.error(`- ${linea}`)
    process.exitCode = 1
  }
}

await main()
