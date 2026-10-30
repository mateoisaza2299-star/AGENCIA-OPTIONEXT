import { useEffect, useState, type FocusEvent, type PointerEvent, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Brand purple #4B2E9E, plus violet and indigo. Other hues are punctual accents. */
export const ACCENTS = {
  brand: "75, 46, 158",
  violet: "139, 92, 246",
  indigo: "99, 102, 241",
  fuchsia: "232, 121, 249",
  cyan: "34, 211, 238",
  emerald: "52, 211, 153",
  amber: "251, 191, 36",
} as const

export type Accent = keyof typeof ACCENTS

export const GRID_LINES =
  "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)"

const MOTION_CSS = `
@keyframes tb-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
.tb-pulse { animation: tb-pulse 1.6s ease-in-out infinite; }
@keyframes tb-slide {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.tb-slide { animation: tb-slide 0.3s ease both; }
@keyframes tb-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.tb-blink { animation: tb-blink 1s steps(2, start) infinite; }
@keyframes tb-fade {
  from { opacity: 0; transform: translateY(3px); }
  to { opacity: 1; transform: translateY(0); }
}
.tb-fade { animation: tb-fade 0.3s ease both; }
@media (prefers-reduced-motion: reduce) {
  .tb-pulse, .tb-slide, .tb-blink, .tb-fade { animation: none; }
}
`

export function GlowMotionStyles() {
  return <style>{MOTION_CSS}</style>
}

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setReduce(media.matches)
    apply()
    media.addEventListener("change", apply)
    return () => media.removeEventListener("change", apply)
  }, [])
  return reduce
}

export function useAnimatedNumber(target: number, duration = 700) {
  const [value, setValue] = useState(target)
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) {
      setValue(target)
      return
    }
    const from = value
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(from + (target - from) * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // `value` is the start of this run; including it would restart every frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration])
  return value
}

type GlowCardProps = {
  accent?: Accent
  className?: string
  children: ReactNode
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onFocus?: (event: FocusEvent<HTMLDivElement>) => void
  onBlur?: (event: FocusEvent<HTMLDivElement>) => void
  tabIndex?: number
}

export function GlowCard({
  accent = "brand",
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  tabIndex,
}: GlowCardProps) {
  const reduce = usePrefersReducedMotion()
  const [point, setPoint] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)
  const rgb = ACCENTS[accent]
  const lit = active && !reduce
  const mask = `radial-gradient(220px circle at ${point.x}px ${point.y}px, black, transparent 75%)`

  function move(clientX: number, clientY: number, element: HTMLDivElement) {
    if (reduce) return
    const box = element.getBoundingClientRect()
    setPoint({ x: clientX - box.left, y: clientY - box.top })
  }

  function onPointer(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.buttons === 0 && event.type === "pointermove" && !active) return
    move(event.clientX, event.clientY, event.currentTarget)
    if (event.pointerType !== "mouse") setActive(true)
  }

  return (
    <div
      tabIndex={tabIndex}
      onPointerMove={onPointer}
      onPointerDown={onPointer}
      onMouseEnter={() => {
        if (!reduce) setActive(true)
        onMouseEnter?.()
      }}
      onMouseLeave={() => {
        setActive(false)
        onMouseLeave?.()
      }}
      onPointerUp={() => {
        if (window.matchMedia("(hover: none)").matches) setActive(false)
      }}
      onFocus={(event) => {
        if (!reduce) setActive(true)
        onFocus?.(event)
      }}
      onBlur={(event) => {
        const next = event.relatedTarget
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) setActive(false)
        onBlur?.(event)
      }}
      className={cn("relative rounded-3xl", className)}
    >
      <div aria-hidden="true" className="absolute inset-0 rounded-3xl bg-white/10" />
      <div
        aria-hidden="true"
        className={cn("absolute inset-0 rounded-3xl transition-opacity duration-500", lit ? "opacity-100" : "opacity-0")}
        style={{ background: `radial-gradient(240px circle at ${point.x}px ${point.y}px, rgba(${rgb}, 0.95), transparent 70%)` }}
      />
      <div aria-hidden="true" className="absolute inset-px overflow-hidden rounded-[23px] bg-[#0b0d15]">
        <div
          className={cn("absolute inset-0 transition-opacity duration-500", lit ? "opacity-100" : "opacity-0")}
          style={{ background: `radial-gradient(380px circle at ${point.x}px ${point.y}px, rgba(${rgb}, 0.14), transparent 65%)` }}
        />
        <div
          className={cn("absolute inset-0 transition-opacity duration-500", lit ? "opacity-100" : "opacity-0")}
          style={{ backgroundImage: GRID_LINES, backgroundSize: "26px 26px", maskImage: mask, WebkitMaskImage: mask }}
        />
      </div>
      <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">{children}</div>
    </div>
  )
}

export function CardTitle({ children, right, className }: { children: ReactNode; right?: ReactNode; className?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h3 className={cn("text-sm font-medium text-[#d6d1e8]", className)}>{children}</h3>
      {right}
    </div>
  )
}

export function SectionGlow({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = usePrefersReducedMotion()
  const [point, setPoint] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  function track(event: PointerEvent<HTMLDivElement>) {
    if (reduce) return
    const box = event.currentTarget.getBoundingClientRect()
    setPoint({ x: event.clientX - box.left, y: event.clientY - box.top })
    setActive(true)
  }

  return (
    <div className={cn("relative", className)} onPointerMove={track} onPointerLeave={() => setActive(false)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{ backgroundImage: GRID_LINES, backgroundSize: "28px 28px" }}
      />
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute inset-0 transition-opacity duration-500", active && !reduce ? "opacity-100" : "opacity-0")}
        style={{ background: `radial-gradient(420px circle at ${point.x}px ${point.y}px, rgba(75, 46, 158, 0.28), transparent 68%)` }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export type TerminalLine = {
  mark: string
  markClass: string
  textClass: string
  text: string
}

export function TypingLog({ lines, label }: { lines: TerminalLine[]; label: string }) {
  const reduce = usePrefersReducedMotion()
  const [count, setCount] = useState(reduce ? lines.length : 1)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setCount((current) => (current >= lines.length + 3 ? 1 : current + 1))
    }, 850)
    return () => window.clearInterval(id)
  }, [reduce, lines.length])

  const shown = reduce ? lines.length : Math.min(count, lines.length)
  const visible = lines.slice(0, shown)

  return (
    <div
      role="log"
      aria-label={label}
      className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden rounded-xl border border-white/5 bg-black/30 p-4 font-mono text-xs leading-relaxed"
    >
      {visible.map((line, index) => {
        const current = index === visible.length - 1 && shown < lines.length
        return (
          <div key={`${line.text}-${index}`} className="tb-slide flex gap-2">
            <span className={cn("w-3 shrink-0 text-center", line.markClass)} aria-hidden="true">
              {line.mark}
            </span>
            <span className={cn("min-w-0 break-words", line.textClass)}>
              {line.text}
              {current ? <span className="tb-blink ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-[#c084fc]" /> : null}
            </span>
          </div>
        )
      })}
    </div>
  )
}
