# Candela Branding, Story and Footer Refresh Design

## Goal

Refine the existing Candela landing page with the approved “Modas Candela” hero lockup, the supplied favicon and mascot, and a restrained dark copyright footer without changing the existing navigation or section system.

## Accepted visual sources

- Hero composition: `/Users/danielcastosa/Desktop/Screenshot 2026-07-15 at 22.40.16.png`.
- Favicon: `/Users/danielcastosa/Desktop/fav-icon (candela).png`.
- Story mascot: `/Users/danielcastosa/Downloads/de9018f5b59f5591f0076a142352d0bc.png`.
- Decorative header logo: `/Users/danielcastosa/Downloads/4956e27b-1640-4004-953f-8a738f0aeb7e.png`.
- Existing site palette, typography, assets and responsive patterns remain the implementation baseline.

## Design decisions

### Hero

Remove “Moda con alma, estilo con luz.” completely. Place “Modas” immediately above “Candela” inside one lower-left wordmark group. Both words use Molle and the existing pink accent so the new line reads as part of the same identity. The supplied mannequin and menu retain their current roles and the hero still has no active navigation item.

Place the supplied transparent illustrated logo in the upper-left corner as a separate brand signature. It must remain fully visible and proportionally scaled at desktop and mobile sizes without colliding with the mannequin or lower wordmark.

### Navigation labels

Replace the numbered labels with one-word descriptions while preserving targets and scrollspy behavior: `Historia`, `Productos` and `Ubicación`.

### Favicon

Copy the supplied 150×150 transparent PNG into `public/favicon.png` and reference it with an explicit PNG favicon link. The existing pink theme color remains unchanged.

### Story section

Keep the current title, heart and exact body copy. Below the title, use a two-column body: editorial copy on the left and the supplied transparent leaf character on the right. The image remains unframed so it blends directly into the green surface. On small screens the body becomes one column, with the character placed after the copy and aligned toward the right while remaining fully inside the viewport.

### Footer

Add a full-width dark footer after section 3. Use the existing ink token as the background and a warm light foreground. The only visible copy is `© 2026 Modas Candela`. Add enough bottom padding for the fixed navigation to float above it without obscuring the copyright.

## Responsive and accessibility constraints

- No horizontal overflow at 390×844.
- “Modas” and “Candela” remain fully visible on mobile.
- The upper-left logo remains inside the viewport on mobile.
- Mascot alt text: `Personaje vegetal de Modas Candela`.
- Footer is a semantic `footer` with visible copyright text.
- Existing focus styles, reduced-motion behavior and scrollspy remain unchanged.

## Verification

- Automated tests cover copy replacement, favicon, mascot, footer, navigation regression and mobile bounds.
- Browser QA uses 1440×900 and 390×844.
- Hero render is compared side by side with the supplied annotated hero reference.
- Story render is compared with the existing section reference and the supplied mascot source.
- The final `design-qa.md` must end with `final result: passed`.
