// Run: node tests/spotify-navigation.mjs /path/to/playwright/index.mjs [site-url]
import assert from "node:assert/strict";
const { chromium } = await import(process.argv[2] || "playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage();
  const errors = [];
  const spotifyRequests = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (/now-playing|api\.spotify\.com/.test(request.url()))
      spotifyRequests.push(request.url());
  });
  await page.clock.install();
  const response = await page.goto(process.argv[3] || "http://localhost:3001", {
    waitUntil: "domcontentloaded",
  });
  const paragraph = page.locator("#about > p").nth(1);
  const initial = await paragraph.innerText();
  assert(/currently listening to|I've been recognized/.test(initial));
  assert(
    (await response.text()).includes(
      initial.includes("currently listening")
        ? "currently listening to"
        : "been recognized",
    ),
    "initial server HTML must contain the final copy",
  );
  await page.clock.runFor(35000);
  await page.evaluate(() =>
    document.dispatchEvent(new Event("visibilitychange")),
  );
  assert.equal(
    await paragraph.innerText(),
    initial,
    "copy must stay unchanged after hydration and former polling interval",
  );
  const before = await paragraph.boundingBox();
  await page.locator('a[href="/projects/ut-dining"]').first().click();
  await page.waitForURL("**/projects/ut-dining");
  await page.goBack();
  await paragraph.waitFor();
  assert.equal(await paragraph.innerText(), initial);
  assert.equal((await paragraph.boundingBox()).height, before.height);
  await page.setViewportSize({ width: 390, height: 844 });
  assert(
    await paragraph.evaluate((e) => e.scrollWidth <= e.clientWidth),
    "copy must fit mobile",
  );
  assert.deepEqual(
    spotifyRequests,
    [],
    "Spotify must never be fetched in the browser",
  );
  assert.deepEqual(errors, []);
  console.log(
    "Server-rendered listening copy stays stable through hydration, navigation, and mobile layout.",
  );
} finally {
  await browser.close();
}
