// models/Content.js
import mongoose from "mongoose";

/* ---------- Subschemas ---------- */

/* ---------- Subschemas ---------- */

const sectionSchema = new mongoose.Schema(
  {
    heading: String,
    explanation: String,
    example: String
  },
  { _id: false }
);

const comparativeInsightSchema = new mongoose.Schema(
  {
    whenToUse: String,
    whenNotToUse: String,
    why: String
  },
  { _id: false }
);

const contentSchema = new mongoose.Schema(
  {
    overview: String,
    coreIdea: String,
    sections: [sectionSchema],
    comparativeInsight: comparativeInsightSchema,
    commonMistakes: [String],
    practiceGuidance: [String],
    summary: String
  },
  { _id: false }
);

 

const videoSchema = new mongoose.Schema(
  {
    title: String,
    videoUrl: String,
    thumbnailUrl: String
  },
  { _id: false }
);

/* ---------- MAIN CONTENT SCHEMA ---------- */

const learningContentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true
    },

    subtopicId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },

    subtitleName: {
      type: String,
      required: true
    },

    order: {
      type: Number,
      required: true
    },

    content: contentSchema,

    videoResources: [videoSchema],

    isGenerated: {
      type: Boolean,
      default: false
    },

    generationStatus: {
      type: String,
      enum: ["generating", "completed", "failed"],
      default: "generating"
    },

    progress: {
      isCompleted: {
        type: Boolean,
        default: false
      },
      lastAccessed: Date
    }
  },
  { timestamps: true }
);

// 🔒 Prevent duplicate content per subtitle per user
learningContentSchema.index(
  { userId: 1, courseId: 1, subtopicId: 1,order: 1 },
  { unique: true }
);

export default mongoose.model("Content", learningContentSchema);
