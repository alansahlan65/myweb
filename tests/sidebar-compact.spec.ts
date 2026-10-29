import { expect, test, type Page } from "@playwright/test";

async function visit(page: Page, path = "/") {
  await page.goto(path);
  // data-hydrated is client-only, so it proves the effects and handlers exist.
  await expect(page.getByRole("button", { name: "Squish the blob buddy", includeHidden: true })).toHaveAttribute("data-hydrated", "true");
  await page.evaluate(() => document.fonts.ready);
}

const shell = (page: Page) => page.locator(".site-shell");

function topNavItem(page: Page, name: "Home" | "Know me better") {
  return page.getByRole("link", { name, exact: true });
}

test("Compact rail centers every control and keeps the labels as accessible names", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await visit(page, "/about");
  const root = shell(page);
  const sidebar = page.locator(".sidebar");
  const contact = sidebar.locator(".sidebar-actions").getByRole("button", { name: "Get in touch", exact: true });
  const collapse = page.getByRole("button", { name: "Collapse sidebar", exact: true });
  await expect(root).toHaveAttribute("data-sidebar-state", "expanded");
  await expect(root).toHaveAttribute("data-sidebar-progress", "0");

  const expandedIdentity = (await page.locator(".identity").boundingBox())!;
  expect(expandedIdentity.width).toBeCloseTo(208, 0);
  const expandedPill = (await contact.boundingBox())!;
  expect(expandedPill.width).toBeCloseTo(144, 0);
  expect(expandedPill.height).toBeCloseTo(44, 0);
  const expandedSidebar = (await sidebar.boundingBox())!;
  const expandedToggle = (await collapse.boundingBox())!;
  expect(expandedToggle.y + expandedToggle.height).toBeGreaterThan(expandedSidebar.y + expandedSidebar.height - 16);
  await page.screenshot({ path: "docs/references/sidebar-expanded.png" });

  await collapse.click();
  await expect(root).toHaveAttribute("data-sidebar-state", "compact");
  await expect(root).toHaveAttribute("data-sidebar-progress", "1");
  await expect(root).toHaveAttribute("data-sidebar-motion", "settled");

  const expand = page.getByRole("button", { name: "Expand sidebar", exact: true });
  await expect(expand).toBeVisible();
  await expect(expand).toHaveAttribute("aria-expanded", "false");

  const identity = (await page.locator(".identity").boundingBox())!;
  const center = identity.x + identity.width / 2;
  expect(identity.width).toBeCloseTo(72, 0);

  const controls = [
    topNavItem(page, "Home"),
    topNavItem(page, "Know me better"),
    contact,
    page.getByRole("link", { name: "See my resume", exact: true }),
    expand,
  ];
  for (const control of controls) {
    const box = (await control.boundingBox())!;
    expect(box.width).toBeCloseTo(44, 0);
    expect(box.height).toBeCloseTo(44, 0);
    expect(box.x + box.width / 2).toBeCloseTo(center, 0);
  }

  const home = topNavItem(page, "Home");
  const homeIcon = (await home.locator("svg").boundingBox())!;
  expect(homeIcon.x + homeIcon.width / 2).toBeCloseTo(center, 0);
  const compactSidebar = (await sidebar.boundingBox())!;
  const compactToggle = (await expand.boundingBox())!;
  expect(compactToggle.y + compactToggle.height).toBeGreaterThan(compactSidebar.y + compactSidebar.height - 16);

  for (const label of await page.locator(".nav-label").all()) {
    expect((await label.boundingBox())!.width).toBe(0);
    await expect(label).toHaveCSS("opacity", "0");
  }

  const identityCopy = page.locator(".identity-copy");
  await expect(identityCopy).toHaveAttribute("aria-hidden", "true");
  await expect(identityCopy).toHaveAttribute("tabindex", "-1");
  await expect(page.locator(".sidebar-character")).toHaveAttribute("inert", "");
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Home", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "See my resume", exact: true })).toBeVisible();
  await expect(contact).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

  await page.screenshot({ path: "docs/references/sidebar-compact.png" });

  await contact.click();
  await expect(page.getByRole("dialog", { name: "Get in touch" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(contact).toBeFocused();

  await topNavItem(page, "Home").click();
  await expect(page).toHaveURL(/\/$/);
  await expect(root).toHaveAttribute("data-sidebar-state", "compact");
  await expect(root).toHaveAttribute("data-sidebar-progress", "1");
});

test("Compact rail hands its freed width to the content and holds the right edge", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await visit(page, "/about");
  const root = shell(page);
  const main = page.locator("#main");
  const footer = page.locator(".site-footer");

  const expandedShell = (await root.boundingBox())!;
  const expandedMain = (await main.boundingBox())!;
  const expandedFooter = (await footer.boundingBox())!;

  await page.getByRole("button", { name: "Collapse sidebar", exact: true }).click();
  await expect(root).toHaveAttribute("data-sidebar-progress", "1");
  await expect(root).toHaveAttribute("data-sidebar-motion", "settled");

  const compactShell = (await root.boundingBox())!;
  const compactMain = (await main.boundingBox())!;
  const compactFooter = (await footer.boundingBox())!;

  // The shell holds still and the content keeps its right edge.
  expect(compactShell.x).toBeCloseTo(expandedShell.x, 0);
  expect(compactShell.width).toBeCloseTo(expandedShell.width, 0);
  expect(compactMain.x + compactMain.width).toBeCloseTo(expandedMain.x + expandedMain.width, 0);
  // The freed rail width moves to the content's left edge.
  expect(expandedMain.width - compactMain.width).toBeCloseTo(-136, 0);
  expect(compactMain.x).toBeCloseTo(expandedMain.x - 136, 0);
  expect(compactFooter.width).toBeCloseTo(expandedFooter.width + 136, 0);
});

test("Compact rail fits laptop heights with every control in view", async ({ page }) => {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 1280, height: 720 }, { width: 1024, height: 768 }, { width: 1001, height: 768 }]) {
    await page.setViewportSize(viewport);
    await visit(page, "/about");
    const root = shell(page);
    await page.getByRole("button", { name: "Collapse sidebar", exact: true }).click();
    await expect(root).toHaveAttribute("data-sidebar-state", "compact");
    await expect(root).toHaveAttribute("data-sidebar-progress", "1");

    const sidebar = page.locator(".sidebar");
    expect(await sidebar.evaluate(element => element.scrollHeight <= element.clientHeight), `compact sidebar overflows at ${viewport.width}x${viewport.height}`).toBe(true);
    await expect(sidebar.getByRole("button", { name: "Get in touch", exact: true })).toBeInViewport({ ratio: 1 });
    await expect(sidebar.getByRole("link", { name: "See my resume", exact: true })).toBeInViewport({ ratio: 1 });
    await expect(sidebar.getByRole("button", { name: "Expand sidebar", exact: true })).toBeInViewport({ ratio: 1 });

    const identity = (await page.locator(".identity").boundingBox())!;
    const blob = (await page.getByRole("button", { name: "Squish the blob buddy" }).boundingBox())!;
    expect(blob.x + blob.width / 2).toBeCloseTo(identity.x + identity.width / 2, 0);
    expect(identity.width).toBeCloseTo(72, 0);
    const sidebarBox = (await sidebar.boundingBox())!;
    const toggleBox = (await sidebar.getByRole("button", { name: "Expand sidebar", exact: true }).boundingBox())!;
    expect(toggleBox.y + toggleBox.height).toBeGreaterThan(sidebarBox.y + sidebarBox.height - 16);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `compact layout overflows at ${viewport.width}x${viewport.height}`).toBe(true);
  }
});

