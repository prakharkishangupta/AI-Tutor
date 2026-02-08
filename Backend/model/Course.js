// models/Course.js
import mongoose from "mongoose";

const subtitleSchema = new mongoose.Schema(
  {
    subtitleName: { type: String, required: true },
    suborder: { type: Number, required: true }
  },
  { _id: false }
);

const courseSubtopicSchema = new mongoose.Schema(
  {
    subtopicId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    title: { type: String, required: true },
    order: { type: Number, required: true },
    subtitles: {
      type: [subtitleSchema],
      required: true
    },
    isGenerated: { type: Boolean, default: false }
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    topic: {
      type: String,
      required: true,
      index: true
    },

    description: String,

    // 🔥 STORED GENERATION CONTEXT
    level: {
      type: String,
      default: "beginner"
    },

    goal: {
      type: String
    },

    preferredStyle: {
      type: String,
      default: "balanced"
    },

    // ✅ NEW FIELD
    courseImage: {
      type: String, // base64 OR S3 URL
      required: true,
    },

    subtopicCount: {
      type: Number,
      required: true
    },

    subtopics: {
      type: [courseSubtopicSchema],
      required: true
    },

    status: {
      type: String,
      enum: ["generated", "in-progress", "completed"],
      default: "generated"
    },

    progress: {
      completedPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
