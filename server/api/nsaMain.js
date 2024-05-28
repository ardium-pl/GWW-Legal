import OpenAI from "openai";
import * as dotenv from "dotenv";
import { getOrSetGptResponse } from "../sql/gptAnswQuerry.js";
import { getOrSetUserMessage, getOrSetSystemMessage } from "../sql/messagesQuerry.js";
import { getCourtRulingID } from "../sql/courtRulingQuerry.js"

dotenv.config(); // delete at production

const openai = new OpenAI();

export async function askGptAboutNSA(systemMessage, userMessage, courtRuling, caseSignature) {
  const rawResponse = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: `${userMessage} ${courtRuling}` },
    ],
    temperature: 0.5,
  });
  const response = retrieveGPTMessage(rawResponse);

  const [courtRulingID, userMessageID, systemMessageID] = await fetchIDs(caseSignature, userMessage, systemMessage);
  await getOrSetGptResponse(courtRulingID, systemMessageID, userMessageID, response);

  return response;
}

function retrieveGPTMessage(response) {
  if (response && response.choices) {
    return response.choices[0].message.content;
  }
  console.log("Error retrieving GPT message");
  return null;
}

async function fetchIDs(caseSignature, userMessage, systemMessage) {
  const rulingID = await getCourtRulingID(caseSignature);
  const userMessageID = await getOrSetUserMessage(userMessage);
  const systemMessageID = await getOrSetSystemMessage(systemMessage);

  if (!rulingID || !userMessageID || !systemMessageID) {
    throw new Error("DB can't fetch an ID");
  }

  return [rulingID, userMessageID, systemMessageID];
}