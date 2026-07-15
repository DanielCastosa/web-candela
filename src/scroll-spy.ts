export const sectionIds = ["section-1", "section-2", "section-3"] as const;
export const surfaceIds = ["hero", ...sectionIds] as const;

export type SectionId = (typeof sectionIds)[number];
export type SurfaceId = (typeof surfaceIds)[number];
export type ActiveSection = SectionId | null;

export function pickActiveSection(
  visibility: ReadonlyMap<string, number>,
  currentSection: ActiveSection,
): ActiveSection {
  let activeSurface: SurfaceId | null = null;
  let greatestRatio = 0;

  for (const surfaceId of surfaceIds) {
    const ratio = visibility.get(surfaceId) ?? 0;

    if (ratio > greatestRatio) {
      activeSurface = surfaceId;
      greatestRatio = ratio;
    }
  }

  if (activeSurface === null) {
    return currentSection;
  }

  return activeSurface === "hero" ? null : activeSurface;
}
