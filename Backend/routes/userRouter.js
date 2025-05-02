import express from "express";
import { getProfile, login, signup } from "../controller/user.js";
import uploads from "../middleware/multerMiddleware.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", uploads.single('profileImage'), signup);
router.post('/login', login);
router.get('/getProfile', auth, getProfile);

export default router;