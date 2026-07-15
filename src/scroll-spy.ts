export const sectionIds = ["section-1", "section-2", "section-3"] as const;

export type SectionId = (typeof sectionIds)[number];

export function pickActiveSection(
  visibility: ReadonlyMap<string, number>,
  currentSection: SectionId,
): SectionId {
  let activeSection = currentSection;
  let greatestRatio = 0;

  for (const sectionId of sectionIds) {
    const ratio = visibility.get(sectionId) ?? 0;

    if (ratio > greatestRatio) {
      activeSection = sectionId;
      greatestRatio = ratio;
    }
  }

  return activeSection;
}
