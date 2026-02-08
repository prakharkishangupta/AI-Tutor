// services/learningService.js
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


const getLearningContent = async ({
  courseTopic,
  subtopicTitle,
  subtitleName,
  learnerLevel,
  learningGoal,
  preferredStyle
}) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API key missing");
  }
  console.log(`"subtopicTitle in learning service:", ${subtopicTitle}`);
  const prompt = `You are a backend API that outputs ONLY valid JSON.
If you cannot strictly follow the required structure, return {}.

Your task is to generate deep, high-quality educational content
for ONE specific lesson (subtitle) inside a course.

IMPORTANT CONTEXT (DO NOT IGNORE):
- Course topic: "${courseTopic}"
- Subtopic: "${subtopicTitle}"
- Lesson (subtitle): "${subtitleName}"

LEARNER PROFILE:
- Learner level: "${learnerLevel}"
- Learning goal: "${learningGoal}"
- Preferred learning style: "${preferredStyle}"

CRITICAL INTELLIGENCE RULES:
1. Stay STRICTLY within the scope of the given topic, subtopic, and subtitle.
2. Use ONE consistent mental model or real-world analogy throughout the lesson.
3. If examples are used, they MUST relate to the same problem context.
4. If comparisons are necessary, compare ONLY closely related concepts within the same topic.
5. Do NOT introduce unrelated concepts just for explanation.
6. Assume the learner may study adjacent subtitles later — do not jump ahead.
7. Focus on building intuition: explain WHY something is used, not just WHAT it is.

CONTENT QUALITY RULES:
- Be concrete, not generic
- Prefer reasoning over definitions
- Use step-by-step explanations when appropriate
- Adapt depth and vocabulary to learner level
- Avoid unnecessary academic language

STRICT OUTPUT RULES:
- Output ONLY valid JSON
- NO markdown
- NO explanations outside JSON
- NO emojis
- NO filler content

REQUIRED JSON STRUCTURE:
{
  "content": {
    "overview": "A focused introduction explaining this lesson in the context of the given subtopic",
    
    "coreIdea": "The single most important concept the learner should understand from this lesson",

    "sections": [
      {
        "heading": "Logical section title",
        "explanation": "Clear explanation that builds on the same example or scenario",
        "example": "A concrete example strictly related to the topic, subtopic, and lesson"
      }
    ],

    "comparativeInsight": {
      "whenToUse": "When this concept is the right choice",
      "whenNotToUse": "Situations where this concept is not suitable",
      "why": "Reasoning behind these choices"
    },

    "commonMistakes": [
      "A realistic mistake learners make within this exact topic",
      "Another common misunderstanding related to this lesson"
    ],

    "practiceGuidance": [
      "Specific advice on how to practice this lesson effectively",
      "What the learner should focus on while practicing"
    ],

    "summary": "A concise wrap-up reinforcing how this lesson fits into the bigger picture of the subtopic"
  },

  "videoSearchQuery": "A precise YouTube search query that would return high-quality videos specifically for this lesson"
}
`;

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  return response.text;

};

export default getLearningContent;