test("Rail toggle holds the bottom of the viewport while the page scrolls", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await visit(page, "/about");
  const root = shell(page);
  await page.getByRole("button", { name: "Collapse sidebar", exact: true }).click();
  await expect(root).toHaveAttribute("data-sidebar-state", "compact");
  await expect(root).toHaveAttribute("data-sidebar-motion", "settled");

  const expand = page.getByRole("button", { name: "Expand sidebar", exact: true });
  const before = (await expand.boundingBox())!;
  await page.evaluate(() => window.scrollTo(0, 700));
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBe(700);
  const after = (await expand.boundingBox())!;
  expect(after.y).toBeCloseTo(before.y, 0);
  expect(after.y + after.height).toBeGreaterThan(900 - 32);
});

test("Sidebar spring reverses from the current frame instead of snapping", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await visit(page, "/about");
  const root = shell(page);

  const reversal = await page.evaluate(async () => {
    const element = document.querySelector<HTMLElement>(".site-shell")!;
    const button = document.querySelector<HTMLButtonElement>(".sidebar-toggle")!;
    const read = () => ({ p: Number(element.dataset.sidebarProgress), v: Number(element.dataset.sidebarVelocity) });
    button.click();
    for (let index = 0; index < 60; index++) {
      await new Promise(requestAnimationFrame);
      if (Number(element.dataset.sidebarProgress) > .2) break;
    }
    const before = read();
    button.click();
    await new Promise(requestAnimationFrame);
    return { before, after: read() };
  });

  expect(reversal.before.p).toBeGreaterThan(.2);
  expect(reversal.before.p).toBeLessThan(1);
  expect(reversal.before.v).toBeGreaterThan(0);
  expect(reversal.after.v).toBeLessThan(reversal.before.v);
  expect(Math.abs(reversal.after.p - reversal.before.p)).toBeLessThan(.25);

  await expect(root).toHaveAttribute("data-sidebar-state", "expanded");
  await expect(root).toHaveAttribute("data-sidebar-motion", "settled");
  await expect(root).toHaveAttribute("data-sidebar-progress", "0");

  await page.getByRole("button", { name: "Collapse sidebar", exact: true }).click();
  await expect(root).toHaveAttribute("data-sidebar-state", "compact");
  await expect(root).toHaveAttribute("data-sidebar-motion", "settled");
  await expect(root).toHaveAttribute("data-sidebar-progress", "1");
  await expect(page.getByRole("button", { name: "Expand sidebar", exact: true })).toHaveAttribute("aria-expanded", "false");
});

