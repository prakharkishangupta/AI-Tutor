import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cors from "cors";
import multer from "multer";
import userRoute from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import path from "path";
import geminiRouter from "./routes/geminiRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import courseRouter from "./routes/courseRouter.js";
import dotenv from "dotenv";

dotenv.config();


const app = express();
const port = 8000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ai-tutor-ten-ecru.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));



try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully")
} catch (error) {
    console.log(error);
}

app.use("/api/user", userRoute);
app.use("/api/ai", geminiRouter);
app.use("/api/course", courseRouter);
app.use('/api/payment', paymentRouter)

app.listen(port, ()=>{
    console.log("Server is running successfully on port 8000");
})