import express from 'express';
const router = express.Router();
import { askNSA } from './nsaMain.js';

router.post("/api/nsa", async (req, res) => {
    try {
        const { caseSignature, questions } = req.body;
        if (!caseSignature) {
            return res.status(400).send({ error: 'Case signature is required.' });
        }

        const result = await askNSA(caseSignature, questions);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


export default router;
