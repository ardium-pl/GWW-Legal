import OpenAI from "openai";
import * as dotenv from "dotenv";
import { saveGptResponseToDB, getCaseSignatureFromDbByText } from "../sql/gptAnswQuerry.js";

dotenv.config(); // delete at production

const openai = new OpenAI();

export async function askGptAboutNSA(systemMessage, userMessage, courtRuling) {
  const rawResponse = await openai.chat.completions.create({
    model: "gpt-4-turbo-2024-04-09",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: `${userMessage} ${courtRuling}` },
    ],
    temperature: 0.5,
  });
  const response = retrieveGPTMessage(rawResponse);

  //Case sig can't be provided you have to figure it out somehow 
  const caseSignature = await getCaseSignatureFromDbByText(courtRuling);
  
  if(caseSignature){
    await saveGptResponseToDB(systemMessage,userMessage,caseSignature,response);
  }else{
    console.error("Error occured while saving the response to DB");
  }

  return response;
}

function retrieveGPTMessage(response) {
  if (response && response.choices) {
    return response.choices[0].message.content;
  }
  console.log("Error retrieving GPT message");
  return null;
}