test("Reduced motion and keyboard switch the rail without animating", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await visit(page, "/about");
  const root = shell(page);
  const toggle = page.locator(".sidebar-toggle");
  await page.emulateMedia({ reducedMotion: "reduce" });

  const instant = await page.evaluate(async () => {
    const element = document.querySelector<HTMLElement>(".site-shell")!;
    document.querySelector<HTMLButtonElement>(".sidebar-toggle")!.click();
    await new Promise(requestAnimationFrame);
    return { p: Number(element.dataset.sidebarProgress), motion: element.dataset.sidebarMotion, state: element.dataset.sidebarState };
  });
  expect(instant).toEqual({ p: 1, motion: "settled", state: "compact" });
  await expect(page.getByRole("button", { name: "Expand sidebar", exact: true })).toHaveAttribute("aria-expanded", "false");

  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(root).toHaveAttribute("data-sidebar-state", "expanded");
  await expect(root).toHaveAttribute("data-sidebar-motion", "settled");
  await expect(root).toHaveAttribute("data-sidebar-progress", "0");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(toggle).toBeFocused();
});

test("Compact intent does not reach the mobile layout and returns on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await visit(page);
  const root = shell(page);
  await page.getByRole("button", { name: "Collapse sidebar", exact: true }).click();
  await expect(root).toHaveAttribute("data-sidebar-progress", "1");

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(root).toHaveAttribute("data-sidebar-state", "expanded");
  await expect(root).toHaveAttribute("data-sidebar-progress", "0");
  await expect(page.getByRole("button", { name: "Expand sidebar", exact: true })).toBeHidden();
  await expect(page.getByRole("button", { name: "Open navigation", exact: true })).toBeVisible();
  const copy = page.locator(".identity-copy");
  await expect(copy).toBeVisible();
  await expect(copy).not.toHaveAttribute("aria-hidden");
  await expect(copy).not.toHaveAttribute("tabindex", "-1");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

  await page.getByRole("button", { name: "Open navigation", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Navigation", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Close navigation", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Navigation", exact: true })).not.toBeVisible();

  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(root).toHaveAttribute("data-sidebar-state", "compact");
  await expect(root).toHaveAttribute("data-sidebar-progress", "1");
  await expect(page.getByRole("button", { name: "Expand sidebar", exact: true })).toBeVisible();
  await expect(page.locator(".identity-copy")).toHaveAttribute("aria-hidden", "true");
});
