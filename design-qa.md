# Design QA — Web Candela

- Fuentes visuales: `Cabacera.png`, `seccion1.png`, `sección2.jpeg` y `seccion3.jpeg`.
- Comparativas normalizadas: `/tmp/web-candela-story-comparison.png`, `/tmp/web-candela-products-comparison.png` y `/tmp/web-candela-location-comparison.png`.
- Capturas desktop: `/tmp/web-candela-story-desktop.png`, `/tmp/web-candela-products-desktop.png` y `/tmp/web-candela-location-desktop.png`.
- Capturas móvil: `/tmp/web-candela-story-mobile.png`, `/tmp/web-candela-products-mobile.png` y `/tmp/web-candela-location-mobile.png`.
- Viewports: 1440×900 y 390×844.
- Navegador: Codex in-app Browser.

## Fidelidad visual

Los bocetos son guías de composición, no diseños de precisión de píxel. Las comparativas lado a lado confirman las relaciones principales: corazón antes de cada título, tipografía Molle de gran formato, texto editorial amplio en la historia, retícula 3×2 flanqueada por dos maniquíes y calle ilustrada bajo la dirección.

1. **Tipografía:** Molle se aplica a todos los títulos. El cuerpo mantiene la misma familia sans compatible usada en el subtítulo de la cabecera.
2. **Paleta:** se conservan exactamente las parejas rosa `#FFE4ED/#F86494`, verde `#E8FFDB/#52B68D`, morado `#ECCFFF/#784EA6` y amarillo `#FFF6BE/#FBCB18`.
3. **Iconografía:** los corazones usan el glifo oficial relleno de Phosphor Icons; se sirve únicamente el recurso WOFF2 necesario.
4. **Productos:** se muestran las seis imágenes suministradas en tonos alternos, con `object-fit: contain`, fondos suaves y dos maniquíes laterales.
5. **Ilustración:** la escena de Hollywood Boulevard es un asset raster generado específicamente en la paleta amarilla; no se sustituyó por arte dibujado con código.
6. **Responsive:** la galería cambia de tres a dos columnas, los maniquíes se integran sobre la retícula y no existe desbordamiento horizontal a 390 px.

## Interacción y semántica

- En la cabecera no hay elemento activo.
- Al pulsar “sección 2”, el hash pasa a `#section-2`, el scroll alcanza 1688 px, el menú cambia a `rgb(236, 207, 255)` y el enlace obtiene `aria-current="page"`.
- El snapshot semántico contiene un `h1`, tres regiones con `h2`, las seis imágenes de producto, ambos maniquíes, la ilustración de ubicación y la navegación etiquetada.
- Las pruebas cubren activación por clic, actualización por scroll, paleta, contenido, número de assets, columnas responsive y límites del viewport.

## Historial de correcciones

- P2 móvil: el final de “¿Dónde nos encontramos?” quedaba demasiado cerca del borde derecho. Se ajustó su escala específica a `clamp(42px, 12.5vw, 52px)` y se añadió una regresión que exige que su bounding box termine dentro de los 390 px.
- Resultado posterior: título completo, ancho del documento igual a 390 px y 18/18 pruebas de navegador aprobadas.

No quedan discrepancias P0, P1 o P2 accionables. La línea decorativa del boceto de la historia se interpreta como anotación de composición; el requisito explícito de esa sección era el corazón, el título y el texto.

final result: passed
