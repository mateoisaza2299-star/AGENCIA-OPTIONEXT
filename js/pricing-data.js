/* ============================================================================
   ÚNICA FUENTE DE PRECIOS — OPTIONEXT
   Montos en pesos colombianos, enteros, sin puntos y sin signo $.
   No copies cifras al HTML. Inicio y precios.html leen este módulo.

   El anual de Arranque, Crecimiento y Ecosistema NO es mensual × 12.
   Se pagan 10 meses y se reciben 12. Esas cifras anuales están escritas aquí.

   Servicios web sueltos: solo hay mensual. annualPrice null = no hay anual
   oficial. La página debe decir "consulta el anual" y no calcularlo.

   Pagos únicos: sin descuento anual. monthlyOption null = no hay
   mantenimiento publicado. No inventar esa cuota.

   Licencias perpetuas: no hay tarifas en este archivo. No agregar ejemplos.
   ========================================================================= */

export const ANNUAL_NOTE = "Anual = 10 meses pagas, 12 meses recibes (2 gratis).";

export const ANNUAL_UNKNOWN = "consulta el anual";

export const diagnostico = {
  name: "Diagnóstico inicial",
  price: 0,
  gratis: true,
};

export const nivelesPrincipales = [
  {
    id: "arranque",
    name: "Arranque",
    popular: false,
    tagline: "Presencia digital y una automatización sencilla para empezar a organizar tu negocio.",
    monthlyPrice: 150000,
    annualPrice: 1500000,
    setupPrice: 0,
    target: "Barberías pequeñas, cafeterías, tiendas de barrio y servicios a domicilio.",
    limits: "Una página y una automatización básica.",
    monthlyIncludes: [
      "Landing, formulario y código QR",
      "Una automatización básica con n8n",
      "Aviso al negocio y al cliente",
      "Capacitación, manual y garantía de 15 días",
    ],
    features: [
      "Landing de una página",
      "Formulario a Google Sheets",
      "Una automatización básica con n8n",
      "Aviso al negocio y al cliente",
      "Código QR",
      "Capacitación y manual",
      "Garantía de 15 días",
    ],
    notIncluded: [
      "Panel de administración",
      "Reservas por WhatsApp",
      "Recordatorios automáticos",
      "Fidelidad digital",
      "Pagos en línea",
      "Inventario",
      "Dashboard",
      "Más de una sede",
      "CRM propio",
      "Administración de Meta Ads",
    ],
  },
  {
    id: "crecimiento",
    name: "Crecimiento",
    popular: true,
    tagline: "Administra citas, clientes y fidelidad sin depender del papel ni de hojas de cálculo dispersas.",
    monthlyPrice: 300000,
    annualPrice: 3000000,
    setupPrice: 200000,
    target: "Barberías con varios profesionales, salones, restaurantes y consultorios.",
    limits: "Todo Arranque, más una automatización y un sitio de hasta seis secciones.",
    monthlyIncludes: [
      "Todo lo de Arranque",
      "Citas, clientes y recordatorios",
      "Reservas por WhatsApp y por la web",
      "Fidelidad digital y Google Calendar",
      "Capacitación y ajustes iniciales",
    ],
    features: [
      "Todo lo de Arranque",
      "Sitio de hasta seis secciones",
      "Panel de administración",
      "Citas y clientes",
      "Reservas por WhatsApp y por la web",
      "Recordatorios automáticos",
      "Google Calendar",
      "Fidelidad digital",
      "Una automatización adicional",
      "Capacitación y ajustes iniciales",
    ],
    notIncluded: [
      "Pagos con Wompi",
      "Inventario",
      "Dashboard de métricas",
      "Más de una sede",
      "CRM propio",
      "Administración de Meta Ads",
    ],
  },
  {
    id: "ecosistema",
    name: "Ecosistema",
    popular: false,
    tagline: "Conecta citas, pagos, inventario y métricas para gestionar tu operación desde un mismo ecosistema.",
    monthlyPrice: 550000,
    annualPrice: 5500000,
    setupPrice: 400000,
    target: "Varias sedes, equipos más grandes y operaciones más complejas.",
    limits: "Hasta dos sedes y automatizaciones extra.",
    monthlyIncludes: [
      "Todo lo de Crecimiento",
      "Pagos con Wompi e inventario básico",
      "Dashboard de métricas",
      "Hasta dos sedes y copias diarias",
      "Soporte prioritario y capacitación extendida",
    ],
    features: [
      "Todo lo de Crecimiento",
      "Pagos con Wompi",
      "Inventario básico",
      "Dashboard de métricas",
      "Hasta dos sedes",
      "Automatizaciones extra",
      "Copias de seguridad diarias",
      "Soporte prioritario y capacitación extendida",
    ],
    notIncluded: [
      "Más de dos sedes",
      "CRM propio",
      "Administración de Meta Ads",
    ],
  },
];

export const webIndividual = [
  {
    id: "landing-simple",
    name: "Landing Page Simple",
    category: "web",
    tagline: "Una página, en mensualidad.",
    monthlyPrice: 80000,
    annualPrice: null,
    features: [],
    target: "Quien solo necesita presencia.",
  },
  {
    id: "web-panel",
    name: "Web + Panel Admin",
    category: "web",
    tagline: "Sitio con panel, en mensualidad.",
    monthlyPrice: 180000,
    annualPrice: null,
    features: [],
    target: "Quien administra contenido sin un plan completo.",
  },
  {
    id: "menu-qr",
    name: "Menú Digital + QR",
    category: "web",
    tagline: "Carta digital y QR, en mensualidad.",
    monthlyPrice: 120000,
    annualPrice: null,
    features: [],
    target: "Restaurantes y cafeterías que quieren la carta en el celular.",
  },
];

