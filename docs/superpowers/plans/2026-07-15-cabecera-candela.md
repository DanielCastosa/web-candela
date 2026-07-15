# Cabecera Candela Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Añadir una cabecera editorial responsive y actualizar las tres secciones y el menú flotante con la nueva paleta y el nuevo estado sin selección.

**Architecture:** El HTML mantiene una sola página semántica con cuatro superficies consecutivas. `scroll-spy.ts` concentra la selección pura de superficie y `main.ts` traduce esa salida a `aria-current`, hash y variables CSS; los estilos y tokens permanecen en `styles.css`.

**Tech Stack:** HTML5, TypeScript, CSS, Vite, Vitest, Playwright, Vercel CLI.

## Global Constraints

- Título Molle desde Google Fonts y subtítulo en sans serif compatible.
- Paletas exactas: rosa `#FFE4ED/#F86494`, verde `#E8FFDB/#52B68D`, morado `#ECCFFF/#784EA6`, amarillo `#FFF6BE/#FBCB18`.
- Cabecera fuera del menú: ningún enlace con `aria-current` cuando la cabecera está activa.
- Mantener tres elementos exactos: `sección 1`, `sección 2`, `sección 3`.
- Mantener responsive, accesibilidad, scroll suave y soporte de movimiento reducido.

---

### Task 1: Modelo de superficie activa

**Files:**
- Modify: `src/scroll-spy.test.ts`
- Modify: `src/scroll-spy.ts`

**Interfaces:**
- Produces: `SurfaceId`, `ActiveSection`, `pickActiveSection(visibility, currentSection): ActiveSection`.

- [ ] **Step 1: Escribir la prueba fallida** que demuestra que la cabecera visible devuelve `null` y que las secciones siguen resolviéndose por mayor intersección.
- [ ] **Step 2: Ejecutar `npm test`** y comprobar que falla porque el modelo todavía no conoce `hero` ni `null`.
- [ ] **Step 3: Implementar el modelo mínimo** añadiendo `hero` al orden de superficies y mapeándolo a `null`.
- [ ] **Step 4: Ejecutar `npm test`** y comprobar que todas las pruebas pasan.

### Task 2: Cabecera, paleta y estados del menú

**Files:**
- Create: `public/maniqui1.png`
- Modify: `index.html`
- Modify: `src/main.ts`
- Modify: `src/styles.css`
- Modify: `tests/navigation.spec.ts`

**Interfaces:**
- Consumes: `ActiveSection` y `surfaceIds` de Task 1.
- Produces: cabecera `#hero`, secciones cromáticas, menú temático y comportamiento por scroll/clic.

- [ ] **Step 1: Escribir pruebas E2E fallidas** para el estado inicial sin selección, colores exactos, imagen/título y selección al entrar en cada sección.
- [ ] **Step 2: Ejecutar `npm run test:e2e`** y comprobar que falla contra la interfaz anterior.
- [ ] **Step 3: Copiar el asset suministrado** a `public/maniqui1.png`.
- [ ] **Step 4: Implementar HTML y CSS** con hero responsive, Molle, las cuatro parejas cromáticas y menú flotante.
- [ ] **Step 5: Adaptar `main.ts`** para limpiar `aria-current` en hero y aplicar las variables de tema al cambiar de superficie.
- [ ] **Step 6: Ejecutar `npm run test:e2e`** y comprobar que desktop y móvil pasan.

### Task 3: Verificación, documentación y publicación

**Files:**
- Modify: `README.md`
- Create: `design-qa.md`

**Interfaces:**
- Consumes: aplicación completa de Tasks 1 y 2.
- Produces: evidencia de QA, commit publicado y despliegue de producción verificado.

- [ ] **Step 1: Ejecutar `npm test`, `npm run test:e2e`, `npm run build` y `git diff --check`** con salida limpia.
- [ ] **Step 2: Verificar visualmente** 1440×900 y 390×844, comparar con `Cabacera.png` y registrar al menos cinco puntos en `design-qa.md` hasta `final result: passed`.
- [ ] **Step 3: Actualizar README** con la nueva cabecera, paleta y URL de producción.
- [ ] **Step 4: Crear un commit intencional y hacer push** a `origin/main`.
- [ ] **Step 5: Ejecutar `vercel --prod --yes`**, inspeccionar el despliegue y comprobar que `https://estudio-candela.vercel.app` sirve HTML, CSS, JavaScript e imagen con estado HTTP 200.
