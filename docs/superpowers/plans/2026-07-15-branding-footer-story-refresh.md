# Candela Branding, Story and Footer Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the approved Modas hero lockup, illustrated header logo, descriptive menu labels, favicon, story mascot and copyright footer while preserving the existing responsive navigation and section design.

**Architecture:** Continue using the current semantic single-page HTML and shared CSS design tokens. Add three static raster assets, one hero wordmark wrapper, one positioned header logo, one story body grid and one semantic footer; no new runtime state is needed.

**Tech Stack:** HTML5, CSS, TypeScript, Vite, Vitest, Playwright, Phosphor Icons, Vercel.

## Global Constraints

- Hero visible copy is limited to `Modas` and `Candela`; remove `Moda con alma, estilo con luz.`.
- Favicon source is the supplied 150×150 transparent PNG.
- Story copy and title remain unchanged.
- Footer copy is exactly `© 2026 Modas Candela`.
- Preserve the existing palettes, section order and scrollspy behavior; rename the menu links to `Historia`, `Productos` and `Ubicación`.
- Mobile verification viewport is 390×844 with no horizontal overflow.

---

### Task 1: Lock behavior with failing browser tests

**Files:**
- Modify: `tests/navigation.spec.ts`

**Interfaces:**
- Consumes: existing DOM selectors and Playwright configuration.
- Produces: assertions for `.hero__brand-prefix`, `.hero__logo`, descriptive menu labels, `link[rel="icon"]`, `.story__mascot` and `.site-footer`.

- [ ] Add assertions that the hero contains visible `Modas`, no old subtitle, and the existing `Candela` h1.
- [ ] Require the supplied logo and verify its mobile bounds.
- [ ] Require menu labels `Historia`, `Productos` and `Ubicación` without changing their destinations.
- [ ] Add a favicon test that expects `/favicon.png` and `image/png`.
- [ ] Extend the story test to require `Personaje vegetal de Modas Candela`.
- [ ] Add a footer test for the exact copyright and dark background.
- [ ] Extend the mobile bounds test so the wordmark and mascot end at or before x=390.
- [ ] Run `npm run test:e2e -- tests/navigation.spec.ts` and confirm failures are caused by the missing new elements.

### Task 2: Add supplied assets and semantic markup

**Files:**
- Create: `public/favicon.png`
- Create: `public/candela-leaf-mascot.png`
- Create: `public/candela-logo.png`
- Modify: `index.html`

**Interfaces:**
- Consumes: the supplied PNG files.
- Produces: `/favicon.png`, `/candela-leaf-mascot.png`, `/candela-logo.png`, `.hero__wordmark`, `.hero__logo`, `.story__body`, `.story__mascot`, `.site-footer`.

- [ ] Copy the supplied favicon and mascot without altering their pixels or alpha channels.
- [ ] Copy the supplied 1536×1024 transparent logo and add it to the upper-left of the hero with meaningful alt text.
- [ ] Rename the navigation links to `Historia`, `Productos` and `Ubicación`.
- [ ] Add `<link rel="icon" type="image/png" sizes="150x150" href="/favicon.png" />`.
- [ ] Replace `.hero__subtitle` with a `.hero__wordmark` containing `<p class="hero__brand-prefix">Modas</p>` and the existing h1.
- [ ] Wrap story copy and mascot in `.story__body`; use the exact alt text and declared 700×700 dimensions.
- [ ] Add `<footer class="site-footer"><p>© 2026 Modas Candela</p></footer>` after `main`.

### Task 3: Implement responsive presentation

**Files:**
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: existing color tokens and breakpoints.
- Produces: responsive wordmark, story grid, mascot treatment and footer spacing.

- [ ] Replace obsolete subtitle rules with `.hero__wordmark` and `.hero__brand-prefix` rules using Molle and the pink accent.
- [ ] Keep the wordmark at the lower-left and tune desktop spacing so `Modas` sits immediately above `Candela`.
- [ ] Position and scale `.hero__logo` responsively without overlap or horizontal overflow.
- [ ] Add `.story__body` as a two-column grid and move the existing story margin/scale onto the new layout.
- [ ] Size `.story__mascot` with `object-fit: contain`, no frame and a restrained drop shadow.
- [ ] Add the dark `.site-footer` with bottom clearance for the fixed menu.
- [ ] At `max-width: 600px`, scale the prefix, stack the story body, constrain the mascot and preserve 390 px bounds.
- [ ] Run the targeted E2E tests and confirm green.

### Task 4: Full verification and design QA

**Files:**
- Modify: `design-qa.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: local browser renders and supplied source images.
- Produces: final evidence paths and a passing QA ledger.

- [ ] Run `npm test`, `npm run test:e2e`, `npm run build` and `git diff --check`.
- [ ] Start Vite on `127.0.0.1:4173` and inspect the hero, story and footer in the in-app Browser.
- [ ] Capture desktop 1440×900 and mobile 390×844 screenshots.
- [ ] Create side-by-side hero and story comparison images using the supplied references and latest renders.
- [ ] Inspect both comparisons with `view_image`; fix every P0/P1/P2 and repeat capture if needed.
- [ ] Update `design-qa.md` with typography, layout, colors, assets, copy, responsive evidence and `final result: passed`.
- [ ] Update README feature wording.

### Task 5: Publish and verify production

**Files:**
- Commit only the files listed above, the three supplied assets and the two plan/spec documents.

**Interfaces:**
- Consumes: verified main-branch changes and the linked Vercel project.
- Produces: a GitHub commit and production deployment on `estudio-candela.vercel.app`.

- [ ] Inspect `git status -sb` and stage only in-scope files; preserve the user’s untracked original dress folder.
- [ ] Commit with `feat: refine Candela branding and story`.
- [ ] Push `main` to `origin` as explicitly requested.
- [ ] Run `vercel --prod --yes` and point `estudio-candela.vercel.app` to the resulting deployment.
- [ ] Verify deployment status is Ready, assets return HTTP 200, footer copy is present and the browser-rendered production page has no overflow.
