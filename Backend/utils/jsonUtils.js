// utils/jsonUtils.js

export const cleanJson = (text) => {
  return text
    .trim()
    .replace(/^```json/i, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();
};

export const validateCourseOutline = (data) => {
  // 🔹 Top-level validation
  if (
    !data ||
    typeof data !== "object" ||
    !data.topic ||
    !data.description ||
    !Array.isArray(data.subtopics) ||
    data.subtopics.length === 0
  ) {
    throw new Error("Invalid AI course outline structure");
  }

  // 🔹 Subtopic validation
  data.subtopics.forEach((subtopic, i) => {
    if (
      !subtopic.title ||
      typeof subtopic.order !== "number" ||
      !Array.isArray(subtopic.subtitles)
    ) {
      throw new Error(`Invalid subtopic structure at index ${i}`);
    }

    // 🔒 Enforce minimum subtitles
    if (subtopic.subtitles.length < 3) {
      throw new Error(
        `Subtopic "${subtopic.title}" must have at least 3 subtitles`
      );
    }

    // 🔹 Subtitle validation
    subtopic.subtitles.forEach((subtitle, j) => {
      if (
        !subtitle.subtitleName ||
        typeof subtitle.suborder !== "number"
      ) {
        throw new Error(
          `Invalid subtitle at subtopic ${i}, subtitle ${j}`
        );
      }
    });
  });
};

//---------learning-content----------

export const validateLearningContent = (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid learning content: not an object");
  }

  const { content, videoSearchQuery } = data;

  if (!content || typeof content !== "object") {
    throw new Error("Missing or invalid content object");
  }

  // 🔹 Required string fields
  const requiredStrings = [
    content.overview,
    content.coreIdea,
    content.summary
  ];

  if (requiredStrings.some(val => typeof val !== "string" || !val.trim())) {
    throw new Error("Missing required string fields in content");
  }

  // 🔹 Sections validation
  if (
    !Array.isArray(content.sections) ||
    content.sections.length === 0
  ) {
    throw new Error("Sections must be a non-empty array");
  }

  content.sections.forEach((section, i) => {
    if (
      !section.heading ||
      !section.explanation ||
      typeof section.heading !== "string" ||
      typeof section.explanation !== "string"
    ) {
      throw new Error(`Invalid section at index ${i}`);
    }
  });

  // 🔹 Comparative insight
  const ci = content.comparativeInsight;
  if (
    !ci ||
    typeof ci.whenToUse !== "string" ||
    typeof ci.whenNotToUse !== "string" ||
    typeof ci.why !== "string"
  ) {
    throw new Error("Invalid comparativeInsight structure");
  }

  // 🔹 Arrays of strings
  const arrayFields = [
    content.commonMistakes,
    content.practiceGuidance
  ];

  arrayFields.forEach((arr, idx) => {
    if (
      !Array.isArray(arr) ||
      arr.length === 0 ||
      arr.some(item => typeof item !== "string")
    ) {
      throw new Error(`Invalid string array at index ${idx}`);
    }
  });

  // 🔹 Video query
  if (
    !videoSearchQuery ||
    typeof videoSearchQuery !== "string"
  ) {
    throw new Error("Missing or invalid videoSearchQuery");
  }

  return true;
};
