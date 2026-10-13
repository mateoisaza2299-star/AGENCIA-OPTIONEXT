# OPTIONEXT

Landing de una sola página para OPTIONEXT, equipo de soluciones digitales de la Sabana de Occidente, Cundinamarca.

La página es estática: abre `index.html` en el navegador. No hay servidor detrás del sitio.

- `index.html` — estructura de la página
- `facturacion.html` — panel de facturación de ejemplo (sin servidor)
- `login.html` / `registro.html` — acceso con Supabase
- `cliente.html` / `admin.html` — paneles según el rol guardado en `profiles`
- `styles.css` — estilos del sitio
- `auth.css` — estilos de acceso y paneles
- `billing.css` / `billing.js` — panel de facturación
- `js/supabase.js` — cliente de Supabase
- `script.js` — precios, formulario y WhatsApp
- `assets/optionext-logo.png` — logo

Los montos, las características de cada plan y el número de WhatsApp se editan en el bloque de configuración al inicio de `script.js`.
