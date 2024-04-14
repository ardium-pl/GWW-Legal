import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config(); // delete at production

const openai = new OpenAI();

export async function askGptAboutNSA(systemMessage, userMessage, courtRuling) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-0125-preview",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: `${userMessage} ${courtRuling}` },
    ],
    temperature: 0.5,
  });

  return {
    question: userMessage,
    response: retrieveGPTMessage(response),
  };
}

function retrieveGPTMessage(response) {
  if (response && response.choices) {
    return response.choices[0].message.content;
  }
  console.log("Error retrieving GPT message");
  return null;
}
