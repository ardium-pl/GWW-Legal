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
    const classification = classifyCase(courtRuling)
    rulingID = await insertRuling(caseSignature, courtRuling, classification);;
  }

  if (!userMessageID) {
    userMessageID = await insertUserMessage(userMessage);;
  }

  if (!systemMessageID) {
    systemMessageID = await insertSystemMessage(systemMessage);
  }


  if (!rulingID || !userMessageID || !systemMessageID) {
    throw new Error("DB can't fetch an ID");
  }

  return [rulingID, userMessageID, systemMessageID];
}

export async function classifyCase(courtRuling) {
  const systemMessage = `Napisz jedną literą: R (jeśli NSA rozstrzygnął sprawę merytorycznie),
                          P (jeśli przekazał ją do WSA) lub N(jeśli nie da się tego określić).
                           Orzeczenie: `;

  const rawResponse = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: `${courtRuling}` },
    ],
    temperature: 0.5,
  });
  const response = retrieveGPTMessage(rawResponse);
  return validateClassificationResult(response);
}

function validateClassificationResult(response) {
  const trimmedResponse = response.trim();
  const resultMap = {
    'R': true,
    'P': false,
    'N': null // chat can't anserw
  };

  if (resultMap.hasOwnProperty(trimmedResponse)) {
    return resultMap[trimmedResponse];
  } else { 
    return null; //This null comes for an unexpected response
  }
}