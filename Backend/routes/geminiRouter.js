import express from "express";
import generateResponse from "../controller/geminiController.js";
import getLearningResources from "../controller/learningController.js";

const router = express.Router();

router.post('/gemini', generateResponse);
router.post('/learning-resources', getLearningResources);
export default router;