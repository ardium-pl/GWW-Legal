import OpenAI from "openai";
import * as dotenv from "dotenv";
import { getOrSetGptResponse } from "../sql/gptAnswQuerry.js";
import { getOrSetUserMessage, getOrSetSystemMessage} from "../sql/messagesQuerry.js";

dotenv.config(); // delete at production

const openai = new OpenAI();

export async function askGptAboutNSA(systemMessage, userMessage, courtRuling, caseSignature) {
  const rawResponse = await openai.chat.completions.create({
    model: "gpt-4-turbo-2024-04-09",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: `${userMessage} ${courtRuling}` },
    ],
    temperature: 0.5,
  });
  const response = retrieveGPTMessage(rawResponse);

  const [courtRulingID, systemMessageID, userMessageID] = await fetchIDs(caseSignature, userMessage, systemMessage);
    await getOrSetGptResponse(courtRulingID, systemMessageID, userMessageID,response);

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
  const rulingID = await getCaseSignatureFromDbByText(caseSignature);
  const userMessageID = await getOrSetUserMessage(userMessage);
  const systemMessageID = await getOrSetSystemMessage(systemMessage);

  return [rulingID, userMessageID, systemMessageID];
}