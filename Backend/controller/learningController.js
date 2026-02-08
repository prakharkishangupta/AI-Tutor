import Content from "../model/Content.js";
import Course from "../model/Course.js";
import getLearningContent from "../services/learningService.js";
import getYoutubeVideos from "../services/youtubeService.js";
import { cleanJson } from "../utils/jsonUtils.js";
import { validateLearningContent } from "../utils/jsonUtils.js";

export const getLearningResources = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("body in learning controller:", req.body);
    const {
      courseId,
      subtopicId,
      subtitleName,
      order,
      subtopicTitle
    } = req.body;

    if (!courseId || !subtitleName || order === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1️⃣ Check existing (LOCK)
    let content = await Content.findOne({
      userId,
      courseId,
      subtopicId,
      order
    });
    console.log("before ai call")

    if (content) {
      if (content.isGenerated) {
        return res.json(content);
      }

      if (content.generationStatus === "generating") {
        console.log("Previous generation stuck, retrying...");
        await Content.deleteOne({ _id: content._id });
      }
    }

    console.log("before ai call")
    // 2️⃣ Create GENERATING placeholder (critical)
    content = await Content.create({
      userId,
      courseId,
      subtopicId,
      subtopicTitle,
      subtitleName,
      order,
      generationStatus: "generating"
    });

    // 3️⃣ Fetch course context
    const course = await Course.findById(courseId);
    if (!course) {
      content.generationStatus = "failed";
      await content.save();
      return res.status(404).json({ error: "Course not found" });
    }

    console.log("before ai call")
    // 4️⃣ Generate AI content
    const rawText = await getLearningContent({
      courseTopic: course.topic,
      subtopicTitle,
      subtitleName,
      learnerLevel: course.level,
      learningGoal: course.goal,
      preferredStyle: course.preferredStyle
    });
  console.log("after ai call")

    const parsed = JSON.parse(cleanJson(rawText));
    console.log("Parsed learning content:", parsed.content);
    validateLearningContent(parsed);
    console.log("Parsed learning content after validating:", parsed);
    // 5️⃣ Fetch videos
    const query = parsed.videoSearchQuery?parsed.videoSearchQuery : `${course.topic} ${subtopicTitle} ${subtitleName}`;
  const videos = await getYoutubeVideos(query);

  // 6️⃣ Finalize document safely

    content.content = {
      overview: parsed.content?.overview || "",
      coreIdea: parsed.content?.coreIdea || "",
      sections: parsed.content?.sections || [],
      comparativeInsight: parsed.content?.comparativeInsight || {
        whenToUse: "",
        whenNotToUse: "",
        why: ""
      },
      commonMistakes: parsed.content?.commonMistakes || [],
      practiceGuidance: parsed.content?.practiceGuidance || [],
      summary: parsed.content?.summary || ""
    };

    content.videoResources = videos || [];
    content.generationStatus = "completed";
    content.isGenerated = true;

    await content.save();

    console.log("Final saved content:", content);
    return res.json(content);

  } catch (error) {
    console.error("Learning controller error:", error);
    return res.status(500).json({ error: "Failed to generate learning content" });
  }
};

export const getStoredLearningResources = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId, subtitleId } = req.query;

    const content = await Content.findOne({
      userId,
      courseId,
      order: Number(subtitleId)
    });

    if (!content) {
      return res.status(404).json({ error: "Learning content not found" });
    }

    return res.json(content);

  } catch (error) {
    console.error("Fetch learning error:", error);
    return res.status(500).json({ error: "Failed to fetch learning content" });
  }
};
