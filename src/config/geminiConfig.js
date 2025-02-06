import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const fetchQuestions = async (topic, difficulty) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Create 5 multiple-choice questions on the topic "${topic}" with difficulty level ${difficulty} in Vietnamese. 
  Each question has 4 possible answers, one of which is correct. The questions should be short, 
  easy to understand, and general knowledge. Format the response as a JSON array:
  [{ "question": "text", "answers": ["a", "b", "c", "d"], "correctAnswer": "answer" }]`;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  const jsonText = response.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!jsonText) throw new Error("Invalid response format");

  const cleanJsonText = jsonText.replace(/```json|```/g, "").trim();
  return JSON.parse(cleanJsonText).map((q) => {
    const answerIndex = ["a", "b", "c", "d"].indexOf(q.correctAnswer.toLowerCase());
    return {
      ...q,
      correctAnswer: answerIndex !== -1 ? q.answers[answerIndex] : q.correctAnswer,
    };
  });
};