import puppeteer from "puppeteer";

interface BrowserAndPage {
  browser: puppeteer.Browser;
  page: puppeteer.Page;
}
// This function sets up a puppeteer browser and returns it
export const setupPuppeteer = async (
  headless: boolean
): Promise<BrowserAndPage> => {
  const args = ["--no-sandbox", "--unlimited-storage"];

  const browser = await puppeteer.launch({
    headless: process.env.NODE_ENV === "production" || headless,
    defaultViewport: null,
    devtools: process.env.NODE_ENV !== "production",
    args,
  });

  const page = await browser.newPage();
  return { browser, page };
};
