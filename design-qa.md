# Design QA — Cabecera Candela

- Source visual truth: `/Users/danielcastosa/Desktop/Cabacera.png`
- Supplied hero asset: `/Users/danielcastosa/Desktop/maniqui1.png`
- Full-view comparison: `/tmp/web-candela-design-comparison.jpg`
- Desktop implementation screenshot: `/tmp/web-candela-header-desktop.png`
- Mobile implementation screenshot: `/tmp/web-candela-header-mobile-final.png`
- Interaction screenshot: `/tmp/web-candela-section-2-mobile.png`
- Viewports: 1440×900 desktop and 390×844 mobile
- States: hero with no active navigation item; section 2 with active navigation item
- Browser: Codex in-app Browser

## Full-view comparison evidence

The source is a hand-drawn composition guide rather than a pixel-precise viewport. The normalized side-by-side comparison preserves its essential hierarchy: oversized Candela wordmark across the lower hero, mannequin placed in the upper-right field, restrained supporting copy, and a full-frame editorial composition. The implementation adds the persistent menu requested for the product while keeping it visually subordinate.

## Required fidelity surfaces

1. **Fonts and typography:** Molle is loaded from Google Fonts and confirmed as the computed `h1` family. The title uses a large italic display scale; supporting copy and navigation use a compatible system sans serif.
2. **Spacing and layout:** Desktop uses a full 1440×900 hero, a 680×72 centered menu, and an 864 px-tall mannequin. Mobile uses 390×844 with no horizontal overflow, a fully visible mannequin, complete title, and a 358×64 menu inside 16 px side margins.
3. **Colors and tokens:** Hero `#FFE4ED/#F86494`, section 1 `#E8FFDB/#52B68D`, section 2 `#ECCFFF/#784EA6`, and section 3 `#FFF6BE/#FBCB18` match the supplied values exactly.
4. **Image quality and asset fidelity:** The original 804×1944 transparent PNG is used directly at native aspect ratio. It loads at its full natural dimensions with no placeholder or code-drawn substitute.
5. **Copy and content:** Above the fold contains only the approved title “Candela”, the appropriate subtitle “Moda con alma, estilo con luz.” and the three existing navigation labels. No promotional copy or CTA was invented.

Focused region comparison was performed on the hero title/mannequin overlap and the mobile right edge because those were the areas where crop fidelity depended on exact placement. No additional crop was needed for icons or controls because this interface contains neither.

## Interaction and runtime evidence

- Initial hero state: 0 elements with `aria-current="page"`; menu background is `rgb(255, 228, 237)`.
- Section 2 click: unique `#section-2` link activated, hash became `#section-2`, scroll reached 1688 px, menu background became `rgb(236, 207, 255)`, and active background became `rgb(120, 78, 166)`.
- Desktop and mobile console checks returned no errors or warnings.
- DOM snapshot contains the semantic `h1`, mannequin alt text, three labelled regions, and three navigation links.

## Comparison history

- Earlier P2: at 390×844, the mannequin extended 66 px beyond the right viewport edge and the final title glyph sat too close to the crop.
- Fix: reduced the mobile mannequin to 68dvh and aligned it to `right: 0`; reduced the responsive title scale to `clamp(88px, 23.5vw, 156px)`.
- Post-fix evidence: mannequin bounds end at x=390, document scroll width is 390, title is fully visible, the regression test passes, and `/tmp/web-candela-header-mobile-final.png` shows the corrected composition.

## Findings

No actionable P0, P1, or P2 mismatches remain.

Intentional interpretation: the sketch label “Modas” is represented by the requested appropriate subtitle rather than duplicated as a separate eyebrow. The supplied sketch is treated as a layout reference, so exact pencil geometry and its hand-drawn frame are not reproduced.

## Follow-up polish

No blocking or required polish remains for the current empty-section scope.

final result: passed
