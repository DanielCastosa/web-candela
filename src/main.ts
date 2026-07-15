import "./styles.css";

import {
  pickActiveSection,
  sectionIds,
  surfaceIds,
  type ActiveSection,
  type SectionId,
} from "./scroll-spy";

const surfaces = surfaceIds.map((surfaceId) => {
  const surface = document.getElementById(surfaceId);

  if (!(surface instanceof HTMLElement)) {
    throw new Error(`No se encontró la superficie ${surfaceId}`);
  }

  return surface;
});

const navigationItems = new Map<SectionId, HTMLAnchorElement>();

for (const item of document.querySelectorAll<HTMLAnchorElement>("[data-section-id]")) {
  const sectionId = item.dataset.sectionId;

  if (sectionIds.includes(sectionId as SectionId)) {
    navigationItems.set(sectionId as SectionId, item);
  }
}

const themes: Record<SectionId | "hero", { background: string; accent: string }> = {
  hero: { background: "#ffe4ed", accent: "#f86494" },
  "section-1": { background: "#e8ffdb", accent: "#52b68d" },
  "section-2": { background: "#eccfff", accent: "#784ea6" },
  "section-3": { background: "#fff6be", accent: "#fbcb18" },
};

let activeSection: ActiveSection = sectionIds.includes(window.location.hash.slice(1) as SectionId)
  ? (window.location.hash.slice(1) as SectionId)
  : null;

const visibility = new Map<string, number>(surfaceIds.map((surfaceId) => [surfaceId, 0]));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setActiveSection(sectionId: ActiveSection): void {
  activeSection = sectionId;

  for (const [itemSectionId, item] of navigationItems) {
    if (itemSectionId === sectionId) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  }

  const theme = themes[sectionId ?? "hero"];
  document.documentElement.style.setProperty("--nav-background", theme.background);
  document.documentElement.style.setProperty("--nav-accent", theme.accent);
}

setActiveSection(activeSection);

for (const [sectionId, item] of navigationItems) {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: reduceMotion.matches ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", `#${sectionId}`);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
    }

    setActiveSection(pickActiveSection(visibility, activeSection));
  },
  {
    rootMargin: "-45% 0px -45% 0px",
    threshold: [0, 0.01, 0.05, 0.1],
  },
);

for (const surface of surfaces) {
  observer.observe(surface);
}

window.addEventListener("hashchange", () => {
  const sectionId = window.location.hash.slice(1) as SectionId;

  if (sectionIds.includes(sectionId)) {
    setActiveSection(sectionId);
  }
});
