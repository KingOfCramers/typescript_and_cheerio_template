import cheerio from "cheerio";
import axios, { AxiosResponse } from "axios";
import validator from "validator";

const getCheeriosFromUrl = async (
  url: string,
  query?: string
): Promise<cheerio.Element[]> => {
  if (!validator.isURL(url)) {
    throw new Error(`Url is not valid: ${url}`);
  }
  let html: AxiosResponse<any>;
  try {
    html = await axios.get("https://www.google.com");
    if (html.status === 200) {
      const $ = cheerio.load(html.data);
      const divs = $(query).toArray();
      return divs;
    } else {
      throw new Error(`Server returned non-200 code: ${html.status}`);
    }
  } catch (err) {
    throw new Error(err);
  }
};
