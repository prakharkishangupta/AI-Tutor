import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getLearningContent = async (subtopic) => {
    const prompt = `Provide a structured learning guide for: ${subtopic}
        Include:
        1. Brief Overview (2-3 sentences)
        2. Key Concepts (3-4 main points)
        3. Examples
        4. Practice Tips`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
};

export default getLearningContent;
