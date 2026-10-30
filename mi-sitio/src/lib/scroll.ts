type ScrollTarget = number | HTMLElement

type Scroller = {
  scrollTo: (target: ScrollTarget, options?: { immediate?: boolean; offset?: number }) => void
}

let scroller: Scroller | null = null

export function registerScroller(next: Scroller | null) {
  scroller = next
}

export function scrollPage(target: ScrollTarget) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (scroller && !reduce) {
    scroller.scrollTo(target, {
      immediate: true,
      offset: typeof target === "number" ? 0 : -96,
    })
    return
  }
  if (typeof target === "number") {
    window.scrollTo(0, target)
    return
  }
  target.scrollIntoView()
}
