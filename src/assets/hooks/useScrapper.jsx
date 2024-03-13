import puppeteer from "puppeteer";

export const useScrapper = async ({ url }) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://twitter.com/MihirkJha/status/1767581277090451849");

    const test = await page.evaluate(() => {
        const tweet = document.querySelector(
            `article.css-175oi2r.r-18u37iz.r-1udh08x.r-i023vh.r-1qhn6m8.r-1ny4l3l[tabindex="-1"][data-testid="tweet"]`
        );

        console.log(tweet);
    });
    await browser.close();
};
