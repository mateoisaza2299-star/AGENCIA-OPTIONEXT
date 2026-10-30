import { useEffect, useState } from "react"
import { Landing } from "@/components/home/Landing"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { SmoothScroll } from "@/components/motion/SmoothScroll"
import { PricesPage } from "@/components/prices/PricesPage"
import { currentPath } from "@/lib/path"

export default function App() {
  const [path, setPath] = useState(currentPath)

  useEffect(() => {
    const sync = () => setPath(currentPath())
    window.addEventListener("popstate", sync)
    return () => window.removeEventListener("popstate", sync)
  }, [])

  const prices = path === "/precios"

  return (
    <>
      <SmoothScroll />
      <Header />
      {prices ? <PricesPage /> : <Landing />}
      <Footer />
    </>
  )
}
