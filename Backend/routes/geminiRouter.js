import express from "express";
import generateResponse from "../controller/geminiController.js";
import {getLearningResources, getStoredLearningResources } from "../controller/learningController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post('/gemini', auth, generateResponse);
router.post('/learning-resources', auth, getLearningResources);
router.get("/learning-resources", auth, getStoredLearningResources);

export default router;