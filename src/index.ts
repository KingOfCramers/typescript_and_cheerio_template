import "./config.ts";
import { logErrorAndExit } from "./loggers";
import { getHtml } from "./fetch/getHtml";
import { Parser } from "./Parser";

//@ts-ignore
const extractLinksFromHtml = async (str: string): Promise<string[]> => {
  try {
    const html = await getHtml(str, { kind: "puppeteer", headless: true });
    const parser = new Parser(html);
    const links = parser.getLinks({ onlyUnique: true });
    return links;
  } catch (err) {
    logErrorAndExit(err);
  }
};

extractLinksFromHtml("https://www.masamicooks.com").then((res) =>
  console.log(res.length)
);
