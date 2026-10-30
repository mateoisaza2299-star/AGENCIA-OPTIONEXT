import Lenis from "lenis"
import { useReducedMotion } from "motion/react"
import { useEffect } from "react"

export function SmoothScroll() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.1,
      smoothWheel: true,
    })
    return () => lenis.destroy()
  }, [reduce])

  return null
}
