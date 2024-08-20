import OpenAI from "openai";
import { getCourtRulingID, insertRuling } from "../sql/courtRulingQuerry.js";
import { setGptResponse } from "../sql/gptAnswQuerry.js";
import { getSystemMessageId, getUserMessageId, insertSystemMessage, insertUserMessage } from "../sql/messagesQuerry.js";

const openai = new OpenAI();

export function transformMessages(messages) {
  return messages.map((message) => {
    let role;

    switch (message.type) {
      case "system-message":
        role = "system";
        break;
      case "user-message":
        role = "user";
        break;
      case "response":
        role = "assistant";
        break;
      default:
        throw new Error("Unknown message type: " + message.type);
    }

    return {
      role: role,
      content: message.content,
    };
  });
}

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

export async function followUpDiscussionAboutNSA(formattedChatHistory, courtRuling) {
  const historyInstruction = {
    role: "system",
    content: "Answer based on the following context and chat history. You will also base your answer on this court ruling: " + courtRuling,
  };
  formattedChatHistory.unshift(historyInstruction);

  const rawResponse = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: formattedChatHistory,
    temperature: 0.5,
  });
  const textResponse = retrieveGPTMessage(rawResponse);
  return textResponse;
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
    rulingID = await insertRuling(caseSignature, courtRuling);;
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