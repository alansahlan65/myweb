const { chromium } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  const page = await browser.newPage();
  const data = fs.readFileSync('C:/Users/DESKTOP-IOT0021/Videos/Screen Recordings/Screen Recording 2026-10-26 165935.mp4').toString('base64');
  await page.setContent(`<video muted preload="auto" src="data:video/mp4;base64,${data}"></video>`);
  await page.waitForFunction(() => document.querySelector('video').readyState >= 2);
  const metadata = await page.evaluate(() => {
    const video = document.querySelector('video'); video.pause();
    return { duration: video.duration, width: video.videoWidth, height: video.videoHeight };
  });
  console.log(JSON.stringify(metadata));
  for (const fraction of [0, .12, .25, .4, .6, .8, .98]) {
    const png = await page.evaluate(async time => {
      const video = document.querySelector('video');
      if (Math.abs(video.currentTime - time) > .001) await new Promise(resolve => { video.addEventListener('seeked', resolve, { once: true }); video.currentTime = time; });
      const canvas = document.createElement('canvas'); canvas.width = video.videoWidth; canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      return canvas.toDataURL('image/png').split(',')[1];
    }, metadata.duration * fraction);
    fs.writeFileSync(path.join('.impeccable/review', `signature-reference-${String(fraction).replace('.', '-')}.png`), Buffer.from(png, 'base64'));
  }
  await browser.close();
})();
