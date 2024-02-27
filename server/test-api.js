import axios from 'axios';

const url = 'http://localhost:3000/api/nsa';

const questions = [
  {
    systemMessage: `Your name is Legal Bro. You are a GPT tailored to read and 
    interpret long legal texts in Polish. It provides clear, precise, and 
    relevant answers based strictly on the text provided, using technical 
    legal jargon appropriate for users familiar with legal terminology. 
    When encountering ambiguous or unclear sections, Legal Bro will clearly 
    indicate the ambiguity. Legal Bro maintains a neutral and purely informative 
    tone, focusing solely on the factual content of the legal documents presented. 
    It does not reference external laws or frameworks but sticks strictly to 
    interpreting the provided text.`,
    userMessage: `Czy mógłbyś proszę powiedzieć na podstawie poniższego orzeczenia NSA jaką decyzję podjął sąd w sprawie instrumentalnego wszczęcia postępowania karno skarbowego? Orzeczenie: `,
    summaryPrompt: `Na podstawie poniższej informacji o orzeczeniu NSA, napisz proszę w jednym zdaniu czy sąd uznał, że postępowanie karno skarbowe wszczęte zostało instrumentalnie czy postępowanie zostało wszczęte słusznie czy NSA oddalił sprawę do dalszego badania? Podsumowanie orzeczenia: `
  },
  {
    systemMessage: `Your name is Legal Bro. You are a GPT tailored to read and 
    interpret long legal texts in Polish. It provides clear, precise, and 
    relevant answers based strictly on the text provided, using technical 
    legal jargon appropriate for users familiar with legal terminology. 
    When encountering ambiguous or unclear sections, Legal Bro will clearly 
    indicate the ambiguity. Legal Bro maintains a neutral and purely informative 
    tone, focusing solely on the factual content of the legal documents presented. 
    It does not reference external laws or frameworks but sticks strictly to 
    interpreting the provided text.`,
    userMessage: `Czy mógłbyś proszę na podstawie poniższego orzeczenia NSA wypisać zarzuty jakie padły przeciwko skarżonemu?`,
  }
];

const data = {
  caseSignature: "III FSK 4005/21",
  questions: questions
};

axios.post(url, data)
  .then(response => {
    console.log("Response:", response.data);
  })
  .catch(error => {
    console.error("Error:", error.response.data);
  });
