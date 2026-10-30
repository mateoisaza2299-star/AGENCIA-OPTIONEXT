export function appHref(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "")
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export function currentPath() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "")
  let path = window.location.pathname
  if (base && path.startsWith(base)) path = path.slice(base.length) || "/"
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1)
  return path || "/"
}
