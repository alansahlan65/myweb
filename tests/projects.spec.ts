import { expect, test, type Page } from "@playwright/test";

async function visit(page: Page, path: string) {
  await page.goto(path);
  await expect(page.getByRole("button", { name: "Squish the blob buddy", includeHidden: true })).toHaveAttribute("data-hydrated", "true");
  await page.evaluate(() => document.fonts.ready);
}

test("Projects page stays calm, omits unfinished copy, uses its own contact copy, and opens Paylecta", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.setViewportSize({ width: 1440, height: 900 });
  await visit(page, "/projects");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Projects");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  const projectsNav = nav.getByRole("link", { name: "Projects", exact: true });
  const homeNav = nav.getByRole("link", { name: "Home", exact: true });
  await expect(projectsNav).toHaveAttribute("aria-current", "page");
  // Active nav item shows its filled icon; hovering keeps the default outline and shifts color.
  await expect(projectsNav.locator(".state-icon-fill")).toHaveCSS("opacity", "1");
  await expect(projectsNav.locator(".state-icon-outline")).toHaveCSS("opacity", "0");
  await expect(homeNav.locator(".state-icon-fill")).toHaveCSS("opacity", "0");
  await homeNav.hover();
  await expect(homeNav.locator(".state-icon-fill")).toHaveCSS("opacity", "0");
  await expect(homeNav.locator(".state-icon-outline")).toHaveCSS("opacity", "1");
  await expect(homeNav).toHaveCSS("color", "rgb(10, 10, 10)");
  const resumeLink = page.getByRole("link", { name: "See my resume", exact: true });
  await resumeLink.hover();
  await expect(resumeLink.locator(".state-icon-fill")).toHaveCSS("opacity", "0");
  await expect(resumeLink.locator(".state-icon")).toHaveCSS("color", "rgb(10, 10, 10)");
  const themeBtn = page.getByRole("button", { name: "Dark mode", exact: true });
  await expect(themeBtn.locator(".state-icon")).toHaveCount(1);
  await themeBtn.hover();
  await expect(themeBtn.locator(".state-icon-fill")).toHaveCSS("opacity", "0");
  await expect(themeBtn).toHaveCSS("color", "rgb(10, 10, 10)");
  const linkedIn = page.getByRole("link", { name: "Alan on LinkedIn", exact: true });
  await linkedIn.scrollIntoViewIfNeeded();
  await linkedIn.hover();
  await expect(linkedIn.locator(".state-icon-fill")).toHaveCSS("opacity", "0");
  await expect(linkedIn).toHaveCSS("color", "rgb(36, 91, 194)");
  await expect(page.locator(".project-row")).toHaveCount(4);
  await expect(page.locator(".project-row h2")).toHaveText(["Paylecta", "Aurelia", "PawFriend", "Munchpal"]);
  await expect(page.getByText(/in progress|on the way/i)).toHaveCount(0);

  await expect(page.locator("#contact-heading")).toHaveText("Want to talk through a project?");
  await expect(page.locator(".contact-panel > p")).toContainText("Happy to walk through my process");

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("link", { name: /Paylecta/ }).click();
  await expect(page).toHaveURL(/\/projects\/paylecta$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Making daily finances feel simpler for small shops.");

  // Returning to /projects must keep full-resolution preview images (no blurry 2x vertical upscale).
  await page.locator(".case-back-link").click();
  await expect(page).toHaveURL(/\/projects$/);
  const previews = page.locator(".project-row-media img");
  const previewCount = await previews.count();
  expect(previewCount).toBe(4);
  for (let i = 0; i < previewCount; i++) {
    await previews.nth(i).scrollIntoViewIfNeeded();
    await expect.poll(() => previews.nth(i).evaluate((img: HTMLImageElement) => {
      const box = img.getBoundingClientRect();
      return img.complete && img.naturalHeight >= Math.floor(box.height) && img.naturalWidth >= Math.floor(box.width);
    })).toBe(true);
  }
  expect(errors).toEqual([]);
});

test("Paylecta case study defaults to compact rail, places seamless opener below back link, shows dashboard in Overview, and uses the prev/next footer only", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.setViewportSize({ width: 1440, height: 900 });
  await visit(page, "/projects/paylecta");

  await expect(page.locator(".site-shell")).toHaveAttribute("data-sidebar-state", "compact");
  await expect(page.locator(".case-toc")).toBeVisible();

  const backBox = (await page.locator(".case-back-link").boundingBox())!;
  const projectName = page.locator(".case-project-name");
  await expect(projectName).toHaveText("Paylecta");
  const nameBox = (await projectName.boundingBox())!;
  expect(nameBox.x).toBeGreaterThan(backBox.x + backBox.width);
  expect(Math.abs(nameBox.y - backBox.y)).toBeLessThanOrEqual(4);
  const opener = page.locator(".case-opener-iframe");
  await expect(opener).toBeVisible();
  await expect(opener).toHaveAttribute("src", "/motion/paylecta-opener/index.html?embed=1");
  const openerBox = (await opener.boundingBox())!;
  const headingBox = (await page.getByRole("heading", { level: 1 }).boundingBox())!;
  expect(openerBox.y).toBeGreaterThan(backBox.y);
  expect(openerBox.y + openerBox.height).toBeLessThan(headingBox.y);

  // Seamless opener has no toggle buttons or fullscreen link.
  await expect(page.getByRole("button", { name: "Product tour", exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Dashboard", exact: true })).toHaveCount(0);
  await expect(page.getByRole("link", { name: /Full screen/ })).toHaveCount(0);

  // Static desktop dashboard sits inside Overview above the 3 design goal cards.
  const overviewDash = page.locator("#overview .case-screen-hero img");
  await expect(overviewDash).toBeVisible();
  const dashBox = (await overviewDash.boundingBox())!;
  const goalsBox = (await page.locator("#overview .case-goals").boundingBox())!;
  expect(dashBox.y + dashBox.height).toBeLessThan(goalsBox.y);

  // Verify all 8 case study images loaded without broken assets.
  const images = page.locator(".case-study img");
  const count = await images.count();
  expect(count).toBeGreaterThanOrEqual(8);
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
  await expect(page.getByRole("button", { name: "Dark mode", exact: true }).locator(".state-icon-fill")).toHaveCSS("opacity", "1");
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe("rgb(10, 10, 10)");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
