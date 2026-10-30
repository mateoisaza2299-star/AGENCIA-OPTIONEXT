import { Component, type ReactNode } from "react"
import { appHref } from "@/lib/path"

type Props = { children: ReactNode }
type State = { failed: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.error(error)
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <main className="band band-color grid min-h-screen place-items-center px-4">
        <div className="relative z-10 max-w-md text-center">
          <h1 className="font-display text-3xl font-bold text-white">No pudimos mostrar esta página</h1>
          <p className="mt-3 text-[#f4f2fb]">Ocurrió un error al cargar la vista. Puedes volver al inicio y seguir desde ahí.</p>
          <button
            className="btn-primary mt-6"
            type="button"
            onClick={() => {
              window.location.assign(appHref("/"))
            }}
          >
            Volver al inicio
          </button>
        </div>
      </main>
    )
  }
}
