import express from "express";

import { getCourseById, getUserCourse } from "../controller/courseController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/getCourse", auth, getUserCourse);
router.get("/:courseId", auth, getCourseById);

export default router;