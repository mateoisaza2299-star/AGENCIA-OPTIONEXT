import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
function cacheBustAssets() {
  return {
    name: "cache-bust-assets",
    transformIndexHtml: {
      order: "post" as const,
      handler(html: string, ctx: { server?: unknown }) {
        if (ctx.server) return html
        return html.replace(
          /(src|href)=(")([^"]+\.(?:js|css))(")/g,
          (_match, attr: string, open: string, url: string, close: string) => {
            const joiner = url.includes("?") ? "&" : "?"
            return `${attr}=${open}${url}${joiner}v=2${close}`
          },
        )
      },
    },
  }
}

export default defineConfig({
  base: '/AGENCIA-OPTIONEXT/',
  plugins: [react(), tailwindcss(), cacheBustAssets()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
