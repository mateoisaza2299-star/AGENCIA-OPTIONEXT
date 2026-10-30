import { Landing } from "@/components/home/Landing"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { SmoothScroll } from "@/components/motion/SmoothScroll"
import { GlowMotionStyles } from "@/components/ui/glow-card"

export default function App() {
  return (
    <>
      <GlowMotionStyles />
      <SmoothScroll />
      <Header />
      <Landing />
      <Footer />
    </>
  )
}
