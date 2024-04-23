import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config(); // delete at production

const openai = new OpenAI();

export async function askGptAboutNSA(systemMessage, userMessage, courtRuling) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-2024-04-09",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: `${userMessage} ${courtRuling}` },
    ],
    temperature: 0.5,
  });

  return retrieveGPTMessage(response);
}

function retrieveGPTMessage(response) {
  if (response && response.choices) {
    return response.choices[0].message.content;
  }
  console.log("Error retrieving GPT message");
  return null;
}
