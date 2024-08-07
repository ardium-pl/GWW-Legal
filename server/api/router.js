import express from "express";
import { getCourtRulingID, getRulingBySignature } from "../sql/courtRulingQuerry.js";
import { getGptResponse } from "../sql/gptAnswQuerry.js";
import { getSystemMessageId, getUserMessageId } from "../sql/messagesQuerry.js";
import { tryReturningMockRuling, tryReturningMockUserMessageResponse } from './mock-data.js';
import { askGptAboutNSA } from "./nsaMain.js";
import { getCourtRuling } from "./scraper.js";
export const nsaRouter = express.Router();

nsaRouter.post("/api/nsa/query", async (req, res) => {
  try {
    const { caseSignature } = req.body;
    if (!caseSignature) {
      return res.status(400).send({ error: "Case signature is required." });
    }

    if (/localhost/.test(req.get("origin"))) {
      const mockRuling = tryReturningMockRuling(caseSignature);
      if (mockRuling) {
        res.json(mockRuling);
        return;
      }
    }
    const dbCourtRuling = await getRulingBySignature(caseSignature);
    if (dbCourtRuling) {
      res.json([dbCourtRuling]);
      return;
    }
    const result = await getCourtRuling(caseSignature);
    res.json(result);
  } catch (error) {
    const customErrorCodesRegExp = /^(NOT_FOUND_ERR|NO_TEXT_ERR)$/;

    if (customErrorCodesRegExp.test(error.code)) {
      res.status(404).send({ error: error.message, code: error.code });
    } else {
      console.error(error);
      res.status(500).send({ error: error.message || "Internal Server Error" });
    }
  }
});

nsaRouter.post("/api/nsa/question", async (req, res) => {
  try {
    const { caseSignature, courtRuling, systemMessage, userMessage } = req.body;
    if (!courtRuling) {
      return res.status(400).send({ error: "Court ruling is required." });
    }

    if (/localhost/.test(req.get("origin"))) {
      const mockResponse = tryReturningMockUserMessageResponse(
        userMessage.trim(),
        courtRuling,
      );
      if (mockResponse) {
        res.json(mockResponse);
        return;
      }
    }

    const courtRulingID = await getCourtRulingID(caseSignature);
    const systemMessageID = await getSystemMessageId(systemMessage);
    const userMessageID = await getUserMessageId(userMessage);

    const response = await getGptResponse(courtRulingID, systemMessageID, userMessageID) ||
      await askGptAboutNSA(systemMessage, userMessage, courtRuling, caseSignature);

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});
