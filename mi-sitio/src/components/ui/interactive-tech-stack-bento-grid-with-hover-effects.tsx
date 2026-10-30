import {
  CardTitle,
  GlowCard,
  GlowMotionStyles,
  TypingLog,
  useAnimatedNumber,
  type TerminalLine,
} from "@/components/ui/glow-card"

/*
 * Interactive Tech Stack Bento Grid with Hover Effects
 * Author: themeocean. License: MIT.
 * https://21st.dev/@themeocean/components/interactive-tech-stack-bento-grid-with-hover-effects
 * GlowCard, CardTitle, useAnimatedNumber and the motion CSS live in glow-card.tsx.
 * This demo is not mounted on the OPTIONEXT landing.
 */

const LOG: TerminalLine[] = [
  { mark: "$", markClass: "text-[#e879f9]", textClass: "text-slate-100", text: "pnpm install" },
  { mark: "✓", markClass: "text-emerald-300", textClass: "text-slate-300", text: "312 packages installed in 2.1s" },
  { mark: "$", markClass: "text-[#e879f9]", textClass: "text-slate-100", text: "pnpm build" },
  { mark: "›", markClass: "text-slate-500", textClass: "text-slate-400", text: "Compiling routes and components…" },
  { mark: "✓", markClass: "text-emerald-300", textClass: "text-slate-300", text: "Compiled successfully in 4.2s" },
  { mark: "✓", markClass: "text-emerald-300", textClass: "text-slate-300", text: "Type check passed, 0 errors" },
  { mark: "✓", markClass: "text-emerald-300", textClass: "text-slate-300", text: "24 static pages generated" },
  { mark: "$", markClass: "text-[#e879f9]", textClass: "text-slate-100", text: "deploy --prod" },
  { mark: "›", markClass: "text-slate-500", textClass: "text-slate-400", text: "Uploading 18 files…" },
  { mark: "✓", markClass: "text-emerald-300", textClass: "text-slate-300", text: "Deployed to production" },
  { mark: "●", markClass: "text-cyan-300", textClass: "text-cyan-300", text: "https://app.example.dev" },
]

export function TechStackBento() {
  const lines = useAnimatedNumber(LOG.length)
  return (
    <section className="bg-[#07080d] px-4 py-16 text-white">
      <GlowMotionStyles />
      <div className="mx-auto max-w-[1120px]">
        <h2 className="font-display text-3xl font-semibold">Built on tools we trust, watched in real time</h2>
        <p className="mt-3 text-slate-400">Live numbers from production, the pipeline that ships it and the stack underneath.</p>
        <p className="mt-2 text-xs text-slate-500">{Math.round(lines)} líneas en el registro de ejemplo.</p>
        <div className="mt-8">
          <GlowCard accent="fuchsia" className="min-h-[340px]">
            <CardTitle
              right={
                <span className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </span>
              }
            >
              deploy.sh
            </CardTitle>
            <TypingLog lines={LOG} label="Deploy log" />
          </GlowCard>
        </div>
      </div>
    </section>
  )
}

export default TechStackBento
