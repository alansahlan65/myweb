import { expect, test } from "@playwright/test";

test("Sidebar controls swap positions smoothly when the rail compacts", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const collapse = page.getByRole("button", { name: "Collapse sidebar", exact: true });
  const theme = page.getByRole("button", { name: "Dark mode", exact: true });

  const expandedToggle = (await collapse.boundingBox())!;
  const expandedTheme = (await theme.boundingBox())!;
  expect(expandedToggle.y).toBeCloseTo(expandedTheme.y, 0);
  expect(expandedToggle.x).toBeLessThan(expandedTheme.x);

  const samplesPromise = page.evaluate(() => new Promise<{ toggle: DOMRect; theme: DOMRect }[]>(resolve => {
    const root = document.querySelector(".site-shell")!;
    const toggle = document.querySelector(".sidebar-toggle")!;
    const theme = document.querySelector(".sidebar-controls > .theme-toggle")!;
    const samples: { toggle: DOMRect; theme: DOMRect }[] = [];

    function sample() {
      samples.push({
        toggle: toggle.getBoundingClientRect(),
        theme: theme.getBoundingClientRect(),
      });
      if (root.getAttribute("data-sidebar-motion") === "settled"
        && root.getAttribute("data-sidebar-state") === "compact") {
        resolve(samples);
      } else {
        requestAnimationFrame(sample);
      }
    }

    requestAnimationFrame(sample);
  }));
  await collapse.click();
  const samples = await samplesPromise;

  expect(samples.length).toBeGreaterThan(5);
  for (const { toggle, theme: themeBox } of samples) {
    const separated = toggle.right <= themeBox.left
      || themeBox.right <= toggle.left
      || toggle.bottom <= themeBox.top
      || themeBox.bottom <= toggle.top;
    expect(separated).toBe(true);
    // The pressed control holds its vertical place while the rail rearranges
    // around it. Only the theme button travels.
    expect(Math.abs(toggle.y - expandedToggle.y)).toBeLessThan(1);
  }

  const compactToggle = samples[samples.length - 1].toggle;
  const compactTheme = samples[samples.length - 1].theme;
  expect(compactTheme.x).toBeCloseTo(compactToggle.x, 0);
  expect(compactTheme.y).toBeLessThan(compactToggle.y);
});
