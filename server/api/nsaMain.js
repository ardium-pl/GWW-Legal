import OpenAI from "openai";
import { setGptResponse } from "../sql/gptAnswQuerry.js";
import { getSystemMessageId, getUserMessageId, insertSystemMessage, insertUserMessage } from "../sql/messagesQuerry.js";
import { getCourtRulingID, insertRuling } from "../sql/courtRulingQuerry.js"

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

  const [courtRulingID, userMessageID, systemMessageID] = await fetchIDs(caseSignature, userMessage, systemMessage, courtRuling);
  await setGptResponse(courtRulingID, systemMessageID, userMessageID, response);

  return response;
}

function retrieveGPTMessage(response) {
  if (response && response.choices) {
    return response.choices[0].message.content;
  }
  console.log("Error retrieving GPT message");
  return null;
}

async function fetchIDs(caseSignature, userMessage, systemMessage, courtRuling) {
  let rulingID = await getCourtRulingID(caseSignature);
  let userMessageID = await getUserMessageId(userMessage);
  let systemMessageID = await getSystemMessageId(systemMessage);


  if (!rulingID) {
    const insertId = await insertRuling(caseSignature, courtRuling);
    rulingID = insertId;
  }

  if (!userMessage) {
    const insertId = await insertUserMessage(userMessage);
    userMessageID = insertId;
  }

  if (!systemMessageID) {
    const insertId = await insertSystemMessage(systemMessage);
    systemMessageID = insertId;
  }


  if (!rulingID || !userMessageID || !systemMessageID) {
    throw new Error("DB can't fetch an ID");
  }

  return [rulingID, userMessageID, systemMessageID];
}