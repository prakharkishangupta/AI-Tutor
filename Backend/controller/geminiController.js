// import { Request, Response } from 'express';
import getResponse from '../services/geminiService.js';


const generateResponse = async (req, res)=> {
    try {
        const { topic, subtopics } = req.body;
        console.log("Request body:", req.body);
        console.log("Topic:", topic);
        if (!topic && !subtopics) {
            return res.status(400).json({ error: 'Topic and subtopics are required' });
        }
        const prompt = `generate a structured course outline for the topic "${topic}" with ${subtopics} subtopics.`;
        const response = await getResponse(prompt);
        console.log(response);
        return res.json({ response });
    } catch (error) {
        console.error('Controller error:', error);
        return res.status(500).json({ error: 'Failed to generate response' });
    }
}


export default generateResponse;
