import paymentService from '../services/paymentService.js';

export const createPaymentOrder = async (req, res) => {
    try {
        const { userId, amount } = req.body;

        if (!userId || !amount) {
            return res.status(400).json({ error: 'UserId and amount are required' });
        }

        console.log('Creating payment order for:', { userId, amount });

        const order = await paymentService.createOrder(userId, amount);
        console.log("order", order);
        res.json(order);
    } catch (error) {
        console.error('Payment creation error:', error.message);
        res.status(500).json({ error: 'Failed to create payment order' });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        console.log("body", req.body);
        const isValid = await paymentService.verifyPayment(
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
        );

        if (isValid) {
            res.json({ status: 'success' });
        } else {
            res.status(400).json({ error: 'Invalid payment' });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({ error: 'Failed to verify payment' });
    }
};


