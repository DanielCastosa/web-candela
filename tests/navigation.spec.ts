import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("renders the editorial hero with no navigation item selected", async ({ page }) => {
  await expect(page.locator("#hero")).toHaveCSS("background-color", "rgb(255, 228, 237)");
  await expect(page.getByText("Modas", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Candela", level: 1 })).toBeVisible();
  await expect(page.getByRole("img", { name: "Logo de Modas Candela" })).toBeVisible();
  await expect(page.getByText("Moda con alma,", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("img", { name: "Maniquí con vestido de satén" })).toBeVisible();
  await expect(page.locator(".floating-nav")).toHaveCSS("background-color", "rgb(255, 228, 237)");
  await expect(page.locator('.floating-nav__item[aria-current="page"]')).toHaveCount(0);
});

test("serves the latest supplied Candela logo artwork", async ({ page }) => {
  const checksum = await page.evaluate(async () => {
    const response = await fetch("/candela-logo.png");
    const bytes = await response.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", bytes);

    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  });

  expect(checksum).toBe("ec30185cfb0baff79250b1e5e10229875edb1874bbc6ee3b2ac88805984db4b5");
});

test("configures the supplied Candela favicon", async ({ page }) => {
  const favicon = page.locator('link[rel="icon"]');

  await expect(favicon).toHaveAttribute("href", "/favicon.png");
  await expect(favicon).toHaveAttribute("type", "image/png");
  await expect(favicon).toHaveAttribute("sizes", "150x150");
});

test("renders the exact section palette", async ({ page }) => {
  await expect(page.locator("#section-1")).toHaveCSS("background-color", "rgb(232, 255, 219)");
  await expect(page.locator("#section-2")).toHaveCSS("background-color", "rgb(236, 207, 255)");
  await expect(page.locator("#section-3")).toHaveCSS("background-color", "rgb(255, 246, 190)");
});

test("renders the origin story with the approved copy and title treatment", async ({ page }) => {
  await page.locator("#section-1").evaluate((section) => section.scrollIntoView());
  await expect(page.getByRole("heading", { name: "¿Cómo nacimos?", level: 2 })).toBeVisible();
  await expect(
    page.getByText(
      "Con el sueño de una niña de 10 años construimos nuestros almacenes y la gran familia.",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(page.locator("#section-1 .section-heading__heart")).toBeVisible();
  await expect(page.getByRole("heading", { name: "¿Cómo nacimos?", level: 2 })).toHaveCSS(
    "font-family",
    "Molle, cursive",
  );
  await expect(page.getByRole("img", { name: "Personaje vegetal de Modas Candela" })).toBeVisible();
});

test("renders the dark Modas Candela copyright footer", async ({ page }) => {
  await page.locator(".site-footer").evaluate((footer) => footer.scrollIntoView());
  await expect(page.getByText("© 2026 Modas Candela", { exact: true })).toBeVisible();
  await expect(page.locator(".site-footer")).toHaveCSS("background-color", "rgb(51, 37, 42)");
});

test("renders six pastel products between two floating mannequins", async ({ page }) => {
  await page.locator("#section-2").evaluate((section) => section.scrollIntoView());
  await expect(page.getByRole("heading", { name: "Productos", level: 2 })).toBeVisible();
  await expect(page.locator("#section-2 .product-card img")).toHaveCount(6);
  await expect(page.locator("#section-2 .products__mannequin")).toHaveCount(2);
  await expect(page.getByRole("img", { name: "Maniquí lateral con vestido de satén" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Maniquí lateral con vestido lila" })).toBeVisible();
  const columnCount =
    await page
      .locator("#section-2 .products__grid")
      .evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.split(" ").length);
  expect(columnCount).toBe((page.viewportSize()?.width ?? 1440) <= 600 ? 2 : 3);
});

test("renders the Hollywood address and the illustrated street", async ({ page }) => {
  await page.locator("#section-3").evaluate((section) => section.scrollIntoView());
  await expect(
    page.getByRole("heading", { name: "¿Dónde nos encontramos?", level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByText("Nos encontramos en Hollywood, c/ Hollywood Boulevard, 24", { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("img", { name: "Ilustración de Hollywood Boulevard" })).toBeVisible();
  await expect(page.locator(".location__illustration")).toHaveCSS("mix-blend-mode", "darken");
});

test("keeps the populated sections inside a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("#section-2").evaluate((section) => section.scrollIntoView());
  expect(
    await page
      .locator("#section-2 .products__grid")
      .evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.split(" ").length),
  ).toBe(2);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await expect(page.locator(".floating-nav")).toBeVisible();

  await page.locator("#section-3").evaluate((section) => section.scrollIntoView());
  const locationTitle = await page.locator("#location-title").boundingBox();
  expect(locationTitle).not.toBeNull();
  expect(locationTitle!.x + locationTitle!.width).toBeLessThanOrEqual(390);
});

test("clicking navigation scrolls and updates the selected section", async ({ page }) => {
  await expect(page.locator(".floating-nav__item")).toHaveText(["Historia", "Productos", "Ubicación"]);
  await page.getByRole("link", { name: "Productos" }).click();
  await expect(page.getByRole("link", { name: "Productos" })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("link", { name: "Productos" })).toHaveCSS(
    "background-color",
    "rgb(120, 78, 166)",
  );
  await expect(page.locator(".floating-nav")).toHaveCSS("background-color", "rgb(236, 207, 255)");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(700);
});

test("manual scrolling updates the selected section", async ({ page }) => {
  await page.locator("#section-3").evaluate((section) => section.scrollIntoView());
  await expect(page.getByRole("link", { name: "Ubicación" })).toHaveAttribute("aria-current", "page");

  await page.locator("#section-1").evaluate((section) => section.scrollIntoView());
  await expect(page.getByRole("link", { name: "Historia" })).toHaveAttribute("aria-current", "page");

  await page.locator("#hero").evaluate((section) => section.scrollIntoView());
  await expect(page.locator('.floating-nav__item[aria-current="page"]')).toHaveCount(0);
});

test("the hero artwork and floating navigation stay inside a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const bounds = await page.locator(".floating-nav").boundingBox();
  const artworkBounds = await page.locator(".hero__mannequin").boundingBox();
  const prefixBounds = await page.locator(".hero__brand-prefix").boundingBox();
  const titleBounds = await page.locator(".hero__title").boundingBox();
  const logoBounds = await page.getByRole("img", { name: "Logo de Modas Candela" }).boundingBox();

  expect(bounds).not.toBeNull();
  expect(artworkBounds).not.toBeNull();
  expect(prefixBounds).not.toBeNull();
  expect(titleBounds).not.toBeNull();
  expect(logoBounds).not.toBeNull();
  expect(bounds!.x).toBeGreaterThanOrEqual(16);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(374);
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(828);
  expect(artworkBounds!.x).toBeGreaterThanOrEqual(0);
  expect(artworkBounds!.x + artworkBounds!.width).toBeLessThanOrEqual(390);
  expect(prefixBounds!.x + prefixBounds!.width).toBeLessThanOrEqual(390);
  expect(titleBounds!.x + titleBounds!.width).toBeLessThanOrEqual(390);
  expect(logoBounds!.x).toBeGreaterThanOrEqual(0);
  expect(logoBounds!.x + logoBounds!.width).toBeLessThanOrEqual(390);
  expect(logoBounds!.y).toBeGreaterThanOrEqual(0);

  await page.locator("#section-1").evaluate((section) => section.scrollIntoView());
  const mascotBounds = await page
    .getByRole("img", { name: "Personaje vegetal de Modas Candela" })
    .boundingBox();
  expect(mascotBounds).not.toBeNull();
  expect(mascotBounds!.x).toBeGreaterThanOrEqual(0);
  expect(mascotBounds!.x + mascotBounds!.width).toBeLessThanOrEqual(390);
  await expect(page.locator("body")).toHaveCSS("overflow-x", "hidden");
});
