# OPTIONEXT

Landing de una sola página para OPTIONEXT, equipo de soluciones digitales de la Sabana de Occidente, Cundinamarca.

La página es estática: abre `index.html` en el navegador. No hay servidor detrás del sitio.

- `index.html` — inicio. El bloque de planes es un adelanto; los montos salen de `js/precios.js`
- `precios.html` — página de precios (diagnóstico, paquetes, web, automatizaciones, mantenimiento, adicionales, licencias, condiciones y FAQ)
- `precios.css` — estilos de esa página
- `login.html` / `registro.html` — acceso con Supabase
- `cliente.html` / `admin.html` — paneles según el rol guardado en `profiles`
- `styles.css` — estilos del sitio
- `auth.css` — estilos de acceso y paneles
- `js/precios.js` — única lista de precios públicos y de alcances
- `js/home-teaser.js` — pinta el adelanto del inicio con esa lista
- `js/config.js` — WhatsApp, teléfono y correo
- `js/supabase.js` — cliente de Supabase
- `script.js` — formulario, menú y contacto
- `assets/optionext-logo.png` — logo

Los precios públicos se editan solo en `js/precios.js`. El WhatsApp, el teléfono y el correo se editan solo en `js/config.js`.
