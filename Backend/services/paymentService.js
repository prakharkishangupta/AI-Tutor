import Razorpay from 'razorpay';
import Payment from '../model/Payment.js';
import 'dotenv/config';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createOrder = async (userId, amount) => {
    try {
        const options = {
            amount: amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        console.log("order: ", order);
        const payment = new Payment({
            userId,
            orderId: order.id,
            amount: amount,
            status: 'created'
        });
        await payment.save();

        return {
            orderId: order.id,
            amount: amount,
            currency: "INR",
            keyId: process.env.RAZORPAY_KEY_ID
        };
    } catch (error) {
        console.error('Razorpay API Error:', error.message);
        console.error('Error Details:', error);
        throw new Error('Failed to create payment order');
    }
};

const verifyPayment = async (paymentId, orderId, signature) => {
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === signature) {
        await Payment.findOneAndUpdate(
            { orderId },
            {
                razorpayPaymentId: paymentId,
                razorpayOrderId: orderId,
                status: 'paid'
            }
        );
        return true;
    }
    return false;
};

export default { createOrder, verifyPayment };
