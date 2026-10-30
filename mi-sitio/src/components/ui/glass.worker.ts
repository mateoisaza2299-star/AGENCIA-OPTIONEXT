import { runGlass, type GlassHandle, type GlassLive } from "./glass-engine"

let handle: GlassHandle | null = null

self.addEventListener("message", (event: MessageEvent) => {
  const msg = event.data as {
    type: string
    canvas?: OffscreenCanvas
    live?: GlassLive
    reduceMotion?: boolean
    cssWidth?: number
    cssHeight?: number
    dpr?: number
    logo?: string
    visible?: boolean
  }

  if (msg.type === "init" && msg.canvas && msg.live && msg.logo) {
    handle = runGlass(msg.canvas, msg.live, {
      reduceMotion: Boolean(msg.reduceMotion),
      cssWidth: msg.cssWidth ?? 0,
      cssHeight: msg.cssHeight ?? 0,
      dpr: msg.dpr ?? 1,
      logo: msg.logo,
      onError: (error) => {
        self.postMessage({ type: "error", error })
      },
    })
    return
  }

  if (!handle) return
  if (msg.type === "update" && msg.live) handle.update(msg.live)
  else if (msg.type === "resize") handle.resize(msg.cssWidth ?? 0, msg.cssHeight ?? 0, msg.dpr ?? 1)
  else if (msg.type === "visible") handle.setVisible(Boolean(msg.visible))
  else if (msg.type === "logo" && msg.logo) handle.setLogo(msg.logo)
  else if (msg.type === "replay") handle.replay()
  else if (msg.type === "dispose") {
    handle.dispose()
    handle = null
  }
})
