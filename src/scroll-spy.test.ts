import { describe, expect, it } from "vitest";

import { pickActiveSection } from "./scroll-spy";

describe("pickActiveSection", () => {
  it("clears the active navigation item while the hero is visible", () => {
    const visibility = new Map([
      ["hero", 0.84],
      ["section-1", 0.16],
      ["section-2", 0],
      ["section-3", 0],
    ]);

    expect(pickActiveSection(visibility, "section-1")).toBeNull();
  });

  it("selects the visible section with the greatest intersection ratio", () => {
    const visibility = new Map([
      ["hero", 0],
      ["section-1", 0],
      ["section-2", 0.72],
      ["section-3", 0.28],
    ]);

    expect(pickActiveSection(visibility, "section-1")).toBe("section-2");
  });

  it("keeps the current section when no section intersects the tracking band", () => {
    const visibility = new Map([
      ["hero", 0],
      ["section-1", 0],
      ["section-2", 0],
      ["section-3", 0],
    ]);

    expect(pickActiveSection(visibility, "section-3")).toBe("section-3");
  });

  it("resolves an equal intersection using document order", () => {
    const visibility = new Map([
      ["hero", 0],
      ["section-1", 0],
      ["section-2", 0.5],
      ["section-3", 0.5],
    ]);

    expect(pickActiveSection(visibility, "section-1")).toBe("section-2");
  });
});
