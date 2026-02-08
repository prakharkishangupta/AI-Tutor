import express from "express";

import auth from "../middleware/auth.js";
import { createPaymentOrder, verifyPayment } from "../controller/paymentController.js";

const router = express.Router();

router.post('/create', auth, createPaymentOrder);
router.post('/verify', auth, verifyPayment);

export default router;