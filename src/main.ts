import "./styles.css";

import { pickActiveSection, sectionIds, type SectionId } from "./scroll-spy";

const sections = sectionIds.map((sectionId) => {
  const section = document.getElementById(sectionId);

  if (!(section instanceof HTMLElement)) {
    throw new Error(`No se encontró la sección ${sectionId}`);
  }

  return section;
});

const navigationItems = new Map<SectionId, HTMLAnchorElement>();

for (const item of document.querySelectorAll<HTMLAnchorElement>("[data-section-id]")) {
  const sectionId = item.dataset.sectionId;

  if (sectionIds.includes(sectionId as SectionId)) {
    navigationItems.set(sectionId as SectionId, item);
  }
}

let activeSection: SectionId = sectionIds.includes(window.location.hash.slice(1) as SectionId)
  ? (window.location.hash.slice(1) as SectionId)
  : "section-1";

const visibility = new Map<string, number>(sectionIds.map((sectionId) => [sectionId, 0]));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setActiveSection(sectionId: SectionId): void {
  activeSection = sectionId;

  for (const [itemSectionId, item] of navigationItems) {
    if (itemSectionId === sectionId) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  }
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

for (const section of sections) {
  observer.observe(section);
}

window.addEventListener("hashchange", () => {
  const sectionId = window.location.hash.slice(1) as SectionId;

  if (sectionIds.includes(sectionId)) {
    setActiveSection(sectionId);
  }
});
