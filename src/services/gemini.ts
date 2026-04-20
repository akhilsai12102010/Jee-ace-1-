import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function chatWithGemini(messages: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const model = "gemini-3.1-pro-preview";
  
  const systemInstruction = `You are "JEE Ace", a specialized AI tutor for IIT-JEE preparation. 
Your goal is to help students with Physics, Chemistry, and Mathematics problems.
- Use LaTeX for mathematical formulas (e.g., $E = mc^2$ or $$\\int x dx$$).
- Be precise, encouraging, and clear in your explanations.
- If a student asks a doubt, break down the solution into logical steps.
- You have deep knowledge of NCERT and JEE Advanced/Main syllabus.
- If the user asks for a practice plan, suggest a balanced schedule.
- Keep responses concise but comprehensive.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: messages,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
