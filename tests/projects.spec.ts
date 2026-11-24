import { expect, test, type Page } from "@playwright/test";

async function visit(page: Page, path: string) {
  await page.goto(path);
  await expect(page.getByRole("button", { name: "Squish the blob buddy", includeHidden: true })).toHaveAttribute("data-hydrated", "true");
  await page.evaluate(() => document.fonts.ready);
}

test("Projects page filters work, uses its own contact copy, and opens Paylecta", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.setViewportSize({ width: 1440, height: 900 });
  await visit(page, "/projects");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Projects");
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Projects", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(page.locator(".project-row")).toHaveCount(4);

  await page.getByRole("button", { name: /Web app/ }).click();
  await expect(page.locator(".project-row")).toHaveCount(2);

  await page.getByRole("button", { name: /Mobile app/ }).click();
  await expect(page.locator(".project-row")).toHaveCount(3);

  await page.getByRole("button", { name: /Design systems/ }).click();
  await expect(page.locator(".project-row")).toHaveCount(1);
  await expect(page.locator(".project-row h2")).toHaveText(["Paylecta"]);

  await page.getByRole("button", { name: /All/ }).click();
  await expect(page.locator(".project-row")).toHaveCount(4);

  await expect(page.locator("#contact-heading")).toHaveText("Want the full story?");
  await expect(page.locator(".contact-panel > p")).toContainText("Happy to walk through any of these");

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("link", { name: /Paylecta/ }).click();
  await expect(page).toHaveURL(/\/projects\/paylecta$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Making daily finances feel simpler for small shops.");
  expect(errors).toEqual([]);
});

test("Paylecta case study defaults to compact rail, embeds the opener, loads all screens, and uses the prev/next footer only", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.setViewportSize({ width: 1440, height: 900 });
  await visit(page, "/projects/paylecta");

  await expect(page.locator(".site-shell")).toHaveAttribute("data-sidebar-state", "compact");
  await expect(page.locator(".case-toc")).toBeVisible();
  await expect(page.locator(".case-opener-iframe")).toBeVisible();
  await expect(page.locator(".case-opener-iframe")).toHaveAttribute("src", "/motion/paylecta-opener/index.html");

  // Switch hero view to static desktop dashboard screen and verify image loads cleanly.
  await page.getByRole("button", { name: "Dashboard", exact: true }).click();
  const heroImg = page.locator(".case-screen-hero img");
  await expect(heroImg).toBeVisible();
  await expect.poll(() => heroImg.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);

  // Switch back to live product tour.
  await page.getByRole("button", { name: "Product tour", exact: true }).click();
  await expect(page.locator(".case-opener-iframe")).toBeVisible();

  // Verify all case study images loaded without broken assets.
  const images = page.locator(".case-study img");
  const count = await images.count();
  expect(count).toBeGreaterThanOrEqual(7);
  for (let i = 0; i < count; i++) {
    await images.nth(i).scrollIntoViewIfNeeded();
    await expect.poll(() => images.nth(i).evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  }

  // Case study replaces the standard contact panel and site footer with Prev / Next links only.
  await expect(page.locator(".contact-panel")).toHaveCount(0);
  await expect(page.locator(".site-footer")).toHaveCount(0);
  const prevLink = page.getByRole("link", { name: /Previous: All projects/ });
  const nextLink = page.getByRole("link", { name: /Next project: Aurelia/ });
  await expect(prevLink).toHaveAttribute("href", "/projects");
  await expect(nextLink).toHaveAttribute("href", "/projects#aurelia");

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test("Projects and Paylecta fit mobile and dark mode cleanly without horizontal overflow", async ({ page }) => {
  for (const width of [1280, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of ["/projects", "/projects/paylecta"]) {
      await visit(page, route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} light at ${width}px`).toBe(true);
    }
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await visit(page, "/projects/paylecta");
  await page.getByRole("button", { name: "Dark mode", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe("rgb(10, 10, 10)");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
