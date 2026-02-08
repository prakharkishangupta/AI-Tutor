import {getCourseImage, getResponse} from "../services/geminiService.js";
import { cleanJson, validateCourseOutline } from "../utils/jsonUtils.js";
// import { uploadBase64Image } from "../services/cloudinaryService.js";
import Course from "../model/Course.js";
import mongoose from "mongoose";

const generateResponse = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    console.log("userId from token:", userId);

    const { topic, level, goal, customGoal, style, subtopics } = req.body;

    const subtopicCount = Number(subtopics);
    if (!topic || !subtopicCount || subtopicCount <= 0 || subtopicCount > 15) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const safeLevel = level || "beginner";
    const safeGoal = goal || customGoal || "general understanding";
    const safeStyle = style || "balanced";

    const prompt = `
You are a backend API that outputs ONLY valid JSON.
If you cannot strictly follow the required structure, return {}.

Generate a structured course outline.

Topic: "${topic}"
Learner level: "${safeLevel}"
Learning goal: "${safeGoal}"
Preferred learning style: "${safeStyle}"
Total number of subtopics: ${subtopicCount}

STRICT REQUIREMENTS:
- Every subtopic MUST include a "subtitles" array
- Each "subtitles" array MUST contain at least 3 items
- Return ONLY JSON

Required JSON structure:
{
  "topic": "",
  "description": "",
  "subtopics": [
    {
      "title": "",
      "order": 1,
      "subtitles": [
        { "subtitleName": "", "suborder": 1 }
      ]
    }
  ]
}
`;

    // 1️⃣ Generate course image
    // const base64Image = await generateCourseImage(topic);

    // 2️⃣ Upload to cloudinary

    let imageUrl = await getCourseImage(topic);

    if (!imageUrl) {
      imageUrl = "https://via.placeholder.com/500?text=Course+Image";
    }

    // 🔹 Gemini call
    const rawText = await getResponse(prompt);
    const cleaned = cleanJson(rawText);
    const parsed = JSON.parse(cleaned);

    validateCourseOutline(parsed);

    // 🔹 Save ONLY Course (outline)
    const course = await Course.create({
      userId,
      topic: parsed.topic,
      description: parsed.description,
      level: safeLevel,
      goal: safeGoal,
      preferredStyle: safeStyle,
      subtopicCount: parsed.subtopics.length,
      courseImage: imageUrl, // NEW FIELD
      subtopics: parsed.subtopics.map(st => ({
        subtopicId: new mongoose.Types.ObjectId(), // internal reference
        title: st.title,
        order: st.order,
        subtitles: st.subtitles,
        isGenerated: false
      })),
      status: "generated"
    });
    console.log("courseTopic: ", course.topic);
    console.log("courseImage: ", course.courseImage);
    console.log("course: ", course);
    return res.status(201).json({
      success: true,
      course: course
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to generate course" });
  }
};

export default generateResponse;
