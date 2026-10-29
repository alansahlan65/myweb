import { expect, test, type Page } from "@playwright/test";

async function visit(page: Page, path = "/") {
  await page.goto(path);
  // data-hydrated is written by the blob's effect, so it proves the client
  // handlers exist. data-paused is server-rendered and cannot prove that.
  await expect(page.getByRole("button", { name: "Squish the blob buddy", includeHidden: true })).toHaveAttribute("data-hydrated", "true");
  await page.evaluate(() => document.fonts.ready);
}

test("Greeting clears the identity and the complete desktop Shelf fits with room for reveals", async ({ page }) => {
  for (const width of [1440, 1280, 1001]) {
    await page.setViewportSize({ width, height: 900 });
    await visit(page, "/about");
    const character = page.locator(".sidebar-character").getByRole("button", { name: "Say hello to Alan", exact: true });
    await character.hover();
    await expect(character).toHaveAttribute("data-greeting", "true");
    const bubble = character.locator('[data-character-part="greeting-bubble"]');
    await expect(bubble).toHaveCSS("opacity", "1");
    const bubbleBounds = (await bubble.boundingBox())!;
    const identity = (await page.locator(".identity").boundingBox())!;
    const rail = (await page.locator(".sidebar").boundingBox())!;
    expect(bubbleBounds.y).toBeGreaterThanOrEqual(identity.y + identity.height + 8);
    expect(bubbleBounds.x).toBeGreaterThanOrEqual(rail.x);
    expect(bubbleBounds.x + bubbleBounds.width).toBeLessThanOrEqual(rail.x + rail.width);
    const tail = await bubble.evaluate(element => {
      const box = element.getBoundingClientRect();
      const style = getComputedStyle(element, "::after");
      const left = box.left + parseFloat(style.left);
      const bottom = box.bottom - parseFloat(style.bottom);
      return { left, right: left + parseFloat(style.width), bottom };
    });
    expect(tail.left).toBeGreaterThanOrEqual(rail.x);
    expect(tail.right).toBeLessThanOrEqual(rail.x + rail.width);
    expect(tail.bottom).toBeLessThanOrEqual(rail.y + rail.height);
    const shelf = page.locator(".shelf");
    expect(await shelf.evaluate(element => element.scrollWidth <= element.clientWidth), `Shelf overflows at ${width}px`).toBe(true);
    const area = (await shelf.boundingBox())!;
    for (const cover of await page.locator(".shelf-cover").all()) {
      const bounds = (await cover.boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(area.x);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(area.x + area.width);
    }
    await page.screenshot({ path: `.impeccable/review/shelf-fit-${width}.png`, fullPage: true });
    const book = page.getByRole("button", { name: "The Witcher. Open the book cover.", exact: true });
    await book.press("Enter");
    await expect(book.locator(".open-book")).toHaveCSS("opacity", "1");
    const open = (await book.locator(".open-book").boundingBox())!;
    const bookArea = (await shelf.boundingBox())!;
    expect(open.x).toBeGreaterThanOrEqual(bookArea.x);
    expect(open.x + open.width).toBeLessThanOrEqual(bookArea.x + bookArea.width);
    expect(await shelf.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    await page.keyboard.press("Escape");
    const album = page.getByRole("button", { name: "505 by Arctic Monkeys. Reveal record.", exact: true });
    await album.press("Enter");
    await expect(album.locator(".album-information")).toHaveCSS("opacity", "1");
    await page.screenshot({ path: `.impeccable/review/shelf-album-active-${width}.png` });
    await page.keyboard.press("Escape");
  }
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/about"]) {
      await visit(page, route);
      if (route === "/about") {
        await expect(page.getByRole("button", { name: "Say hello to Alan", exact: true })).toHaveCount(0);
        continue;
      }
      const character = page.locator(".mobile-character").getByRole("button", { name: "Say hello to Alan", exact: true });
      await character.press("Enter");
      const bubble = character.locator('[data-character-part="greeting-bubble"]');
      await expect(bubble).toHaveCSS("opacity", "1");
      const bounds = (await bubble.boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(20);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width - 20);
      expect(bounds.y).toBeGreaterThanOrEqual(20);
      if (route === "/") {
        const overlap = await bubble.evaluate(element => {
          const box = element.getBoundingClientRect();
          const range = document.createRange();
          range.selectNodeContents(document.querySelector(".home-intro p")!);
          return [...range.getClientRects()].filter(rect => rect.left < box.right && rect.right > box.left && rect.top < box.bottom && rect.bottom > box.top).length;
        });
        expect(overlap, `Greeting covers introduction text at ${width}px`).toBe(0);
      }
      await page.screenshot({ path: `.impeccable/review/greeting-${route === "/" ? "home" : "about"}-${width}.png` });
      await page.keyboard.press("Escape");
    }
  }
});

