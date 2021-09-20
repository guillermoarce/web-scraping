const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 40});
    const page = await browser.newPage();
    await page.goto('https://google.com');
    await page.type('[name="q"]', "salgo del laja");
    await page.click("body");
    await page.click('input[name="btnK"]');
    await page.waitForSelector("#result-stats");
    await page.click("#hdtb-msb-vis > div:nth-child(2) > a");
    await page.waitForSelector("#is-results");
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    await page.screenshot({ path: "salto_angel.png"});
    await browser.close();
})();