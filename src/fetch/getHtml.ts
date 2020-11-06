import validator from "validator";
import axios, { AxiosResponse } from "axios";
import { setupPuppeteer } from "./puppeteer";

interface Options {
  kind: "puppeteer" | "axios";
  headless: boolean;
}

// Given a url, go and get the HTML. Specify either axios or puppeteer
export const getHtml = async (
  url: string,
  options?: Options
): Promise<string> => {
  if (!validator.isURL(url)) {
    throw new Error(`Url "${url}" is not valid`);
  }
  if (options?.kind === "puppeteer") {
    try {
      const { browser, page } = await setupPuppeteer(options.headless);
      await page.goto(url);
      const html = await page.evaluate(() => document.body.innerHTML);
      await browser.close();
      return html;
    } catch (err) {
      throw new Error(`Puppeteer could not go to ${url}`);
    }
  } else {
    let html: AxiosResponse<any>;
    try {
      html = await axios.get(url);
      if (html.status === 200) {
        return html.data;
      } else {
        throw new Error(`Server returned non-200 code: ${html.status}`);
      }
    } catch (err) {
      throw new Error(`Axios could not go to ${url}`);
    }
  }
};
