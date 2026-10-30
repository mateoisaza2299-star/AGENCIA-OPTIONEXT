"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import logoMark from "@/assets/optionext-logo.webp"
import { LOOKS, type GlassTuning, type Look, type Settings } from "./glass-settings"

/*
 * 21st.dev Glass Reveal: the mark lingers big against the rim of a clear glass tile, the
 * glass bends it into colour at the corners, then lets go and leaves the mark.
 * The WebGL2 pass runs in a worker. Shader and spring timeline ported from
 * zanwei/glass-icon-reveal (MIT): https://github.com/zanwei/glass-icon-reveal
 */

const BOX = 0.75

function isMarkup(logo: string) {
  return logo.trimStart().startsWith("<")
}

function svgToUrl(text: string) {
  const svg = new DOMParser().parseFromString(text, "image/svg+xml").documentElement
  if (!svg || svg.nodeName.toLowerCase() !== "svg") throw new Error("GlassIconReveal: the SVG could not be read")
  let w = parseFloat(svg.getAttribute("width") || "")
  let h = parseFloat(svg.getAttribute("height") || "")
  const vb = (svg.getAttribute("viewBox") || "").split(/[\s,]+/).map(Number)
  if (vb.length === 4 && vb[2] > 0 && vb[3] > 0) [w, h] = [vb[2], vb[3]]
  if (!(w > 0 && h > 0)) w = h = 100
  const s = 1024 / Math.max(w, h)
  svg.setAttribute("width", String(Math.round(w * s)))
  svg.setAttribute("height", String(Math.round(h * s)))
  const out = new XMLSerializer().serializeToString(svg).replace(/currentColor/g, "#ffffff")
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(out)
}

const resolveLogo = (logo: string) => (isMarkup(logo) ? svgToUrl(logo) : logo)

interface GlassIconRevealProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** SVG markup (`<svg …>…</svg>`) or an image URL. Only the shape is used unless `originalColors` is on */
  logo: string
  /** Starting preset: light glass over a pale backdrop, or dark glass with an icon plate */
  look?: Look
  /** Backdrop colour (hex). Match it to the page: the canvas paints it */
  background?: string
  logoColor?: string
  /** Colour of the tile behind the logo while `iconPlate` is on */
  plateColor?: string
  iconPlate?: boolean
  /** End on the flat icon plate (an app icon, a badge) instead of the bare logo */
  keepPlate?: boolean
  /** Keep the logo's own colours instead of `logoColor` */
  originalColors?: boolean
  /** Largest tile size in px; it shrinks to fit the container */
  tileSize?: number
  /** Logo half size relative to the tile's half size */
  logoScale?: number
  /** Logo size once the glass is gone, relative to `logoScale` */
  finalScale?: number
  /** Shift of the logo's centre, in tile half sizes (y up) */
  logoOffset?: [number, number]
  loop?: boolean
  /** Seconds the finished logo stays before the next loop */
  hold?: number
  speed?: number
  /** Freeze the reveal at this many seconds instead of playing it */
  time?: number
  /** Fine-tune the glass and the motion */
  tuning?: Partial<GlassTuning>
  /** Accessible name of the logo */
  label?: string
}

