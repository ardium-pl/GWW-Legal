import express from "express";
const router = express.Router();
import { askGptAboutNSA } from "./nsaMain.js";
import { getCourtRuling } from "./scraper.js";


router.post("/nsa/questions", async (req, res) => {
  try {
    const { courtRuling, systemMessage, userMessages } = req.body;
    if (!courtRuling) {
      return res.status(400).send({ error: "Court ruling is required." });
    }

    const progress = new Array(userMessages.length).fill(false);

    const result = await Promise.all(userMessages.map(async (message, i) => {
      const response = await askGptAboutNSA(systemMessage, message, courtRuling);
      progress[i] = true;
      res.write({ progress, responses: null });
      return response;
    }));

    res.write({ progress, responses: result });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/nsa/additional_question", async (req, res) => {
  try {
    const { courtRuling, systemMessage, userMessage } = req.body;
    if (!courtRuling) {
      return res.status(400).send({ error: "Court ruling is required." });
    }

    const response = await askGptAboutNSA(systemMessage, userMessage, courtRuling);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/nsa/query", async (req, res) => {
  try {
    const { caseSignature } = req.body;
    if (!caseSignature) {
      return res.status(400).send({ error: "Case signature is required." });
    }

    const result = await getCourtRuling(caseSignature);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
