import express from "express";
export const nsaRouter = express.Router();
import { askGptAboutNSA } from "./nsaMain.js";
import { getCourtRuling } from "./scraper.js";
import { tryReturningMockRuling, tryReturningMockUserMessageResponse } from './mock-data.js';
import { getOrSetCourtRuling } from "../sql/courtRulingQuerry.js";
import { getOrSetGptResponse } from "../sql/gptAnswQuerry.js";
import { getOrSetSystemMessage, getOrSetUserMessage } from "../sql/messagesQuerry.js";


nsaRouter.post("/api/nsa/query", async (req, res) => {
  try {
    const { caseSignature } = req.body;
    if (!caseSignature) {
      return res.status(400).send({ error: "Case signature is required." });
    }

    if (/localhost/.test(req.get('origin'))) {
      const mockRuling = tryReturningMockRuling(caseSignature);
      if (mockRuling) {
        res.json(mockRuling);
        return;
      }
    }
    const dbCourtRuling = await getOrSetCourtRuling(caseSignature);
    const result = dbCourtRuling || await getCourtRuling(caseSignature);
    res.json(result);

  } catch (error) {
    const customErrorCodesRegExp = /^(NOT_FOUND_ERR|NO_TEXT_ERR)$/

    if (customErrorCodesRegExp.test(error.code)) {
      res.status(404).send({ error: error.message, code: error.code });
    }
    else {
      console.error(error);
      res.status(500).send({ error: error.message || "Internal Server Error" });
    }
  }
});

nsaRouter.post("/api/nsa/question", async (req, res) => {
  try {
    const { courtRuling, systemMessage, userMessage } = req.body;
    if (!courtRuling) {
      return res.status(400).send({ error: "Court ruling is required." });
    }

    if (/localhost/.test(req.get('origin'))) {
      const mockResponse = tryReturningMockUserMessageResponse(userMessage.trim(), courtRuling);
      if (mockResponse) {
        res.json(mockResponse);
        return;
      }
    }

    //For simplicity get caseSig first 
    const caseSignature = await getOrSetCourtRuling(null, courtRuling);
    //Get or set all the IDs from DB
    const courtRulingID = await getOrSetCourtRuling(caseSignature, courtRuling)
    const systemMessageID = await getOrSetSystemMessage(systemMessage);
    const userMessageID = await getOrSetUserMessage(userMessage);

    const response = await getOrSetGptResponse(courtRulingID, systemMessageID, userMessageID) || await askGptAboutNSA(systemMessage, userMessage, courtRuling, caseSignature);

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});