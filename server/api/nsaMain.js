import OpenAI from 'openai';
import { setGptResponse } from '../sql/gptAnswQuerry.js';

const openai = new OpenAI();

export function transformMessages(messages) {
  return messages.map(message => {
    let role;

    switch (message.type) {
      case 'system-message':
        role = 'system';
        break;
      case 'user-message':
        role = 'user';
        break;
      case 'response':
        role = 'assistant';
        break;
      default:
        throw new Error('Unknown message type: ' + message.type);
    }

    return {
      role: role,
      content: message.content,
    };
  });
}

export async function askGptAboutNSA(
  systemMessage,
  userMessage,
  courtRuling,
  systemMessageId,
  userMessageId,
  courtRulingId
) {
  const response = await getGptResponse(systemMessage, `${userMessage} ${courtRuling}`);

  const insertId = await setGptResponse(courtRulingId, systemMessageId, userMessageId, response);

  return { answer: response, id: insertId };
}

async function getGptResponse(systemMessage, userMessage) {
  const rawResponse = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.5,
  });
  return rawResponse?.choices?.[0]?.message?.content ?? null;
}

export async function followUpDiscussionAboutNSA(formattedChatHistory, courtRuling) {
  const historyInstruction = {
    role: 'system',
    content:
      'Answer based on the following context and chat history. You will also base your answer on this court ruling: ' +
      courtRuling,
  };
  formattedChatHistory.unshift(historyInstruction);

  const rawResponse = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: formattedChatHistory,
    temperature: 0.5,
  });
  return rawResponse?.choices?.[0]?.message?.content ?? null;
}

export async function classifyCase(courtRuling) {
  const systemMessage = `Napisz jedną literą: R (jeśli NSA rozstrzygnął sprawę merytorycznie), P (jeśli przekazał ją do WSA) lub N(jeśli nie da się tego określić). Orzeczenie: `;
  const response = await getGptResponse(systemMessage, courtRuling);
  return validateClassificationResult(response);
}

function validateClassificationResult(response) {
  const trimmedResponse = response?.trim();
  return { R: 1, P: 0, N: null }[trimmedResponse] ?? null;
}

export async function getCaseSummary(courtRuling) {
  const systemMessage = `Na podstawie poniższego orzeczenia opisz krótko jaka była decyzja NSA odnośnie zastosowania art. 70 §. Czy postępowanie zostało według sądu wszczęte instrumentalnie? Twoja odpowiedź musi mieć mniej niż 165 znaków. Orzeczenie: `;
  const response = await getGptResponse(systemMessage, courtRuling);
  return validateSummaryResult(response);
}

function validateSummaryResult(response) {
  const summaryMaxCharLen = 165;
  const match = response.match(/(.*?)(?<!art)\./); // Regex to find first period, ignoring ".art"
  return response.length > summaryMaxCharLen && match ? match[0] : response.slice(0, summaryMaxCharLen);
}

export async function getProcedureStartDate(courtRuling) {
  const systemMessage = `Na podstawie poniższego orzeczenia ustal datę zawieszenia biegu terminu przedawnienia sprawy. Odpowiedz mi w formacie YYYY-MM-DD. Orzeczenie: `;
  const response = await getGptResponse(systemMessage, courtRuling);
  return validateDate(response);
}

export async function getDateOfLimitationsOnTaxLiability(courtRuling) {
  const systemMessage = `Na podstawie poniższego orzeczenia ustal datę terminu przedawnienia zobowiązania podatkowego. Odpowiedz mi w formacie YYYY-MM-DD. Orzeczenie: `;
  const response = await getGptResponse(systemMessage, courtRuling);
  return validateDate(response);
}

function validateDate(response) {
  const match = response.match(/\b\d{4}-\d{2}-\d{2}\b/); //Regex to find the date
  return match ? match[0] : null;
}
