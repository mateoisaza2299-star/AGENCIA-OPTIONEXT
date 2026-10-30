import { Landing } from "@/components/home/Landing"
import { PricesPage } from "@/components/prices/PricesPage"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { SmoothScroll } from "@/components/motion/SmoothScroll"
import { Aurora } from "@/components/ui/Aurora"
import { GlowMotionStyles } from "@/components/ui/glow-card"
import { useRouter } from "@/lib/router"

export default function App() {
  const { path } = useRouter()
  return (
    <>
      <GlowMotionStyles />
      <Aurora />
      <SmoothScroll />
      <div className="relative z-10">
        <Header />
        {path === "/precios" ? <PricesPage /> : <Landing />}
        <Footer />
      </div>
    </>
  )
}
