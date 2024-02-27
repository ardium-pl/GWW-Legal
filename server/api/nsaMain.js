import OpenAI from "openai";
import * as dotenv from 'dotenv';
import { getCourtRuling } from "./scraper.js";

dotenv.config();

const openai = new OpenAI();

export async function askNSA(caseSignature, questions) {
    const courtRuling = await getCourtRuling(caseSignature);
    let responses = [];

    for (const question of questions) {
        const gptResponse = await askGptAboutNSA(question.systemMessage, question.userMessage, courtRuling);
        let summaryResponse = null;

        if (question.summaryPrompt) {
            summaryResponse = await askGptForSummary(question.summaryPrompt, retrieveGPTMessage(gptResponse));
        }

        responses.push({
            question: question.userMessage,
            response: retrieveGPTMessage(gptResponse),
            summary: summaryResponse ? retrieveGPTMessage(summaryResponse) : null,
        });
    }

    return responses;
}

async function askGptAboutNSA(systemMessage, userMessage, courtRuling) {
    const response = await openai.chat.completions.create({
        model: "gpt-4-0125-preview",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: `${userMessage} ${courtRuling}` }
        ],
        temperature: 0.5
    });

    return response;
}

async function askGptForSummary(summaryPrompt, gptResponse) {
    const response = await openai.chat.completions.create({
        model: "gpt-4-0125-preview",
        messages: [
          { role: "system", content: summaryPrompt },
          { role: "user", content: gptResponse }
        ],
        temperature: 0.1
    });

    return response;
}

function retrieveGPTMessage(response) {
    if (response && response.choices) {
        return response.choices[0].message.content;
    }
    console.log("Error retrieving GPT message");
    return null;
}
