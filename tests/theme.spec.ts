import { expect, test, type Page } from "@playwright/test";

const themeToggle = (page: Page) => page.getByRole("button", { name: "Dark mode", exact: true });

async function visit(page: Page, path = "/") {
  await page.goto(path);
  await expect(page.getByRole("button", { name: "Squish the blob buddy", includeHidden: true })).toHaveAttribute("data-hydrated", "true");
  await page.evaluate(() => document.fonts.ready);
}

test.describe("light system preference", () => {
  test.use({ colorScheme: "light" });

  test("Switches to dark, persists across reloads, and updates the browser chrome", async ({ page }) => {
    await visit(page);
    const html = page.locator("html");
    const toggle = themeToggle(page);

    await expect(html).toHaveAttribute("data-theme", "light");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(toggle).toHaveAttribute("title", "Switch to dark theme");

    await toggle.click();
    await expect(html).toHaveAttribute("data-theme", "dark");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(toggle).toHaveAttribute("title", "Switch to light theme");
    await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe("rgb(10, 10, 10)");
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
    expect(await page.evaluate(() => document.querySelector('meta[name="theme-color"]')?.getAttribute("content"))).toBe("#0a0a0a");

    await page.reload();
    await expect(page.getByRole("button", { name: "Squish the blob buddy", includeHidden: true })).toHaveAttribute("data-hydrated", "true");
    await expect(html).toHaveAttribute("data-theme", "dark");
    await expect(themeToggle(page)).toHaveAttribute("aria-pressed", "true");

    await themeToggle(page).click();
    await expect(html).toHaveAttribute("data-theme", "light");
    await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe("rgb(255, 255, 255)");
  });

  test("Two presses during the fade return to the starting theme", async ({ page }) => {
    await visit(page);
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "light");

    const switching = await page.evaluate(() => {
      const button = document.querySelector<HTMLButtonElement>(".sidebar-controls .theme-toggle");
      button?.click();
      button?.click();
      return document.documentElement.classList.contains("theme-switching");
    });
    expect(switching).toBe(true);

    await expect(html).toHaveAttribute("data-theme", "light");
    await expect(themeToggle(page)).toHaveAttribute("aria-pressed", "false");
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("light");
    await expect(html).not.toHaveClass(/theme-switching/);
  });

  test("Keeps the theme control in the rail footer and stacks it in the compact rail", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await visit(page, "/about");
    const shell = page.locator(".site-shell");
    const theme = page.locator(".sidebar-controls .theme-toggle");
    const collapse = page.locator(".sidebar-toggle");

    const expandedTheme = (await theme.boundingBox())!;
    const expandedCollapse = (await collapse.boundingBox())!;
    expect(expandedTheme.width).toBeCloseTo(44, 0);
    expect(expandedTheme.height).toBeCloseTo(44, 0);
    expect(expandedTheme.y).toBeCloseTo(expandedCollapse.y, 0);
    expect(expandedCollapse.x + expandedCollapse.width).toBeLessThanOrEqual(expandedTheme.x);

    for (const control of [theme, collapse]) {
      await expect(control).toHaveCSS("border-radius", "9999px");
      await expect(control).toHaveCSS("border-top-width", "0px");
      await expect(control).toHaveCSS("background-color", "rgb(247, 247, 247)");
    }
    await theme.hover();
    await expect(theme).toHaveCSS("background-color", "rgb(232, 232, 232)");
    await page.mouse.move(0, 0);

    await collapse.click();
    await expect(shell).toHaveAttribute("data-sidebar-state", "compact");
    await expect(shell).toHaveAttribute("data-sidebar-motion", "settled");

    const compactTheme = (await theme.boundingBox())!;
    const compactCollapse = (await collapse.boundingBox())!;
    expect(compactTheme.x + compactTheme.width / 2).toBeCloseTo(compactCollapse.x + compactCollapse.width / 2, 0);
    expect(compactTheme.y + compactTheme.height).toBeLessThanOrEqual(compactCollapse.y);
    expect(await page.locator(".sidebar").evaluate(element => element.scrollHeight <= element.clientHeight)).toBe(true);

    await theme.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(theme).toHaveAttribute("aria-pressed", "true");
  });

  test("Shows the control in the mobile identity row without overflowing", async ({ page }) => {
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await visit(page);
      const toggle = page.locator(".theme-toggle-mobile");
      await expect(toggle).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

      await toggle.click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await expect(toggle).toHaveAttribute("aria-pressed", "true");
      await page.getByRole("button", { name: "Dark mode", exact: true }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    }
  });
});

test.describe("dark system preference", () => {
  test.use({ colorScheme: "dark" });

  test("Starts dark before hydration and keeps the light theme reachable", async ({ page }) => {
    await visit(page, "/about");
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "dark");
    await expect(themeToggle(page)).toHaveAttribute("aria-pressed", "true");
    await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe("rgb(10, 10, 10)");

    await themeToggle(page).click();
    await expect(html).toHaveAttribute("data-theme", "light");
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("light");
  });
});
