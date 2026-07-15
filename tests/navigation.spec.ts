import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("renders the exact palette and starts with section 1 active", async ({ page }) => {
  await expect(page.locator("#section-1")).toHaveCSS("background-color", "rgb(238, 233, 223)");
  await expect(page.locator("#section-2")).toHaveCSS("background-color", "rgb(201, 193, 177)");
  await expect(page.locator("#section-3")).toHaveCSS("background-color", "rgb(238, 233, 223)");
  await expect(page.locator(".floating-nav")).toHaveCSS("background-color", "rgb(255, 177, 98)");
  await expect(page.getByRole("link", { name: "sección 1" })).toHaveAttribute("aria-current", "page");
});

test("clicking navigation scrolls and updates the selected section", async ({ page }) => {
  await page.getByRole("link", { name: "sección 2" }).click();
  await expect(page.getByRole("link", { name: "sección 2" })).toHaveAttribute("aria-current", "page");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(700);
});

test("manual scrolling updates the selected section", async ({ page }) => {
  await page.locator("#section-3").evaluate((section) => section.scrollIntoView());
  await expect(page.getByRole("link", { name: "sección 3" })).toHaveAttribute("aria-current", "page");

  await page.locator("#section-1").evaluate((section) => section.scrollIntoView());
  await expect(page.getByRole("link", { name: "sección 1" })).toHaveAttribute("aria-current", "page");
});

test("the floating navigation stays inside a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const bounds = await page.locator(".floating-nav").boundingBox();

  expect(bounds).not.toBeNull();
  expect(bounds!.x).toBeGreaterThanOrEqual(16);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(374);
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(828);
  await expect(page.locator("body")).toHaveCSS("overflow-x", "hidden");
});
