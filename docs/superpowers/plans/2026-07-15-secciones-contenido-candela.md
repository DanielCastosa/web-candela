# Secciones con contenido Candela Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir las tres pantallas cromáticas vacías en las secciones “¿Cómo nacimos?”, “Productos” y “¿Dónde nos encontramos?” siguiendo los mockups suministrados.

**Architecture:** Mantener la página estática y semántica existente. El contenido vive en `index.html`, la composición responsive y los tokens en `src/styles.css`, el scroll-spy conserva su interfaz actual y Playwright valida estructura, assets y comportamiento en desktop y móvil.

**Tech Stack:** HTML5, TypeScript, CSS, Vite, Vitest, Playwright, Phosphor Icons Web 2.1.2, ImageGen, GitHub CLI y Vercel CLI.

## Global Constraints

- Títulos en Molle; cuerpo en la sans serif del subtítulo de cabecera.
- Mantener fondos y acentos exactos: verde `#E8FFDB/#52B68D`, morado `#ECCFFF/#784EA6`, amarillo `#FFF6BE/#FBCB18`.
- Texto exacto sección 1: “Con el sueño de una niña de 10 años construimos nuestros almacenes y la gran familia.”
- Dirección exacta: “Nos encontramos en Hollywood, c/ Hollywood Boulevard, 24”.
- Seis imágenes de producto, dos imágenes flotantes de maniquíes y una ilustración de calle real.
- Sin overflow horizontal, contenido tapado por el menú ni regresiones del scroll-spy.

---

### Task 1: Assets e iconografía

**Files:**
- Create: `public/products/top-rosa.jpg`
- Create: `public/products/vestido-verde.jpg`
- Create: `public/products/vestido-amarillo.jpg`
- Create: `public/products/top-azul.jpg`
- Create: `public/products/top-crema.jpg`
- Create: `public/products/vestido-lila.jpg`
- Create: `public/maniqui2.png`
- Create: `public/hollywood-street.png`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: seis rutas `/products/*.jpg`, `/maniqui2.png`, `/hollywood-street.png` y clase de icono `ph-fill ph-heart`.

- [ ] Copiar las seis fotos suministradas a `public/products/` en orden rosa, verde, amarillo, azul, crema y lila.
- [ ] Instalar `@phosphor-icons/web@2.1.2`.
- [ ] Generar un maniquí compañero coherente con `maniqui1.png`, eliminar su fondo cromático y validar alpha.
- [ ] Generar la calle cute de Hollywood sobre fondo exacto `#FFF6BE` con línea `#FBCB18` y sin texto.
- [ ] Inspeccionar ambos assets generados con `view_image` antes de consumirlos.

### Task 2: Pruebas de contenido y composición

**Files:**
- Modify: `tests/navigation.spec.ts`

**Interfaces:**
- Consumes: roles y copy definidos por el usuario.
- Produces: pruebas de regresión para `.story`, `.products`, `.location`, `.product-card`, `.products__mannequin` y `.location__illustration`.

- [ ] Añadir una prueba para el título y párrafo exactos de sección 1.
- [ ] Añadir una prueba que exija seis imágenes de producto y dos maniquíes en sección 2.
- [ ] Añadir una prueba para dirección e ilustración de sección 3.
- [ ] Añadir comprobaciones móviles de anchura y visibilidad del menú.
- [ ] Ejecutar `npm run test:e2e` y confirmar que falla porque las secciones todavía están vacías.

### Task 3: HTML semántico de las tres secciones

**Files:**
- Modify: `index.html`
- Modify: `src/main.ts`

**Interfaces:**
- Consumes: rutas de Task 1 y selectores de Task 2.
- Produces: headings `story-title`, `products-title`, `location-title`; seis figuras de producto; dos maniquíes; ilustración y dirección.

- [ ] Importar el CSS fill de Phosphor en `src/main.ts`.
- [ ] Sustituir las tres secciones vacías por contenido semántico con los textos exactos.
- [ ] Usar `loading="lazy"` y dimensiones declaradas en imágenes bajo el primer viewport.
- [ ] Mantener IDs `section-1`, `section-2`, `section-3` para no romper navegación.

### Task 4: Estilos responsive

**Files:**
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: clases creadas en Task 3.
- Produces: composición editorial, galería 3×2/2×3, maniquíes laterales y calle integrada.

- [ ] Añadir estilos compartidos de heading, icono de corazón y contenedor.
- [ ] Diseñar sección 1 con copy ancho, ritmo editorial y aire inferior inspirado en el mockup.
- [ ] Diseñar sección 2 con galería central, tarjetas de fondo claro y maniquíes absolutos fuera del eje de lectura.
- [ ] Diseñar sección 3 con copy superior e ilustración de calle inferior.
- [ ] Añadir breakpoints para 900 px y 600 px, incluyendo espacio inferior para el menú fijo.
- [ ] Ejecutar `npm run test:e2e` y corregir hasta que desktop y móvil pasen.

### Task 5: QA, publicación y producción

**Files:**
- Modify: `README.md`
- Modify: `design-qa.md`

**Interfaces:**
- Consumes: aplicación completa.
- Produces: evidencia visual, commit publicado y despliegue verificado.

- [ ] Ejecutar `npm test`, `npm run test:e2e`, `npm run build` y `git diff --check`.
- [ ] Capturar secciones 1, 2 y 3 en Browser a 1440×900 y 390×844; comprobar consola y navegación.
- [ ] Comparar mockups y renders en una composición conjunta y actualizar `design-qa.md` hasta `final result: passed`.
- [ ] Actualizar README con el contenido de las tres secciones.
- [ ] Crear commit, hacer push a `origin/main` y ejecutar `vercel --prod --yes`.
- [ ] Inspeccionar el deployment y verificar HTTP 200 para HTML, CSS, JS y todos los assets en `https://estudio-candela.vercel.app`.
