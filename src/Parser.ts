import cheerio from "cheerio";
import { isString } from "./TypeCheckers";
import unique from "./util/unique";

interface GetLinksOpts {
  onlyUnique?: boolean;
}
export class Parser {
  root: cheerio.Root;
  links: string[] = [];

  constructor(html: string) {
    this.root = cheerio.load(html);
  }

  getTexts(query: string): string[] {
    const res = this.root(query).toArray();
    return res.map((x) => cheerio(x).text());
  }

  getLinks(opts: GetLinksOpts): string[] {
    const links = this.root("a")
      .toArray()
      .map((x) => this.root(x).attr("href"))
      .filter((x): x is string => isString(x));
    return opts.onlyUnique ? unique(links) : links;
  }
}
