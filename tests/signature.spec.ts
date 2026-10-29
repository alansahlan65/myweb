import { expect, test } from "@playwright/test";

test("Alan signature writes once on arrival without shifting or clipping its sign-off", async ({ page }) => {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/about");
    const signature = page.locator('[data-signature="alan"]');
    await expect(signature).toHaveAttribute("data-writing", "waiting");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Hi, I'm Alan!");
    await expect(signature).toContainText("Alan");
    const before = (await signature.boundingBox())!;
    const next = (await page.locator(".contact-panel").boundingBox())!;
    await page.evaluate(top => window.scrollTo({ top, behavior: "instant" }), before.y - 900 + 20);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await expect(signature).toHaveAttribute("data-writing", "waiting");
    await signature.scrollIntoViewIfNeeded();
    await expect(signature).toHaveAttribute("data-writing", "writing");
    if (width === 1440) {
      for (const time of [0, 600, 1300, 1860]) {
        await signature.evaluate((element, time) => {
          for (const animation of element.getAnimations({ subtree: true })) { animation.pause(); animation.currentTime = time; }
        }, time);
        await signature.screenshot({ path: `.impeccable/review/alan-signature-stage-${time}.png` });
      }
      await signature.evaluate(element => { for (const animation of element.getAnimations({ subtree: true })) animation.play(); });
    }
    await expect(signature).toHaveAttribute("data-writing", "complete");
    expect(await signature.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
    const after = (await signature.boundingBox())!;
    expect(after.width).toBe(before.width);
    expect(after.height).toBe(before.height);
    expect(after.x).toBeGreaterThanOrEqual(20);
    expect(after.x + after.width).toBeLessThanOrEqual(width - 20);
    const following = (await page.locator(".contact-panel").boundingBox())!;
    expect(following.y - after.y).toBeCloseTo(next.y - before.y, 0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator(".personal-closing").screenshot({ path: `.impeccable/review/alan-signature-${width}.png` });
    await page.getByRole("heading", { level: 1 }).scrollIntoViewIfNeeded();
    await signature.scrollIntoViewIfNeeded();
    await expect(signature).toHaveAttribute("data-writing", "complete");
    expect(await signature.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
  }
});

test("Alan signature stays readable with reduced motion, live preference changes, and no JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ baseURL: "http://127.0.0.1:3000", viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/about");
  const signature = page.locator('[data-signature="alan"]');
  await expect(signature).toHaveAttribute("data-writing", "complete");
  await signature.scrollIntoViewIfNeeded();
  expect(await signature.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("heading", { level: 1 }).scrollIntoViewIfNeeded();
  await page.reload();
  await expect(signature).toHaveAttribute("data-writing", "waiting");
  await signature.scrollIntoViewIfNeeded();
  await expect(signature).toHaveAttribute("data-writing", "writing");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(signature).toHaveAttribute("data-writing", "complete");
  expect(await signature.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
  await context.close();
  const staticContext = await browser.newContext({ baseURL: "http://127.0.0.1:3000", javaScriptEnabled: false });
  const staticPage = await staticContext.newPage();
  await staticPage.goto("/about");
  const staticSignature = staticPage.locator('[data-signature="alan"]');
  await expect(staticSignature).toContainText("Alan");
  await expect(staticSignature.locator("svg")).toBeVisible();
  expect(await staticSignature.locator("rect").evaluateAll(elements => elements.every(element => getComputedStyle(element).transform === "none"))).toBe(true);
  await staticContext.close();
});