export const automatizacionesIndividuales = [
  {
    id: "bot-whatsapp",
    name: "Bot WhatsApp Agendamiento",
    category: "automatizacion",
    tagline: "Instalación única.",
    price: 1200000,
    monthlyOption: null,
    features: [],
    target: "Negocios que agendan por WhatsApp.",
  },
  {
    id: "automatizacion-basica",
    name: "Automatización Básica",
    category: "automatizacion",
    tagline: "Instalación única.",
    price: 400000,
    monthlyOption: null,
    features: [],
    target: "Un flujo sencillo, sin el plan completo.",
  },
];

export const datosYPagos = [
  {
    id: "baserow",
    name: "Configuración Baserow",
    category: "datos",
    tagline: "Instalación única.",
    price: 300000,
    monthlyOption: null,
    features: [],
    target: "Quien quiere ordenar datos en Baserow.",
  },
  {
    id: "wompi",
    name: "Integración Wompi",
    category: "datos",
    tagline: "Instalación única.",
    price: 450000,
    monthlyOption: null,
    features: [],
    target: "Quien cobra en línea con Wompi.",
  },
];

export const adicionales = [
  {
    id: "qr-micro",
    name: "QR Personalizado + Micro-Landing",
    tagline: "Se contrata solo si lo necesitas.",
    price: 80000,
    monthlyOption: null,
    features: [],
    target: "Un QR con una página corta, aparte del plan.",
  },
];

/* Sin tarifas publicadas. La página no debe inventar precios de ejemplo. */
export const licenciasPerpetuas = [];

export const comparacion = [
  { label: "Presencia web", values: ["Landing de una página", "Hasta 6 secciones", "Hasta 6 secciones"] },
  { label: "Panel admin", values: ["No", "Sí", "Sí"] },
  { label: "Reservas WhatsApp", values: ["No", "Sí", "Sí"] },
  { label: "Recordatorios", values: ["No", "Sí", "Sí"] },
  { label: "Fidelidad", values: ["No", "Sí", "Sí"] },
  { label: "Pagos online", values: ["No", "No", "Wompi"] },
  { label: "Inventario", values: ["No", "No", "Básico"] },
  { label: "Dashboard", values: ["No", "No", "Sí"] },
  { label: "Multi-sede", values: ["No", "No", "Hasta 2 sedes"] },
  { label: "Límites principales", values: ["1 automatización básica", "Arranque + 1 automatización", "2 sedes y automatizaciones extra"] },
];

export const faqUnificado = [
  {
    q: "¿Por qué estos precios son más bajos que los de una agencia?",
    a: "Porque somos un equipo joven, no porque el trabajo valga menos. El alcance de cada plan está escrito. No es un descuento escondido.",
  },
  {
    q: "¿Qué pasa si el equipo deja de prestar el servicio?",
    a: "En un plan mensual el acompañamiento depende de que sigamos operando. Si un servicio se detiene, te avisamos con tiempo. La licencia perpetua, cuando se acuerda, entrega código y documentación para desplegar en tu infraestructura. El alojamiento y los servicios de terceros siguen a tu cargo.",
  },
  {
    q: "¿Hay permanencia mínima? ¿Cómo cancelo?",
    a: "Los planes mensuales no tienen permanencia mínima ni penalidad. Avisas 15 días antes, por WhatsApp, y cancelas. El periodo ya pagado se usa hasta la fecha que cubre. Si elegiste el anual, ese pago corresponde a 12 meses de servicio.",
  },
  {
    q: "¿Estos precios incluyen IVA?",
    a: "Los precios publicados son las tarifas comerciales sin IVA. El 19% se suma en la factura. Esta página no es la factura: el desglose queda en la propuesta.",
  },
  {
    q: "¿Puedo cambiar de nivel?",
    a: "Sí. Puedes pasar de Arranque a Crecimiento o a Ecosistema. Lo acordamos por WhatsApp y aplica al siguiente periodo. Si el nivel nuevo tiene setup y todavía no lo pagaste, esa diferencia se cobra una vez.",
  },
  {
    q: "¿Qué cubre la mensualidad?",
    a: "Cubre lo listado en el plan: la presencia, las automatizaciones y el acompañamiento de esa tarjeta. No es un cheque en blanco para desarrollos, campañas o herramientas que no estén ahí.",
  },
  {
    q: "¿Hay alternativas sin mensualidad?",
    a: "Sí. Un desarrollo de pago único o una licencia perpetua, si quieres quedarte con el código. Ninguna de las dos vuelve gratis el hosting, los servicios de terceros ni el mantenimiento.",
  },
  {
    q: "¿Cómo funciona el plan anual?",
    a: "Con el pago anual, pagas 10 meses y recibes 12 meses de servicio. Aplica a Arranque, Crecimiento y Ecosistema. No aplica a servicios de un solo pago ni a licencias perpetuas.",
  },
  {
    q: "¿Ofrecen CRM o administración de Meta Ads?",
    a: "OPTIONEXT no ofrece un CRM propio ni administración de Meta Ads. Para CRM se puede mirar Kommo o HubSpot Free. La pauta, si hace falta, va con un aliado. No viene incluida.",
  },
];

export function formatPrice(amount) {
  const withDots = String(Math.round(Number(amount) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${withDots}`;
}

export function formatPriceShort(amount) {
  return formatPrice(amount);
}

export function formatCOP(amount) {
  return formatPrice(amount);
}
