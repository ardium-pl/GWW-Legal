import express from "express";
export const nsaRouter = express.Router();
import { askGptAboutNSA } from "./nsaMain.js";
import { getCourtRuling } from "./scraper.js";
import {
  tryReturningMockRuling,
  tryReturningMockUserMessageResponse,
} from "./mock-data.js";

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
    const { courtRuling, systemMessage, userMessage } = req.body;
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

    const response = await askGptAboutNSA(
      systemMessage,
      userMessage,
      courtRuling,
    );
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});
