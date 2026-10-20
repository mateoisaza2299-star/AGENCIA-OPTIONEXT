# OPTIONEXT

Landing de una sola página para OPTIONEXT, equipo de soluciones digitales de la Sabana de Occidente, Cundinamarca.

La página es estática: abre `index.html` en el navegador. No hay servidor detrás del sitio.

- `index.html` — inicio. El bloque de planes es un adelanto; los montos salen de `js/pricing-data.js`
- `precios.html` — página de precios (diagnóstico, niveles, servicios sueltos, adicionales, licencias y FAQ)
- `precios.css` — estilos de esa página
- `login.html` / `registro.html` — acceso con Supabase
- `cliente.html` / `admin.html` — paneles según el rol guardado en `profiles`
- `styles.css` — estilos del sitio
- `auth.css` — estilos de acceso y paneles
- `js/pricing-data.js` — única lista de precios públicos
- `js/precios.js` / `js/home-teaser.js` — pintan esas tarifas
- `js/config.js` — WhatsApp, teléfono y correo
- `js/supabase.js` — cliente de Supabase
- `script.js` — formulario, menú y contacto
- `assets/optionext-logo.png` — logo

Los precios públicos se editan solo en `js/pricing-data.js`. El WhatsApp, el teléfono y el correo se editan solo en `js/config.js`.
