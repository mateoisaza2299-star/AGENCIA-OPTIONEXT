import Lenis from "lenis"
import { useReducedMotion } from "motion/react"
import { useEffect } from "react"
import { registerScroller } from "@/lib/scroll"

export function SmoothScroll() {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({
      autoRaf: true,
      anchors: false,
      lerp: 0.1,
      smoothWheel: true,
    })
    registerScroller(lenis)
    return () => {
      registerScroller(null)
      lenis.destroy()
    }
  }, [reduce])

  return null
}
