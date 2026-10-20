# OPTIONEXT

Landing de una sola página para OPTIONEXT, equipo de soluciones digitales de la Sabana de Occidente, Cundinamarca.

La página es estática: abre `index.html` en el navegador. No hay servidor detrás del sitio.

- `index.html` — inicio. El bloque de planes es un adelanto; los montos salen de `js/pricing-data.js`
- `precios.html` — página de precios (diagnóstico, niveles, servicios sueltos, adicionales, licencias y FAQ)
- `precios.css` — estilos de esa página
- `facturacion.html` — panel de facturación de ejemplo (sin servidor)
- `login.html` / `registro.html` — acceso con Supabase
- `cliente.html` / `admin.html` — paneles según el rol guardado en `profiles`
- `styles.css` — estilos del sitio
- `auth.css` — estilos de acceso y paneles
- `billing.css` / `billing.js` — panel de facturación
- `js/pricing-data.js` — única lista de precios públicos
- `js/precios.js` / `js/home-teaser.js` — pintan esas tarifas
- `js/supabase.js` — cliente de Supabase
- `script.js` — formulario, menú y WhatsApp
- `assets/optionext-logo.png` — logo

Los precios públicos se editan solo en `js/pricing-data.js`. El número de WhatsApp y el correo siguen en el bloque de configuración al inicio de `script.js`. El panel de facturación guarda sus propios ejemplos y no lee esa lista.
