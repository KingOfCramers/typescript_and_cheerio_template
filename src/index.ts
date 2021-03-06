import "./config.ts";
import { logError } from "./loggers";
import { getHtml } from "./fetch/getHtml";
import { Parser } from "./Parser";

const extractLinksFromHtml = async (url: string): Promise<string[]> => {
  try {
    const html = await getHtml(url, { kind: "puppeteer", headless: true });
    const parser = new Parser(html);
    parser.discriminate("div.font-bold"); // Set to only search within div.font-bold tags...
    const links = parser.getLinks({ onlyUnique: true, limit: 5 });
    return links;
  } catch (err) {
    logError(err);
    process.exit(1);
  }
};

extractLinksFromHtml("https://www.masamicooks.com").then((res) =>
  console.log(res)
);
