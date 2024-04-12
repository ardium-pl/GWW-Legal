import express from 'express';
const router = express.Router();
import { askNSA } from './nsaMain.js';
import { getCourtRuling } from './scraper.js';

router.post("/nsa/question", async (req, res) => {
    try {
        const { courtRuling, questions } = req.body;
        if (!courtRuling) {
            return res.status(400).send({ error: 'Court ruling is required.' });
        }

        const result = await askNSA(courtRuling, questions);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.post("/nsa/querry", async (req, res) => {
    try {
        const { caseSignature } = req.body;
        if (!caseSignature) {
            return res.status(400).send({ error: 'Case signature is required.' });
        }

        const result = await getCourtRuling(caseSignature);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


export default router;
