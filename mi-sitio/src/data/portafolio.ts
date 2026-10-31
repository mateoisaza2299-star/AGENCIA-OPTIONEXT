export type Portadas = {
  escritorio: string
  movil: string
}

export type SitioPortafolio = {
  slug: string
  nombre: string
  tipo: string
  url: string | null
  portadas: Portadas | null
}

export const MEDIDA_ESCRITORIO = { ancho: 1280, alto: 800 }
export const MEDIDA_MOVIL = { ancho: 390, alto: 844 }

export const portafolio: SitioPortafolio[] = [
  {
    slug: "la-mansion",
    nombre: "La Mansión Barber Shop",
    tipo: "Barbería en Mosquera",
    url: "https://mateoisaza2299-star.github.io/La-mansion-barbers/",
    portadas: {
      escritorio: "la-mansion-desktop.webp",
      movil: "la-mansion-mobile.webp",
    },
  },
  {
    slug: "miami-cuts",
    nombre: "Miami Cuts",
    tipo: "Barbería en Fusagasugá",
    url: "https://mateoisaza2299-star.github.io/landing-barberia/",
    portadas: {
      escritorio: "miami-cuts-desktop.webp",
      movil: "miami-cuts-mobile.webp",
    },
  },
  {
    slug: "droguerias-reina",
    nombre: "Droguerías Reina",
    tipo: "Droguería en Funza",
    url: "https://mateoisaza2299-star.github.io/Farmacias-Reina/",
    portadas: {
      escritorio: "droguerias-reina-desktop.webp",
      movil: "droguerias-reina-mobile.webp",
    },
  },
  {
    slug: "casa-lumbre",
    nombre: "Casa Lumbre",
    tipo: "Restaurante en Medellín",
    url: "https://mateoisaza2299-star.github.io/Restaurante-beta/",
    portadas: {
      escritorio: "casa-lumbre-desktop.webp",
      movil: "casa-lumbre-mobile.webp",
    },
  },
]
