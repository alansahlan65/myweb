import { expect, test, type Page } from "@playwright/test";
import { writeFile } from "node:fs/promises";

async function visit(page: Page, path = "/") {
  await page.goto(path);
  // data-hydrated is client-only, so it proves the effects and handlers exist.
  await expect(page.getByRole("button", { name: "Squish the blob buddy", includeHidden: true })).toHaveAttribute("data-hydrated", "true");
  await page.evaluate(() => document.fonts.ready);
}

test("Mobile side menu fits phones, tablets, and landscape without shifting the page", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  for (const viewport of [{ width: 320, height: 740 }, { width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1000, height: 800 }, { width: 640, height: 240 }]) {
    await page.setViewportSize(viewport);
    for (const route of ["/", "/about"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const heading = page.locator("main h1");
      const before = await heading.boundingBox();
      const trigger = page.getByRole("button", { name: "Open navigation", exact: true });
      const triggerBounds = (await trigger.boundingBox())!;
      await trigger.click();
      const menu = page.getByRole("dialog", { name: "Navigation", exact: true });
      await expect(menu).toBeVisible();
      await expect(menu).toHaveAttribute("data-motion-state", "open");
      const bounds = (await menu.boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(4);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(viewport.width - 4);
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(viewport.height - 16);
      const closeBounds = (await menu.getByRole("button", { name: "Close navigation" }).boundingBox())!;
      expect(closeBounds.x).toBeCloseTo(triggerBounds.x, 0);
      expect(closeBounds.y).toBeCloseTo(triggerBounds.y, 0);
      expect(closeBounds.width).toBeCloseTo(triggerBounds.width, 0);
      expect(closeBounds.x).toBeGreaterThanOrEqual(bounds.x + 16);
      expect(closeBounds.y).toBeGreaterThanOrEqual(bounds.y + 16);
      expect(closeBounds.x + closeBounds.width).toBeLessThanOrEqual(bounds.x + bounds.width - 16);
      expect(await heading.boundingBox()).toEqual(before);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const current = menu.getByRole("link", { name: route === "/" ? "Home" : "Know me better", exact: true });
      await expect(current).toHaveAttribute("aria-current", "page");
      for (const name of ["Home", "Know me better", "See my resume", "LinkedIn", "Instagram", "Behance"]) {
        const link = menu.getByRole("link", { name, exact: true });
        await link.scrollIntoViewIfNeeded();
        await expect(link).toBeInViewport({ ratio: 1 });
      }
      if (viewport.height > 400) {
        await menu.getByRole("link", { name: "Home", exact: true }).scrollIntoViewIfNeeded();
        await expect(menu.getByRole("link", { name: "Home", exact: true })).toHaveCSS("opacity", "1");
      }
      await page.screenshot({ path: `.impeccable/review/mobile-menu-${route === "/" ? "home" : "about"}-${viewport.width}.png` });
      await menu.getByRole("button", { name: "Close navigation" }).click();
      await expect(menu).not.toBeVisible();
      await expect(trigger).toBeFocused();
      expect(await heading.boundingBox()).toEqual(before);
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Open navigation" })).toHaveCount(0);
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("Side menu traps focus, locks background scrolling, and closes after navigation or resizing", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation", exact: true });
  await trigger.press("Enter");
  const menu = page.getByRole("dialog", { name: "Navigation", exact: true });
  const close = menu.getByRole("button", { name: "Close navigation" });
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(menu.getByRole("link", { name: "Behance", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.mouse.move(4, 600);
  await page.mouse.wheel(0, 500);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  expect(await page.evaluate(() => scrollY)).toBe(0);
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await menu.getByRole("link", { name: "Home", exact: true }).click();
  await expect(menu).not.toBeVisible();
  await expect(page.locator("main")).toBeFocused();
  await trigger.click();
  await menu.getByRole("link", { name: "Know me better", exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(menu).not.toBeVisible();
  await trigger.click();
  await page.goBack();
  await expect(page).toHaveURL("http://127.0.0.1:3000/");
  await expect(menu).not.toBeVisible();
  await trigger.click();
  await page.setViewportSize({ width: 1001, height: 900 });
  await expect(menu).not.toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await page.mouse.click(4, 700);
  await expect(menu).not.toBeVisible();
  await page.mouse.move(200, 700);
  await page.mouse.wheel(0, 500);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(0);
});

test("Touch menu respects reduced motion and keeps the Contact modal and resume working", async ({ browser }) => {
  const context = await browser.newContext({ baseURL: "http://127.0.0.1:3000", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/about");
  const trigger = page.getByRole("button", { name: "Open navigation", exact: true });
  const menu = page.getByRole("dialog", { name: "Navigation", exact: true });
  await expect(async () => {
    await trigger.tap();
    await expect(menu).toBeVisible({ timeout: 1_000 });
  }).toPass();
  await expect(menu.locator("[data-menu-surface]")).toHaveCSS("clip-path", "none");
  await expect(menu.getByRole("link", { name: "Know me better", exact: true })).toHaveCSS("transform", "none");
  const contactTrigger = menu.getByRole("button", { name: "Get in touch", exact: true });
  await contactTrigger.tap();
  const contact = page.getByRole("dialog", { name: "Get in touch", exact: true });
  await expect(contact).toBeVisible();
  await expect(contact.getByRole("link", { name: "Email Alan" })).toHaveAttribute("href", "mailto:alansahlanwork@gmail.com");
  await page.keyboard.press("Escape");
  await expect(contact).not.toBeVisible();
  await expect(menu).toBeVisible();
  await expect(contactTrigger).toBeFocused();
  const downloadPromise = page.waitForEvent("download");
  await menu.getByRole("link", { name: "See my resume", exact: true }).tap();
  expect((await downloadPromise).suggestedFilename()).toBe("Alan-Sahlan-Resume.pdf");
  await menu.getByRole("link", { name: "Home", exact: true }).tap();
  await expect(page).toHaveURL("http://127.0.0.1:3000/");
  await expect(menu).not.toBeVisible();
  await context.close();
});

test("Menu controls remain clear at 200% text size, in RTL, and in forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 422 });
  await page.goto("/about");
  await page.getByRole("button", { name: "Open navigation", exact: true }).press("Enter");
  const menu = page.getByRole("dialog", { name: "Navigation", exact: true });
  const surface = menu.locator("[data-menu-surface]");
  await expect(menu).toHaveAttribute("data-motion-state", "open");
  const close = menu.getByRole("button", { name: "Close navigation" });
  await expect(close).toBeFocused();
  await expect(close).toHaveCSS("outline-style", "solid");
  await expect(close).toHaveCSS("outline-width", "2px");
  expect(await close.evaluate(element => {
    const box = element.getBoundingClientRect();
    return [[8, 8], [box.width - 8, 8], [8, box.height - 8], [box.width - 8, box.height - 8]].every(([x, y]) => element.contains(document.elementFromPoint(box.x + x, box.y + y)));
  })).toBe(true);
  const pairs = await menu.evaluate(element => {
    const rgb = (color: string) => color.match(/[\d.]+/g)!.slice(0, 3).map(Number);
    const luminance = (channels: number[]) => channels.map(value => { const c = value / 255; return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }).reduce((sum, c, i) => sum + c * [.2126, .7152, .0722][i], 0);
    return [...element.querySelectorAll<HTMLElement>("a, button")].map(control => {
      const foreground = getComputedStyle(control).color;
      let ancestor: HTMLElement | null = control;
      while (ancestor && getComputedStyle(ancestor).backgroundColor === "rgba(0, 0, 0, 0)") ancestor = ancestor.parentElement;
      const background = getComputedStyle(ancestor!).backgroundColor;
      const a = luminance(rgb(foreground)), b = luminance(rgb(background));
      return { label: control.getAttribute("aria-label") || control.textContent!.trim(), foreground, background, ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05) };
    });
  });
  for (const pair of pairs) expect(pair.ratio, pair.label).toBeGreaterThanOrEqual(4.5);
  await writeFile(".impeccable/review/mobile-menu-neutral-contrast.json", JSON.stringify(pairs, null, 2));
  await menu.locator("a, button").evaluateAll(elements => {
    for (const element of elements) (element as HTMLElement).style.fontSize = `${parseFloat(getComputedStyle(element).fontSize) * 2}px`;
  });
  for (const link of await menu.getByRole("link").all()) {
    await link.focus();
    await link.scrollIntoViewIfNeeded();
    await expect(link).toBeInViewport({ ratio: 1 });
    expect(await link.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    const bounds = (await link.boundingBox())!;
    const panel = (await menu.boundingBox())!;
    expect(bounds.x).toBeGreaterThanOrEqual(panel.x + 16);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(panel.x + panel.width - 16);
    const scrollport = (await menu.locator("[data-menu-content]").boundingBox())!;
    const ring = await link.evaluate(element => { const style = getComputedStyle(element); return parseFloat(style.outlineWidth) + parseFloat(style.outlineOffset); });
    expect(ring).toBeGreaterThanOrEqual(2);
    expect(bounds.y - ring).toBeGreaterThanOrEqual(scrollport.y);
    expect(bounds.y + bounds.height + ring).toBeLessThanOrEqual(scrollport.y + scrollport.height);
    const closeBox = (await close.boundingBox())!;
    expect(bounds.y).toBeGreaterThanOrEqual(closeBox.y + closeBox.height + 8);
  }
  await menu.getByRole("link", { name: "Home", exact: true }).focus();
  await page.screenshot({ path: ".impeccable/review/mobile-menu-neutral-text-200.png" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await page.evaluate(() => { document.documentElement.dir = "rtl"; });
  await page.getByRole("button", { name: "Open navigation", exact: true }).press("Enter");
  await expect(menu).toHaveAttribute("data-motion-state", "open");
  const rtlClose = (await close.boundingBox())!;
  const rtlPanel = (await menu.boundingBox())!;
  expect(rtlClose.x).toBeCloseTo(rtlPanel.x + 16, 0);
  await page.screenshot({ path: ".impeccable/review/mobile-menu-neutral-rtl.png" });
  await page.emulateMedia({ forcedColors: "active" });
  await expect(close).toHaveCSS("outline-style", "solid");
  await expect(close).toHaveCSS("outline-width", "2px");
  await page.screenshot({ path: ".impeccable/review/mobile-menu-neutral-forced-colors.png" });
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
});

test("Menu spring stays anchored, keeps text crisp, and reverses with its current velocity", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await visit(page, "/");
  const trigger = page.getByRole("button", { name: "Open navigation", exact: true });
  const source = (await trigger.boundingBox())!;
  await trigger.click();
  const menu = page.getByRole("dialog", { name: "Navigation", exact: true });
  const opening = await menu.evaluate(async element => {
    const frames = [];
    for (let i = 0; i < 8; i++) {
      await new Promise(requestAnimationFrame);
      const button = element.querySelector("button")!.getBoundingClientRect();
      const link = element.querySelector("a")!.getBoundingClientRect();
      frames.push({ p: Number((element as HTMLElement).dataset.menuProgress), x: button.x, y: button.y, width: button.width, textWidth: link.width });
    }
    return frames;
  });
  for (const frame of opening) {
    expect(frame.x).toBeCloseTo(source.x, 1);
    expect(frame.y).toBeCloseTo(source.y, 1);
    expect(frame.width).toBeCloseTo(source.width, 1);
    expect(frame.textWidth).toBeCloseTo(opening[0].textWidth, 1);
    expect(frame.p).toBeGreaterThan(0);
    expect(frame.p).toBeLessThanOrEqual(1);
  }
  await page.screenshot({ path: ".impeccable/review/mobile-menu-apple-opening.png" });
  await expect(menu).toHaveAttribute("data-motion-state", "open");
  await menu.getByRole("button", { name: "Close navigation" }).click();
  const reversal = await menu.evaluate(async element => {
    const read = () => ({ p: Number((element as HTMLElement).dataset.menuProgress), v: Number((element as HTMLElement).dataset.menuVelocity) });
    await new Promise(requestAnimationFrame);
    const before = read();
    element.querySelector<HTMLButtonElement>("button")!.click();
    // The retarget repaints before the next frame, so this reads the spring
    // that the reversal starts from rather than a fresh frame.
    const immediate = read();
    await new Promise(requestAnimationFrame);
    return { before, immediate, after: read() };
  });
  expect(reversal.before.v).toBeLessThan(0);
  // A reversal keeps the live progress and velocity. A remount would reset
  // both to zero and the next frame would snap the menu toward open.
  expect(reversal.immediate.p).toBe(reversal.before.p);
  expect(reversal.immediate.v).toBe(reversal.before.v);
  expect(Math.abs(reversal.after.p - reversal.before.p)).toBeLessThan(.25);
  await expect(menu).toHaveAttribute("data-motion-state", "open");
  // Reverse inside the page so the rapid close and reopen never race the
  // dialog unmounting between separate Playwright clicks.
  await menu.evaluate(async element => {
    const button = element.querySelector<HTMLButtonElement>("button")!;
    for (let i = 0; i < 3; i++) {
      button.click();
      await new Promise(requestAnimationFrame);
      button.click();
      await new Promise(requestAnimationFrame);
    }
  });
  await expect(menu).toHaveAttribute("data-motion-state", "open");
  await menu.getByRole("button", { name: "Close navigation" }).click();
  await menu.evaluate(async () => { for (let i = 0; i < 6; i++) await new Promise(requestAnimationFrame); });
  await page.screenshot({ path: ".impeccable/review/mobile-menu-apple-closing.png" });
  await expect(menu).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
