// services/geminiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function analyzePalm(image: File): Promise<string> {
  try {
    const imageBytes = await image.arrayBuffer();

    const prompt =
      "Analyze this palm image and give a detailed palmistry-style interpretation in Hindi. Mention life line, heart line, and career insights.";

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: Buffer.from(imageBytes).toString("base64"),
          mimeType: image.type,
        },
      },
    ]);

    return result.response.text();
  } catch (error: any) {
    console.error("Error analyzing palm:", error);
    return "❌ Error analyzing palm image. Please try again.";
  }
}