function GlassIconReveal({
  logo,
  look = "light",
  background,
  logoColor,
  plateColor,
  iconPlate,
  keepPlate,
  originalColors,
  tileSize,
  logoScale,
  finalScale,
  logoOffset,
  loop = true,
  hold,
  speed = 1,
  time,
  tuning,
  label = "Logo",
  className,
  style,
  onClick,
  ...props
}: GlassIconRevealProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const workerRef = React.useRef<Worker | null>(null)
  const [fallback, setFallback] = React.useState(false)

  const tuningKey = JSON.stringify(tuning ?? {})
  const offsetKey = logoOffset ? logoOffset.join(",") : ""
  const settings = React.useMemo<Settings>(() => {
    const own = { background, logoColor, plateColor, iconPlate, keepPlate, originalColors, tileSize, logoScale, finalScale, hold }
    const set: Partial<Settings> = Object.fromEntries(Object.entries(own).filter(([, v]) => v !== undefined))
    if (offsetKey) set.logoOffset = offsetKey.split(",").map(Number) as [number, number]
    return { ...LOOKS[look], ...set, ...(JSON.parse(tuningKey) as Partial<GlassTuning>) }
  }, [look, background, logoColor, plateColor, iconPlate, keepPlate, originalColors, tileSize, logoScale, finalScale, hold, offsetKey, tuningKey])

  const live = React.useRef({ settings, loop, speed, time })
  live.current = { settings, loop, speed, time }
  const logoRef = React.useRef(logo)

  React.useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const canvas = document.createElement("canvas")
    canvas.setAttribute("aria-hidden", "true")
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block"
    if (typeof canvas.transferControlToOffscreen !== "function") {
      setFallback(true)
      return
    }
    wrap.appendChild(canvas)
    const offscreen = canvas.transferControlToOffscreen()
    const worker = new Worker(new URL("./glass.worker.ts", import.meta.url), { type: "module" })
    workerRef.current = worker
    worker.onmessage = (event: MessageEvent<{ type?: string }>) => {
      if (event.data?.type === "error") setFallback(true)
    }
    const dpr = () => Math.min(window.devicePixelRatio || 1, 2)
    worker.postMessage(
      {
        type: "init",
        canvas: offscreen,
        live: live.current,
        reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        cssWidth: wrap.clientWidth,
        cssHeight: wrap.clientHeight,
        dpr: dpr(),
        logo: resolveLogo(logoRef.current),
      },
      [offscreen],
    )
    const io = new IntersectionObserver(([entry]) => {
      worker.postMessage({ type: "visible", visible: entry.isIntersecting })
    })
    io.observe(wrap)
    const ro = new ResizeObserver(() => {
      worker.postMessage({
        type: "resize",
        cssWidth: wrap.clientWidth,
        cssHeight: wrap.clientHeight,
        dpr: dpr(),
      })
    })
    ro.observe(wrap)
    return () => {
      worker.postMessage({ type: "dispose" })
      worker.terminate()
      workerRef.current = null
      io.disconnect()
      ro.disconnect()
      canvas.remove()
    }
  }, [])

  React.useEffect(() => {
    workerRef.current?.postMessage({ type: "update", live: live.current })
  }, [settings, loop, speed, time])

  React.useEffect(() => {
    if (logoRef.current === logo) return
    logoRef.current = logo
    workerRef.current?.postMessage({ type: "logo", logo: resolveLogo(logo) })
  }, [logo])

  const fallbackUrl = fallback ? resolveLogo(logo) : ""

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label={label}
      className={cn("relative isolate cursor-pointer overflow-hidden select-none", className)}
      style={{ backgroundColor: settings.background, ...style }}
      onClick={(event) => {
        workerRef.current?.postMessage({ type: "replay" })
        onClick?.(event)
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return
        event.preventDefault()
        workerRef.current?.postMessage({ type: "replay" })
      }}
      tabIndex={0}
      {...props}
    >
      {fallback && (
        <img
          alt=""
          src={fallbackUrl}
          className="absolute inset-0 m-auto object-contain"
          style={{
            width: settings.tileSize * settings.logoScale * settings.finalScale * BOX,
            height: settings.tileSize * settings.logoScale * settings.finalScale * BOX,
            maxWidth: "40%",
            maxHeight: "40%",
          }}
        />
      )}
    </div>
  )
}

export type GlassReveal21stProps = Omit<GlassIconRevealProps, "logo">

/** Every prop is optional and overrides the baked-in look; `tuning` merges into it */
export function GlassReveal21st({ tuning, ...props }: GlassReveal21stProps) {
  return (
    <GlassIconReveal
      logo={logoMark}
      label="OPTIONEXT"
      look="light"
      originalColors
      background="#0c1020"
      logoScale={0.72}
      finalScale={0.84}
      {...props}
      tuning={{
        startZoom: 2.3,
        ...tuning,
      }}
    />
  )
}

export default GlassReveal21st
