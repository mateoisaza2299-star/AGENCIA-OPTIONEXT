const BOUND = "data-scroll-bound"
const ENTER_MS = 550
const STAGGER_MS = 90
const STAGGER_CAP_MS = 300

function settle(el: HTMLElement) {
  el.classList.remove("is-animating")
  el.classList.add("is-settled")
}

function showAll() {
  document.documentElement.classList.remove("js-reveal")
  document.querySelectorAll<HTMLElement>(".scroll-in").forEach((el) => {
    el.classList.remove("is-animating")
    el.classList.add("is-visible", "is-settled")
  })
}

function staggerMs(el: HTMLElement) {
  const raw = getComputedStyle(el).getPropertyValue("--scroll-i")
  const index = Number.parseFloat(raw)
  if (!Number.isFinite(index) || index < 0) return 0
  return Math.min(index * STAGGER_MS, STAGGER_CAP_MS)
}

export function initScrollReveal() {
  const host = window as Window & { __optionextScroll?: boolean }
  if (host.__optionextScroll) return
  host.__optionextScroll = true

  if (!("IntersectionObserver" in window)) return

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
  if (motion.matches) {
    showAll()
    return
  }

  let observer: IntersectionObserver
  try {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          if (!(el instanceof HTMLElement)) return
          el.classList.add("is-animating", "is-visible")
          const finish = (event?: Event) => {
            if (event instanceof TransitionEvent) {
              if (event.target !== el) return
              if (event.propertyName !== "opacity" && event.propertyName !== "transform") return
            }
            el.removeEventListener("transitionend", finish)
            settle(el)
          }
          el.addEventListener("transitionend", finish)
          window.setTimeout(finish, staggerMs(el) + ENTER_MS + 80)
          observer.unobserve(el)
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    )
  } catch {
    showAll()
    return
  }

  const scan = () => {
    if (motion.matches) return
    document.querySelectorAll<HTMLElement>(`.scroll-in:not([${BOUND}])`).forEach((el) => {
      el.setAttribute(BOUND, "")
      observer.observe(el)
    })
  }

  scan()
  const mutations = new MutationObserver(scan)
  mutations.observe(document.body, { childList: true, subtree: true })

  motion.addEventListener("change", () => {
    if (!motion.matches) return
    observer.disconnect()
    mutations.disconnect()
    showAll()
  })
}
