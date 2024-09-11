import express from 'express';
import {
  getCourtRulingId,
  getDetailedRulingInfo,
  getPaginatedSignatures,
  getRulingBySignature,
} from '../sql/courtRulingQuerry.js';
import { getGptResponse } from '../sql/gptAnswQuerry.js';
import {
  getSystemMessageId,
  getUserMessage,
  getUserMessages,
  insertUserMessage,
  updateUserMessage,
} from '../sql/messagesQuerry.js';
import { tryReturningMockRuling, tryReturningMockUserMessageResponse } from './mock-data.js';
import { askGptAboutNSA, followUpDiscussionAboutNSA, transformMessages } from './nsaMain.js';
import { getCourtRuling } from './scraper.js';

export const nsaRouter = express.Router();

nsaRouter.post('/api/nsa/query', async (req, res) => {
  try {
    const { caseSignature } = req.body;
    if (!caseSignature) {
      return res.status(400).send({ error: 'Case signature is required.' });
    }

    if (/localhost/.test(req.get('origin'))) {
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
      res.status(500).send({ error: error.message || 'Internal Server Error' });
    }
  }
});

nsaRouter.get('/api/nsa/questions', async (_, res) => {
  try {
    const questions = await getUserMessages();
    res.json(questions);
  } catch (error) {
    console.error('Error in /api/nsa/questions endpoint:', error);
    res.status(500).send({ error: 'Internal Server Error', details: error.message });
  }
});

nsaRouter.post('/api/nsa/create-question', async (req, res) => {
  try {
    const { shortMessage, message } = req.body;

    if (!shortMessage) {
      return res.status(400).send({ error: 'shortMessage must be defined' });
    }
    if (!message) {
      return res.status(400).send({ error: 'message must be defined' });
    }

    const insertId = await insertUserMessage(message, shortMessage);

    res.status(200).json({ id: insertId });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

nsaRouter.put('/api/nsa/update-question', async (req, res) => {
  try {
    const { shortMessage, message, id } = req.body;

    if (!id) {
      return res.status(400).send({ error: 'message id must be defined' });
    }
    if (!shortMessage) {
      return res.status(400).send({ error: 'shortMessage must be defined' });
    }
    if (!message) {
      return res.status(400).send({ error: 'message must be defined' });
    }

    await updateUserMessage(id, message, shortMessage);

    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

nsaRouter.post('/api/nsa/question', async (req, res) => {
  try {
    const { caseSignature, courtRuling, systemMessage, userMessageId } = req.body;
    if (!courtRuling) {
      return res.status(400).send({ error: 'Court ruling is required.' });
    }
    if (!caseSignature) {
      return res.status(400).send({ error: 'Case signature is required.' });
    }

    if (/localhost/.test(req.get('origin'))) {
      const mockResponse = tryReturningMockUserMessageResponse(userMessageId, caseSignature);
      if (mockResponse) {
        res.json(mockResponse);
        return;
      }
    }

    const courtRulingId = await getCourtRulingId(caseSignature);
    const systemMessageId = await getSystemMessageId(systemMessage);

    const dbResponse = await getGptResponse(courtRulingId, systemMessageId, userMessageId);
    if (dbResponse) {
      res.status(200).json(dbResponse);
      return;
    }

    const userMessage = getUserMessage(userMessageId);

    const response = await askGptAboutNSA(
      systemMessage,
      userMessage,
      courtRuling,
      systemMessageId,
      userMessageId,
      courtRulingId
    );

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

nsaRouter.post('/api/nsa/conversation', async (req, res) => {
  const { messageHistory, courtRuling } = req.body;
  const formattedMessageHistory = transformMessages(messageHistory);

  try {
    const chatResponse = await followUpDiscussionAboutNSA(formattedMessageHistory, courtRuling);

    res.status(200).send({ chatResponse: chatResponse });
  } catch (error) {
    if (error?.cause?.code === 'ENOTFOUND') {
      res.status(500).send({ error: 'Internal Server Error', code: 'ENOTFOUND' });
      return;
    }
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

nsaRouter.get('/api/nsa/signatures', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.max(1, Math.min(100, parseInt(req.query.pageSize) || 20));

    const signatures = await getPaginatedSignatures(page, pageSize);

    res.json(signatures);
  } catch (error) {
    console.error('Error in /api/nsa/signatures endpoint:', error);
    res.status(500).send({ error: 'Internal Server Error', details: error.message });
  }
});

nsaRouter.get('/api/nsa/ruling/:signature', async (req, res) => {
  try {
    const { signature } = req.params;

    const rulingInfo = await getDetailedRulingInfo(signature);

    if (!rulingInfo) {
      return res.status(404).send({ error: 'Ruling not found' });
    }

    res.json(rulingInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