test("Home and About fit desktop, tablet, and narrow mobile screens", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  for (const width of [1440, 1280, 1001, 1000, 768, 600, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/", "/about"]) {
      await visit(page, route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} at ${width}px`).toBe(true);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(route === "/" ? "Good design needs a little personality." : "Hi, I'm Alan!");
      await expect(page.getByRole("link", { name: "Projects", exact: true })).toHaveCount(0);
      if (route === "/" && width > 1000) {
        await expect(page.locator(".home-character")).toBeHidden();
        await expect(page.locator(".sidebar-character")).toBeVisible();
        await expect(page.getByRole("button", { name: "Say hello to Alan", exact: true })).toHaveCount(1);
      }
      if (width <= 1000) {
        const blob = (await page.getByRole("button", { name: "Squish the blob buddy" }).boundingBox())!;
        const identity = (await page.locator(".identity-copy").boundingBox())!;
        const menu = (await page.getByRole("button", { name: "Open navigation", exact: true }).boundingBox())!;
        expect(blob.x - identity.x - identity.width).toBeLessThanOrEqual(16);
        expect(blob.x + blob.width).toBeLessThan(menu.x);
        if (route === "/about") {
          await expect(page.getByRole("button", { name: "Say hello to Alan", exact: true })).toHaveCount(0);
          const portrait = (await page.locator(".personal-portrait").boundingBox())!;
          const introduction = (await page.locator(".about-introduction").boundingBox())!;
          expect(portrait.x).toBeGreaterThan(introduction.x + introduction.width / 2);
          expect(portrait.y).toBeCloseTo(introduction.y, 0);
          const overlaps = await page.locator(".about-introduction").evaluate(element => {
            const portrait = element.querySelector(".personal-portrait")!.getBoundingClientRect();
            return [...element.querySelectorAll("h1, p")].flatMap(copy => {
              const range = document.createRange(); range.selectNodeContents(copy);
              return [...range.getClientRects()].filter(box => box.left < portrait.right && box.right > portrait.left && box.top < portrait.bottom && box.bottom > portrait.top);
            }).length;
          });
          expect(overlaps, `About text overlaps portrait at ${width}px`).toBe(0);
        } else {
          await expect(page.locator(".sidebar-character")).toBeHidden();
          await expect(page.getByRole("button", { name: "Say hello to Alan", exact: true })).toHaveCount(1);
          const character = (await page.locator(".home-character").boundingBox())!;
          const text = (await page.locator(".home-intro").boundingBox())!;
          expect(character.x).toBeGreaterThanOrEqual(text.x + text.width + 12);
          expect(character.height).toBeGreaterThanOrEqual(168);
        }
      }
      if (width === 1440) await page.screenshot({ path: `docs/references/implementation-${route === "/" ? "home" : "about"}.png`, fullPage: true });
      if (width === 390) await page.screenshot({ path: `docs/references/implementation-${route === "/" ? "home" : "about"}-mobile.png`, fullPage: true });
      if ([1000, 768, 600, 390, 320].includes(width)) await page.screenshot({ path: `.impeccable/review/responsive-${route === "/" ? "home" : "about"}-${width}.png` });
    }
  }
  const resume = await page.request.get("/resume/alan-sahlan-resume.pdf");
  expect(resume.ok()).toBe(true);
  expect((await resume.body()).subarray(0, 4).toString()).toBe("%PDF");
  expect(errors).toEqual([]);
});

test("Portrait starts straight, tilts the whole print two degrees, and preserves its crop and layout", async ({ page, browser }) => {
  for (const width of [1440, 1001, 1000, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await visit(page, "/about");
    const trigger = page.getByRole("button", { name: "Portrait of Alan Sahlan. Yep, that's me.", exact: true });
    const print = trigger.locator(".portrait-print");
    const paper = trigger.locator(".portrait-paper");
    const photo = trigger.locator(".portrait-photo");
    const caption = trigger.locator(".portrait-caption");
    await trigger.scrollIntoViewIfNeeded();
    const hit = await trigger.boundingBox();
    const proportionalPhoto = await photo.locator("img").evaluate(img => {
      const image = img as HTMLImageElement;
      const style = getComputedStyle(image);
      return { renderedRatio: parseFloat(style.width) / parseFloat(style.height), naturalRatio: image.naturalWidth / image.naturalHeight };
    });
    expect(proportionalPhoto.renderedRatio).toBeCloseTo(proportionalPhoto.naturalRatio, 2);
    expect(hit!.width).toBe(width === 1440 ? 248 : width === 1001 ? 220 : width === 390 ? 128 : width === 320 ? 104 : 184);
    const crop = await photo.evaluate(e => ({ width: e.clientWidth, height: e.clientHeight, image: e.querySelector("img")!.getAttribute("style") }));
    const rotation = () => print.evaluate(e => { const m = new DOMMatrix(getComputedStyle(e).transform); return Math.atan2(m.b, m.a) * 180 / Math.PI; });
    expect(await rotation()).toBe(0);
    await expect(caption).toHaveCSS("opacity", "0");
    if (width === 1440) await trigger.screenshot({ path: "docs/references/portrait-straight.png" });
    await trigger.hover();
    await expect.poll(rotation, { timeout: 500, intervals: [16, 25, 40] }).toBeLessThan(-1.9);
    await expect(trigger).toHaveAttribute("data-settled", "true");
    expect(await rotation()).toBeCloseTo(-2, 2);
    await expect(photo).toHaveCSS("transform", "none");
    await expect(caption).toHaveCSS("opacity", "1");
    expect(await photo.evaluate(e => ({ width: e.clientWidth, height: e.clientHeight, image: e.querySelector("img")!.getAttribute("style") }))).toEqual(crop);
    expect(await trigger.boundingBox()).toEqual(hit);
    const paperBounds = (await paper.boundingBox())!;
    const captionBounds = (await caption.boundingBox())!;
    const shelfHeading = (await page.locator(".shelf-heading").boundingBox())!;
    expect(captionBounds.y + captionBounds.height).toBeLessThan(paperBounds.y + paperBounds.height);
    expect(paperBounds.x).toBeGreaterThan(0);
    expect(paperBounds.x + paperBounds.width).toBeLessThan(width);
    expect(paperBounds.y + paperBounds.height).toBeLessThan(shelfHeading.y);
    if (width === 1440 || width === 390 || width === 320) {
      await page.screenshot({ path: `docs/references/portrait-hover-${width}.png`, clip: { x: Math.floor(paperBounds.x - 12), y: Math.floor(paperBounds.y - 12), width: Math.ceil(paperBounds.width + 24), height: Math.ceil(paperBounds.height + 24) } });
    }
    // Reversing before settling must converge cleanly to the straight default.
    await page.mouse.move(0, 0); await trigger.hover(); await page.mouse.move(0, 0);
    await expect(trigger).toHaveAttribute("data-settled", "true");
    expect(await rotation()).toBe(0);
    await expect(caption).toHaveCSS("opacity", "0");
    await trigger.focus();
    await expect(caption).toHaveCSS("opacity", "1");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(print).toHaveCSS("transform", "none");
    await expect(caption).toHaveCSS("opacity", "1");
    await page.emulateMedia({ reducedMotion: "no-preference" });
  }
  const context = await browser.newContext({ baseURL: "http://127.0.0.1:3000", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobile = await context.newPage();
  await visit(mobile, "/about");
  const portrait = mobile.getByRole("button", { name: "Portrait of Alan Sahlan. Yep, that's me.", exact: true });
  await portrait.tap(); await expect(portrait).toHaveAttribute("aria-pressed", "true");
  await expect(portrait.locator(".portrait-caption")).toHaveCSS("opacity", "1");
  await portrait.tap(); await expect(portrait).toHaveAttribute("aria-pressed", "false");
  await expect(portrait.locator(".portrait-caption")).toHaveCSS("opacity", "0");
  await context.close();
});

test("Contact modal has working destinations, keyboard focus, copy feedback, and Escape dismissal", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await visit(page);
  const trigger = page.getByRole("button", { name: "Get in touch", exact: true }).first();
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Get in touch" });
  await expect(dialog).toBeVisible();
  const close = dialog.getByRole("button", { name: "Close contact dialog" });
  await expect(close).toBeFocused();
  await expect(dialog.getByRole("link", { name: "Email Alan", exact: true })).toHaveAttribute("href", "mailto:alansahlanwork@gmail.com");
  await expect(dialog.getByRole("link", { name: "WhatsApp Alan" })).toHaveAttribute("href", "https://wa.me/62881027208832");
  await expect(dialog.getByRole("link", { name: "Instagram", exact: true })).toHaveAttribute("href", "https://www.instagram.com/alannshln/");
  await expect(page.getByRole("button", { name: "Squish the blob buddy", includeHidden: true })).toHaveAttribute("data-paused", "true");
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("button", { name: "Copy email address" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.locator(".channel-tooltip")).toHaveText("Email Alan");
  await expect(page.locator(".channel-tooltip")).toBeVisible();
  await dialog.getByRole("button", { name: "Copy email address" }).click();
  await expect(dialog.getByRole("button", { name: "Email address copied" })).toBeVisible();
  await close.focus();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("Contact arrow pulls magnetically, squishes with a crisp icon, and keeps its click target fixed", async ({ page }) => {
  for (const route of ["/", "/about"]) {
    await visit(page, route);
    const panel = page.locator(".contact-panel");
    const trigger = panel.getByRole("button", { name: "Get in touch", exact: true });
    const magnet = panel.locator("[data-enhanced]");
    await trigger.scrollIntoViewIfNeeded();
    await expect(magnet).toHaveAttribute("data-enhanced", "true");
    const hit = (await trigger.boundingBox())!;
    const surface = magnet.locator("[data-gooey-svg]").locator("g > rect").first();
    await expect.poll(() => surface.getAttribute("width")).not.toBe("0");
    await page.mouse.move(hit.x + hit.width / 2 + 22, hit.y + hit.height / 2 - 14);
    await expect(magnet).toHaveAttribute("data-magnetic", "true");
    const body = magnet.locator("span[style*='translate3d']").first();
    await expect.poll(async () => (await body.boundingBox())!.x - hit.x).toBeGreaterThan(3);
    expect(await trigger.boundingBox()).toEqual(hit);
    const icon = trigger.locator("svg");
    await expect(icon).toHaveCSS("filter", "none");
    expect(await icon.evaluate(e => !!e.closest("[data-gooey-svg]"))).toBe(false);
    await page.screenshot({ path: `docs/references/contact-magnetic-${route === "/" ? "home" : "about"}.png` });
    await page.mouse.move(hit.x - 32, hit.y + hit.height / 2);
    await expect(magnet).toHaveAttribute("data-magnetic", "false");
    await expect(magnet).toHaveAttribute("data-settled", "true");
    await page.mouse.move(hit.x + hit.width / 2, hit.y + hit.height / 2);
    await page.mouse.down();
    await expect(magnet).toHaveAttribute("data-pressed", "true");
    await expect.poll(async () => (await body.boundingBox())!.height).toBeLessThan(hit.height * .92);
    expect(await trigger.boundingBox()).toEqual(hit);
    await page.screenshot({ path: `docs/references/contact-gooey-pressed-${route === "/" ? "home" : "about"}.png` });
    if (route === "/about") await panel.screenshot({ path: "docs/references/contact-magnetic-preview.png" });
    await page.mouse.up();
    const dialog = page.getByRole("dialog", { name: "Get in touch" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Close contact dialog" })).toBeFocused();
    await expect(magnet).toHaveAttribute("data-enhanced", "false");
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
  }
});

test("Magnetic pill keeps native cursors, its fixed target, and gooey feedback", async ({ page, browser }) => {
  await visit(page);
  const pill = page.locator(".sidebar-actions [data-variant='pill']");
  const trigger = pill.getByRole("button", { name: "Get in touch", exact: true });
  await expect(page.locator("[data-cursor]")).toHaveCount(0);
  await expect(trigger).toHaveCSS("cursor", "pointer");
  const hit = (await trigger.boundingBox())!;
  expect(hit.width).toBe(144);
  expect(hit.height).toBe(44);
  await expect(pill).toHaveAttribute("data-enhanced", "true");
  await page.mouse.move(hit.x + hit.width / 2 + 48, hit.y + hit.height / 2 - 8);
  await expect(pill).toHaveAttribute("data-magnetic", "true");
  expect(await trigger.boundingBox()).toEqual(hit);
  await expect(trigger).toHaveText("Get in touch");
  await expect(trigger).toHaveCSS("filter", "none");
  await expect(trigger.locator("svg")).toHaveCSS("filter", "none");
  const body = pill.locator("span[style*='translate3d']").first();
  await expect.poll(async () => (await body.boundingBox())!.x - hit.x).toBeGreaterThan(2);
  await page.screenshot({ path: "docs/references/magnetic-pill.png", clip: { x: Math.max(0, hit.x - 24), y: Math.max(0, hit.y - 32), width: hit.width + 48, height: hit.height + 112 } });
  await page.mouse.down();
  await expect(pill).toHaveAttribute("data-pressed", "true");
  await expect.poll(async () => (await body.boundingBox())!.height).toBeLessThan(hit.height * .94);
  expect(await trigger.boundingBox()).toEqual(hit);
  await page.mouse.up();
  const dialog = page.getByRole("dialog", { name: "Get in touch" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close contact dialog" })).toBeFocused();
  await expect(page.locator("html")).not.toHaveAttribute("data-custom-cursor", "true");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.keyboard.press("Tab");
  await page.getByRole("link", { name: "Know me better", exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator("[data-cursor]")).toHaveCount(0);
  await page.mouse.move(hit.x + hit.width / 2 + 40, hit.y + hit.height / 2);
  await expect(trigger).toHaveCSS("cursor", "pointer");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveAttribute("data-custom-cursor", "true");
  await expect(pill).toHaveAttribute("data-enhanced", "false");
  await page.emulateMedia({ reducedMotion: "no-preference", forcedColors: "active" });
  await page.mouse.move(700, 500);
  await expect(page.locator("[data-cursor]")).toHaveCount(0);

  const context = await browser.newContext({ baseURL: "http://127.0.0.1:3000", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobile = await context.newPage();
  await visit(mobile);
  await mobile.getByRole("button", { name: "Open navigation", exact: true }).tap();
  await mobile.locator(".sidebar-actions").getByRole("button", { name: "Get in touch", exact: true }).tap();
  await expect(mobile.getByRole("dialog", { name: "Get in touch" })).toBeVisible();
  await expect(mobile.locator("[data-cursor]")).toHaveCount(0);
  await expect(mobile.locator("html")).not.toHaveAttribute("data-custom-cursor", "true");
  await mobile.getByRole("button", { name: "Close contact dialog" }).tap();
  await expect(mobile.locator(".contact-modal")).toHaveCount(0);
  expect(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await mobile.screenshot({ path: "docs/references/magnetic-pill-mobile.png" });
  await context.close();
});

test("Magnetic contact arrow respects reduced motion, forced colors, and touch", async ({ page, browser }) => {
  await visit(page, "/about");
  const panel = page.locator(".contact-panel");
  const trigger = panel.getByRole("button", { name: "Get in touch", exact: true });
  const magnet = panel.locator("[data-enhanced]");
  await trigger.scrollIntoViewIfNeeded();
  await expect(magnet).toHaveAttribute("data-enhanced", "true");
  const hit = (await trigger.boundingBox())!;
  await page.mouse.move(hit.x + hit.width / 2 + 20, hit.y + hit.height / 2);
  await expect(magnet).toHaveAttribute("data-magnetic", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(magnet).toHaveAttribute("data-enhanced", "false");
  await expect(magnet.locator("[data-gooey-svg]")).toHaveCount(0);
  await page.mouse.move(hit.x + hit.width / 2 - 20, hit.y + hit.height / 2);
  await expect(magnet).toHaveAttribute("data-magnetic", "false");
  expect(await trigger.boundingBox()).toEqual(hit);
  await trigger.press("Enter");
  await expect(page.getByRole("dialog", { name: "Get in touch" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.emulateMedia({ reducedMotion: "no-preference", forcedColors: "active" });
  await expect(magnet).toHaveAttribute("data-enhanced", "false");
  await expect(trigger).toHaveCSS("forced-color-adjust", "auto");

  const context = await browser.newContext({ baseURL: "http://127.0.0.1:3000", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobile = await context.newPage();
  await visit(mobile, "/about");
  const mobilePanel = mobile.locator(".contact-panel");
  const mobileTrigger = mobilePanel.getByRole("button", { name: "Get in touch", exact: true });
  await mobileTrigger.scrollIntoViewIfNeeded();
  expect((await mobileTrigger.boundingBox())!.width).toBe(48);
  await mobileTrigger.tap();
  await expect(mobile.getByRole("dialog", { name: "Get in touch" })).toBeVisible();
  await expect(mobilePanel.locator("[data-enhanced]")).toHaveAttribute("data-magnetic", "false");
  await mobile.getByRole("button", { name: "Close contact dialog" }).tap();
  await expect(mobile.getByRole("dialog", { name: "Get in touch" })).not.toBeVisible();
  expect(await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await mobile.screenshot({ path: "docs/references/contact-magnetic-mobile.png" });
  await context.close();
});

test("Laptop sidebars keep contact actions and the blob fully visible", async ({ page }) => {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 1280, height: 720 }, { width: 1024, height: 768 }, { width: 1001, height: 768 }]) {
    await page.setViewportSize(viewport);
    await visit(page, "/about");
    const sidebar = page.locator(".sidebar");
    expect(await sidebar.evaluate(e => e.scrollHeight <= e.clientHeight)).toBe(true);
    await expect(sidebar.getByRole("button", { name: "Get in touch", exact: true })).toBeInViewport({ ratio: 1 });
    await expect(sidebar.getByRole("link", { name: "See my resume", exact: true })).toBeInViewport({ ratio: 1 });
    const identity = await page.locator(".identity").boundingBox();
    const blob = await page.getByRole("button", { name: "Squish the blob buddy" }).boundingBox();
    expect(blob!.x + blob!.width).toBeLessThanOrEqual(identity!.x + identity!.width);
  }
});

test("Contact stays within a short viewport and scrolls to keyboard-focused controls", async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 240 });
  await visit(page);
  await page.getByRole("button", { name: "Open navigation", exact: true }).click();
  const trigger = page.getByRole("button", { name: "Get in touch", exact: true }).first();
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Get in touch" });
  await expect(dialog).toBeVisible();
  const bounds = await dialog.boundingBox();
  expect(bounds!.y).toBeGreaterThanOrEqual(16);
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(224);
  await page.keyboard.press("Shift+Tab");
  const copy = dialog.getByRole("button", { name: "Copy email address" });
  await expect(copy).toBeFocused();
  await expect(copy).toBeInViewport({ ratio: 1 });
  await page.keyboard.press("Tab");
  const close = dialog.getByRole("button", { name: "Close contact dialog" });
  await expect(close).toBeFocused();
  await expect(close).toBeInViewport({ ratio: 1 });
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.getByRole("dialog", { name: "Navigation", exact: true })).toBeVisible();
});

test("Shelf mouse reveals persist on click and quote tooltips follow, clamp, and dismiss", async ({ page }) => {
  await visit(page, "/about");
  const album = page.getByRole("button", { name: "505 by Arctic Monkeys. Reveal record.", exact: true });
  await album.hover();
  await expect(album).toHaveAttribute("data-active", "true");
  await album.click();
  await expect(album).toHaveAttribute("data-active", "true");
  const game = page.getByRole("button", { name: "Read a quote from Red Dead Redemption 2", exact: true });
  await game.hover();
  const tooltip = page.getByRole("tooltip");
  await expect(tooltip).toContainText("Take a gamble that love exists");
  const first = await tooltip.boundingBox();
  const cover = await game.boundingBox();
  expect(first).not.toBeNull(); expect(cover).not.toBeNull();
  await page.mouse.move(cover!.x + cover!.width / 2 + 16, cover!.y + cover!.height / 2 + 8);
  await expect.poll(async () => (await tooltip.boundingBox())?.x).not.toBe(first!.x);
  const bounds = await tooltip.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(16);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(1424);
  await page.keyboard.press("Escape");
  await expect(tooltip).toHaveCount(0);
  await page.mouse.move(cover!.x + cover!.width / 2 + 18, cover!.y + cover!.height / 2);
  await expect(tooltip).toHaveCount(0);
  const book = page.getByRole("button", { name: "The Witcher. Open the book cover.", exact: true });
  await book.hover();
  await expect(book).toHaveAttribute("data-active", "true");
  await expect(book.locator(".open-book")).toHaveCSS("opacity", "1");
  await expect(tooltip).toContainText("The world doesn’t need a hero. It needs a professional.");
  await expect(tooltip).toContainText("Geralt of Rivia");
  // A live preference change must anchor an already-open pointer quote.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(tooltip.locator(".quote-surface")).toHaveCSS("animation-name", "none");
  await expect.poll(async () => {
    const artwork = await book.locator(".open-book").boundingBox();
    const popup = await tooltip.boundingBox();
    return Math.abs(artwork!.y - popup!.y - popup!.height - 20);
  }).toBeLessThan(1);
  const anchored = (await tooltip.boundingBox())!;
  const tailPosition = await tooltip.locator(".quote-tail").boundingBox();
  const bookBounds = (await book.boundingBox())!;
  await page.mouse.move(bookBounds.x + bookBounds.width / 2 + 20, bookBounds.y + bookBounds.height / 2 + 16);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  expect(await tooltip.boundingBox()).toEqual(anchored);
  expect(await tooltip.locator(".quote-tail").boundingBox()).toEqual(tailPosition);
  await page.screenshot({ path: ".impeccable/review/reduced-motion.png" });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect.poll(async () => (await tooltip.boundingBox())?.y).not.toBe(anchored.y);
});

test("Shelf re-arms hover after smooth scrolling settles under a resting pointer", async ({ page }) => {
  await visit(page, "/about");
  const game = page.getByRole("button", { name: "Read a quote from Red Dead Redemption 2", exact: true });
  await game.hover();
  await expect(game).toHaveAttribute("data-active", "true");
  const tooltip = page.getByRole("tooltip");
  await expect(tooltip).toContainText("Take a gamble that love exists");
  // A small scroll keeps the pointer inside the item while Lenis eases. The
  // reveal must come back on its own instead of waiting for a fresh enter.
  await page.mouse.wheel(0, 40);
  await page.waitForTimeout(250);
  await expect(tooltip).toHaveCount(0);
  await expect(tooltip).toContainText("Take a gamble that love exists", { timeout: 4000 });
  await expect(game).toHaveAttribute("data-active", "true");
});

test("Shelf quotes use Geist and all reveal artwork has room inside the scroll area", async ({ page }) => {
  const quotes = [
    { name: "Read a quote from Red Dead Redemption 2", text: "Take a gamble that love exists and do a loving act.", author: "Sister Calderón, to Arthur Morgan", id: "rdr2" },
    { name: "Read a quote from Inception", text: "You mustn’t be afraid to dream a little bigger, darling.", author: "Eames", id: "inception" },
    { name: "The Witcher. Open the book cover.", text: "The world doesn’t need a hero. It needs a professional.", author: "Geralt of Rivia", id: "witcher" },
  ];
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 809, height: 884 }, { width: 390, height: 844 }, { width: 320, height: 844 }, { width: 640, height: 240 }]) {
    await page.setViewportSize(viewport);
    await visit(page, "/about");
    const shelf = page.locator(".shelf");
    for (const quote of quotes) {
      const trigger = page.getByRole("button", { name: quote.name, exact: true });
      await trigger.press("Enter");
      const tooltip = page.getByRole("tooltip");
      await expect(tooltip.locator("p")).toHaveText(`“${quote.text}”`);
      await expect(tooltip.locator(".quote-author")).toHaveText(quote.author);
      await expect(tooltip.locator(".quote-surface")).toHaveCSS("opacity", "1");
      await expect.poll(() => tooltip.evaluate(e => e.getAnimations({ subtree: true }).filter(a => a.playState === "running").length)).toBe(0);
      expect(await tooltip.evaluate(e => getComputedStyle(e).fontFamily)).toContain("Geist");
      const bounds = await tooltip.boundingBox();
      const size = await page.evaluate(() => ({ width: document.documentElement.clientWidth, height: innerHeight }));
      expect(bounds!.x).toBeGreaterThanOrEqual(23.5);
      expect(bounds!.y).toBeGreaterThanOrEqual(23.5);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(size.width - 23.5);
      expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(size.height - 23.5);
      const tail = await tooltip.locator(".quote-tail").boundingBox();
      expect(tail!.x).toBeGreaterThanOrEqual(bounds!.x);
      expect(tail!.x + tail!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width);
      expect(tail!.y).toBeGreaterThanOrEqual(bounds!.y);
      expect(tail!.y + tail!.height).toBeLessThanOrEqual(bounds!.y + bounds!.height);
      expect(await tooltip.locator("p").evaluate(e => e.getBoundingClientRect().height / parseFloat(getComputedStyle(e).lineHeight))).toBeLessThanOrEqual(3.1);
      if (quote.id === "witcher") {
        const area = await shelf.boundingBox();
        const book = await trigger.locator(".open-book").boundingBox();
        expect(book!.x).toBeGreaterThanOrEqual(area!.x);
        expect(book!.y).toBeGreaterThanOrEqual(area!.y);
        expect(book!.x + book!.width).toBeLessThanOrEqual(area!.x + area!.width);
        expect(book!.y + book!.height).toBeLessThanOrEqual(area!.y + area!.height);
        const capture = viewport.width === 1440 ? "desktop" : viewport.width === 390 ? "mobile" : `user-${viewport.width}`;
        await page.screenshot({ path: `.impeccable/review/${capture}.png` });
      }
      if (viewport.width === 1440) {
        await expect.poll(async () => {
          const artwork = await trigger.locator(quote.id === "witcher" ? ".open-book" : ".shelf-cover").boundingBox();
          const popup = await tooltip.boundingBox();
          return artwork!.y - popup!.y - popup!.height;
        }).toBeGreaterThanOrEqual(19.5);
        await page.screenshot({ path: `docs/references/quote-${quote.id}.png`, clip: { x: Math.max(0, bounds!.x - 16), y: Math.max(0, bounds!.y - 16), width: bounds!.width + 32, height: bounds!.height + 32 } });
        if (quote.id === "witcher") {
          await page.screenshot({ path: "docs/references/shelf-witcher-hover.png", fullPage: true });
          const area = (await shelf.boundingBox())!;
          const popup = (await tooltip.boundingBox())!;
          const top = Math.max(0, Math.min(area.y, popup.y) - 16);
          await page.screenshot({ path: "docs/references/shelf-hover-detail.png", clip: { x: area.x - 16, y: top, width: area.width + 32, height: area.y + area.height + 24 - top } });
        }
      }
      await page.keyboard.press("Escape");
      await expect(tooltip).toHaveCount(0);
    }
    for (const album of await page.locator(".shelf-album").all()) {
      await album.press("Enter");
      await expect(album.locator(".album-information")).toHaveCSS("opacity", "1");
      const area = await shelf.boundingBox();
      for (const selector of [".vinyl-record", ".album-information"]) {
        const bounds = await album.locator(selector).boundingBox();
        expect(bounds!.x).toBeGreaterThanOrEqual(area!.x);
        expect(bounds!.y).toBeGreaterThanOrEqual(area!.y);
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(area!.x + area!.width);
        expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(area!.y + area!.height);
      }
      await page.keyboard.press("Escape");
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("Keyboard navigation reveals Shelf items as they scroll into view", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 600 });
  await visit(page, "/about");
  await page.getByRole("button", { name: "Portrait of Alan Sahlan. Yep, that's me.", exact: true }).focus();
  await page.keyboard.press("Tab");
  const album = page.getByRole("button", { name: "505 by Arctic Monkeys. Reveal record.", exact: true });
  await expect(album).toBeFocused();
  await expect(album).toHaveAttribute("data-active", "true");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const game = page.getByRole("button", { name: "Read a quote from Red Dead Redemption 2", exact: true });
  await expect(game).toBeFocused();
  await expect(page.getByRole("tooltip")).toContainText("Take a gamble that love exists");
  await expect(page.getByRole("tooltip")).toBeInViewport();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("tooltip")).toHaveCount(0);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("tooltip")).toContainText("dream a little bigger");
});

test("Touch reveals toggle, mobile navigation works, and reduced motion stays calm", async ({ browser }) => {
  const context = await browser.newContext({ baseURL: "http://127.0.0.1:3000", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await visit(page, "/about");
  const album = page.getByRole("button", { name: "505 by Arctic Monkeys. Reveal record.", exact: true });
  await album.tap(); await expect(album).toHaveAttribute("data-active", "true");
  await album.tap(); await expect(album).toHaveAttribute("data-active", "false");
  const secondAlbum = page.getByRole("button", { name: "Mr. Brightside by The Killers. Reveal record.", exact: true });
  await secondAlbum.tap();
  await expect(secondAlbum).toHaveAttribute("data-active", "true");
  const shelfBounds = await page.locator(".shelf").boundingBox();
  const vinylBounds = await secondAlbum.locator(".vinyl-record").boundingBox();
  expect(vinylBounds!.x + vinylBounds!.width).toBeLessThanOrEqual(shelfBounds!.x + shelfBounds!.width);
  const book = page.getByRole("button", { name: "The Witcher. Open the book cover.", exact: true });
  await book.tap();
  await expect(page.getByRole("tooltip")).toContainText("Geralt of Rivia");
  const openBookBounds = await book.locator(".open-book").boundingBox();
  const bookShelfBounds = await page.locator(".shelf").boundingBox();
  expect(openBookBounds!.x).toBeGreaterThanOrEqual(bookShelfBounds!.x);
  expect(openBookBounds!.x + openBookBounds!.width).toBeLessThanOrEqual(bookShelfBounds!.x + bookShelfBounds!.width);
  await book.tap();
  await expect(page.getByRole("tooltip")).toHaveCount(0);
  const game = page.getByRole("button", { name: "Read a quote from Red Dead Redemption 2", exact: true });
  await game.tap();
  await expect(page.getByRole("tooltip")).toBeVisible();
  const bounds = await page.getByRole("tooltip").boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(16);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(374);
  await page.getByRole("heading", { level: 1 }).tap();
  await expect(page.getByRole("tooltip")).toHaveCount(0);
  await page.getByRole("button", { name: "Open navigation" }).tap();
  await page.getByRole("link", { name: "Home", exact: true }).tap();
  await expect(page).toHaveURL("http://127.0.0.1:3000/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Good design needs a little personality.");
  await expect(page.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const blob = page.getByRole("button", { name: "Squish the blob buddy" });
  await expect(blob).toHaveAttribute("data-paused", "true");
  expect(await blob.evaluate(e => e.getAnimations({ subtree: true }).filter(a => a.playState === "running").length)).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(blob).toHaveAttribute("data-paused", "false");
  expect(await blob.evaluate(e => e.getAnimations({ subtree: true }).filter(a => a.playState === "running").length)).toBeGreaterThan(0);
  await blob.tap();
  await expect(blob).toHaveAttribute("data-reaction", "jelly");
  await expect(blob).toHaveAttribute("data-reaction", "idle");
  expect(errors).toEqual([]);
  await context.close();
});

test("Blob tracks only within its response range and interrupted presses settle", async ({ page }) => {
  await visit(page);
  const blob = page.getByRole("button", { name: "Squish the blob buddy" });
  await expect(blob).toHaveAttribute("data-paused", "false");
  const bounds = await blob.boundingBox();
  const center = { x: bounds!.x + bounds!.width / 2, y: bounds!.y + bounds!.height / 2 };
  await page.mouse.move(center.x + 120, center.y + 10);
  await expect(blob).toHaveAttribute("data-mode", "tracking");
  await expect.poll(async () => blob.evaluate(e => e.querySelector("svg > g")?.getAttribute("transform"))).not.toBe("translate(0 0)");
  await page.mouse.move(center.x + 350, center.y);
  await expect(blob).toHaveAttribute("data-mode", "idle");
  for (let i = 0; i < 3; i++) await blob.click();
  await expect(blob).toHaveAttribute("data-reaction", "curious");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(blob).toHaveAttribute("data-paused", "true");
  expect(await blob.evaluate(e => e.getAnimations({ subtree: true }).filter(a => a.playState === "running").length)).toBe(0);
});

test("Blob compresses while held, rebounds like jelly, and stops behind a modal", async ({ page }) => {
  await visit(page);
  const blob = page.getByRole("button", { name: "Squish the blob buddy", includeHidden: true });
  await blob.hover();
  await expect(blob).toHaveAttribute("data-reaction", "curious");
  const hitArea = await blob.boundingBox();
  const body = blob.locator("path");
  const resting = await body.boundingBox();
  await page.mouse.down();
  await expect(blob).toHaveAttribute("data-reaction", "pressed");
  await expect.poll(async () => (await body.boundingBox())!.height).toBeLessThan(resting!.height * .84);
  expect(await blob.boundingBox()).toEqual(hitArea);
  await page.screenshot({ path: "docs/references/blob-pressed.png", clip: { x: 24, y: 24, width: 300, height: 104 } });
  await page.mouse.up();
  await expect(blob).toHaveAttribute("data-reaction", "jelly");
  await expect.poll(async () => (await body.boundingBox())!.height, { intervals: [16, 32, 50] }).toBeGreaterThan(resting!.height * 1.03);
  await page.screenshot({ path: "docs/references/blob-rebound.png", clip: { x: 24, y: 24, width: 300, height: 104 } });
  await expect(blob).toHaveAttribute("data-reaction", "curious");
  await page.mouse.down();
  await expect(blob).toHaveAttribute("data-reaction", "pressed");
  await blob.dispatchEvent("pointercancel", { pointerId: 1, pointerType: "mouse" });
  await page.mouse.up();
  await expect(blob).toHaveAttribute("data-reaction", "curious");
  // Sample every frame instead of polling for a label that only lasts a few
  // hundred milliseconds, so a slow assertion start cannot miss Jelly.
  const keyboardReactions = await blob.evaluate(async element => {
    const seen: string[] = [];
    const record = () => {
      const reaction = element.dataset.reaction!;
      if (seen[seen.length - 1] !== reaction) seen.push(reaction);
    };
    record();
    element.dispatchEvent(new KeyboardEvent("keydown", { key: " ", bubbles: true }));
    await new Promise(requestAnimationFrame);
    record();
    element.dispatchEvent(new KeyboardEvent("keyup", { key: " ", bubbles: true }));
    for (let frame = 0; frame < 40; frame++) {
      await new Promise(requestAnimationFrame);
      record();
    }
    return seen;
  });
  expect(keyboardReactions).toContain("pressed");
  expect(keyboardReactions).toContain("jelly");
  await page.getByRole("button", { name: "Get in touch", exact: true }).first().click();
  await expect(blob).toHaveAttribute("data-paused", "true");
  await expect(blob).toHaveAttribute("data-reaction", "idle");
  expect(await blob.evaluate(e => e.getAnimations({ subtree: true }).filter(a => a.playState === "running").length)).toBe(0);
});

test("Alan's waving hand stays inside the visible character at every layout size", async ({ page }) => {
  for (const { width, route } of [{ width: 320, route: "/" }, { width: 390, route: "/" }, { width: 768, route: "/" }, { width: 1000, route: "/" }, { width: 1440, route: "/" }, { width: 1440, route: "/about" }]) {
    await page.setViewportSize({ width, height: 1000 });
    await visit(page, route);
    const character = page.locator(width > 1000 ? ".sidebar-character" : ".mobile-character").getByRole("button", { name: "Say hello to Alan", exact: true });
    if (width > 1000) await character.hover();
    else await character.press("Enter");
    await expect(character).toHaveAttribute("data-greeting", "true");
    await expect(character.locator('[data-character-part="wave-arm"]')).toHaveCSS("opacity", "1");
    const clipped = await character.evaluate(root => {
      const image = root.querySelector<HTMLImageElement>('[data-character-part="wave-arm"] img')!;
      const imageBounds = image.getBoundingClientRect();
      // Visible finger, palm, and wrist points in the supplied 1122 by 1402 artwork.
      const hand = [{ x: 250, y: 420 }, { x: 285, y: 460 }, { x: 300, y: 520 }].map(p => ({
        x: imageBounds.left + imageBounds.width * p.x / 1122,
        y: imageBounds.top + imageBounds.height * p.y / 1402,
      }));
      const clippedPoints: { x: number; y: number; container: string }[] = [];
      for (let element = image.parentElement; element && element !== root.parentElement; element = element.parentElement) {
        const style = getComputedStyle(element);
        const bounds = element.getBoundingClientRect();
        for (const point of hand) {
          const clipX = /hidden|clip|auto|scroll/.test(style.overflowX) && (point.x < bounds.left || point.x > bounds.right);
          const clipY = /hidden|clip|auto|scroll/.test(style.overflowY) && (point.y < bounds.top || point.y > bounds.bottom);
          if (clipX || clipY) clippedPoints.push({ ...point, container: element.className });
        }
      }
      return clippedPoints;
    });
    expect(clipped, `${route} at ${width}px clips the waving hand`).toEqual([]);
    if (width > 1000) await page.mouse.move(1000, 20);
    else await page.keyboard.press("Escape");
    await expect(character).toHaveAttribute("data-greeting", "false");
    await expect(character.locator('[data-character-part="rest-arm"]')).toHaveCSS("opacity", "1");
  }
});
