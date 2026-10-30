import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { currentPath } from "@/lib/path"
import { scrollPage } from "@/lib/scroll"

type LocationState = { path: string; hash: string }

const RouterContext = createContext<LocationState>({ path: "/", hash: "" })

export function useRouter() {
  return useContext(RouterContext)
}

function readLocation(): LocationState {
  return { path: currentPath(), hash: window.location.hash }
}

function isPlainClick(event: MouseEvent) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
}

export function Router({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState(readLocation)

  useEffect(() => {
    const sync = () => setLocation(readLocation())
    window.addEventListener("popstate", sync)
    return () => window.removeEventListener("popstate", sync)
  }, [])

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || !isPlainClick(event)) return
      const anchor = (event.target as Element | null)?.closest("a")
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return
      const raw = anchor.getAttribute("href")
      if (!raw || raw.startsWith("mailto:") || raw.startsWith("tel:")) return
      const url = new URL(anchor.href)
      if (url.origin !== window.location.origin) return
      event.preventDefault()
      const next = `${url.pathname}${url.search}${url.hash}`
      const same = url.pathname === window.location.pathname && url.search === window.location.search && url.hash === window.location.hash
      if (!same) window.history.pushState(null, "", next)
      setLocation(readLocation())
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      const hash = location.hash.replace(/^#/, "")
      const target = hash ? document.getElementById(hash) : null
      scrollPage(target ?? 0)
    })
    return () => window.cancelAnimationFrame(id)
  }, [location])

  return <RouterContext.Provider value={location}>{children}</RouterContext.Provider>
}
