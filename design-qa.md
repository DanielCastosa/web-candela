# Design QA — Modas Candela branding refresh

- Fuente visual de cabecera: `/Users/danielcastosa/Desktop/Screenshot 2026-07-15 at 22.40.16.png`.
- Fuente visual de historia: `/Users/danielcastosa/Desktop/seccion1.png`.
- Asset de personaje: `/Users/danielcastosa/Downloads/de9018f5b59f5591f0076a142352d0bc.png`.
- Asset de logotipo: `/Users/danielcastosa/Downloads/4956e27b-1640-4004-953f-8a738f0aeb7e.png`.
- Comparativa de logotipo y cabecera: `/tmp/web-candela-logo-comparison.png`.
- Comparativa de cabecera: `/tmp/web-candela-brand-hero-comparison.png`.
- Comparativa de historia: `/tmp/web-candela-brand-story-comparison.png`.
- Capturas finales desktop: `/tmp/web-candela-brand-hero-desktop-final.png`, `/tmp/web-candela-brand-story-desktop.png` y `/tmp/web-candela-brand-footer-desktop.png`.
- Capturas finales móvil: `/tmp/web-candela-brand-hero-mobile-final.png`, `/tmp/web-candela-brand-story-mobile.png` y `/tmp/web-candela-brand-footer-mobile.png`.
- Capturas de la ampliación final: `/tmp/web-candela-logo-menu-desktop.png` y `/tmp/web-candela-logo-menu-mobile.png`.
- Viewports: 1440×900 desktop y 390×844 móvil.
- Método: captura y comprobación de interacción con Codex in-app Browser; inspección conjunta de referencias y renders con `view_image`.

## Fidelity ledger

1. **Copy:** el texto superior anterior ha desaparecido por completo. El wordmark añade la palabra aprobada `Modas` sobre el `h1` `Candela`; el menú usa las etiquetas descriptivas `Historia`, `Productos` y `Ubicación` en el mismo orden y con los mismos destinos.
2. **Tipografía:** `Modas` y `Candela` usan Molle, peso 400 e itálica. La escala secundaria diferencia claramente el prefijo sin competir con el nombre principal.
3. **Composición:** en 1440×900 el bloque de marca ocupa la franja inferior izquierda, el maniquí permanece a la derecha y el menú conserva su posición. En 390×844 ambos textos terminan en x=340.23, dentro del viewport.
4. **Paleta:** la cabecera mantiene `#FFE4ED/#F86494`; la historia mantiene `#E8FFDB/#52B68D`; el footer usa el ink existente `#33252A` con texto rosa pálido.
5. **Asset de historia:** se usa directamente el PNG transparente 700×700 suministrado, sin marco ni sustituto dibujado con código. En desktop acompaña el texto a la derecha; en móvil se apila después del texto y ocupa x=126–366.
6. **Footer:** el copyright exacto `© 2026 Modas Candela` queda visible sobre el menú flotante en desktop y móvil. El footer usa semántica `contentinfo`.
7. **Responsive:** el documento mide exactamente 390 px en el viewport móvil; no hay recortes del wordmark, personaje, menú ni copyright.
8. **Favicon:** `/favicon.png` conserva 150×150 y transparencia; el HTML declara PNG y tamaño explícito.
9. **Logotipo superior:** se usa el PNG RGBA 1536×1024 suministrado, proporcional y sin fondo. En desktop ocupa x=57.59–388.79, y en móvil x=14–177.80 e y=18–127.20, sin solaparse con el maniquí.

## Interacción y runtime

- El snapshot semántico contiene `Modas`, el `h1`, tres regiones, el personaje, el footer y la navegación.
- Al pulsar el único enlace `Productos`, el hash pasa a `#section-2`, `aria-current` cambia a ese enlace y el menú usa `rgb(236, 207, 255)`.
- La consola del navegador no devolvió errores ni advertencias.
- Las pruebas cubren favicon, sustitución de copy, personaje, footer, scrollspy, assets, paleta y bounds móvil.

## Comparison history

- P2 inicial: en desktop, `Modas` tocaba el gran trazo ascendente de la C y parecía superpuesto en vez de estar “justo encima”.
- Fix: se aumentó el margen inferior responsive del prefijo a `clamp(24px, 2.5vh, 38px)` y a 14 px en móvil.
- Evidencia posterior: `/tmp/web-candela-brand-hero-desktop-final.png` muestra una separación clara; en móvil la separación computada es 14 px y no existe overflow.

No quedan discrepancias P0, P1 o P2 accionables. La referencia de cabecera incluye anotaciones rojas y un pequeño personaje de otra procedencia que no forman parte de los cuatro cambios solicitados; se consideran anotaciones y no contenido a recrear.

final result: passed
