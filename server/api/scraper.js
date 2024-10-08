import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { insertRuling } from "../sql/courtRulingQuerry.js";
import { classifyCase, getCaseSummary, getProcedureStartDate, getDateOfLimitationsOnTaxLiability } from './nsaMain.js'
puppeteer.use(StealthPlugin());

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.3 Safari/605.1.15",
  "Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.181 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 9; LM-Q720) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Mobile Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; AS; rv:11.0) like Gecko",
];

const getRandomUserAgent = () => {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

export async function getCourtRuling(signature) {
  const browser = await puppeteer.connect({
    browserWSEndpoint: process.env.BROWSER_WS_ENDPOINT,
    headless: false,
    args: [`--user-agent=${getRandomUserAgent()}`],
  });

  const page = await browser.newPage();

  try {
    await page.goto("https://orzeczenia.nsa.gov.pl/cbo/query");

    await page.click("#sygnatura");
    await page.type("#sygnatura", signature);

    await page.click('input[type="submit"][name="submit"][value="Szukaj"]');

    await page.waitForSelector("a");
    const links = await page.$$("a");

    if (links.length < 3 || links.length === 33) {
      throw {
        message: "No ruling found for the provided signature",
        code: "NOT_FOUND_ERR",
      };
    }

    await links[2].click();
    await page.waitForSelector(
      "td.info-list-label-uzasadnienie span.info-list-value-uzasadnienie",
    );

    await delay(3000); //Pptr needs more time for the content to load

    const extractedText = await page.evaluate(() => {
      const elements = document.querySelectorAll("td.info-list-label-uzasadnienie span.info-list-value-uzasadnienie");
      return Array.from(elements).map(element => element.innerHTML.trim());
    });

    const combinedText = extractedText.join('+');

    if (combinedText.length > 0) {
      const classification = await classifyCase(combinedText);
      const summary = await getCaseSummary(combinedText)
      const procedureStartDate = await getProcedureStartDate(combinedText);
      const dateOfLimitationsOnTaxLiability = await getDateOfLimitationsOnTaxLiability(combinedText);
      const containsNsaAmendment = (text) => /I FPS 1\/21/.test(text) ? 1 : 0;
      console.log(containsNsaAmendment);
      insertRuling(signature, combinedText, classification, summary, procedureStartDate, dateOfLimitationsOnTaxLiability, containsNsaAmendment(combinedText));

      return extractedText;
    } else {
      throw { message: "No text found for the ruling.", code: "NO_TEXT_ERR" };
    }
  } catch (error) {
    if (error.code === "NOT_FOUND_ERR" || error.code === "NO_TEXT_ERR") {
      throw error;
    }
    console.error("An error occurred in the scraper: " + error.message);
    throw { error: error }; // Rethrow to handle it in the router
  } finally {
    await browser.close();
  }
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}