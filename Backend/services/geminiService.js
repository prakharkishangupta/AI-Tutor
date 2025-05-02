import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const getResponse = async (prompt)=> {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('API key is not configured');
        }
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error in Gemini API:', error);
        throw new Error(error.message || 'Failed to get response from Gemini AI');
    }
}

export default getResponse;
