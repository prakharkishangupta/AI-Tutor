import { createPaymentOrder, verifyPayment } from '../controller/paymentController.js';
import paymentService from '../services/paymentService.js';

jest.mock('../services/paymentService.js');

describe('Payment Controller Tests', () => {
    let mockReq;
    let mockRes;

    beforeEach(() => {
        mockReq = {
            body: {
                userId: 'testUserId',
                amount: 100
            }
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('Create Payment Order', () => {
        test('should create payment order successfully', async () => {
            const mockOrder = {
                orderId: 'order_123',
                amount: 100,
                currency: 'INR',
                keyId: 'test_key'
            };

            paymentService.createOrder.mockResolvedValue(mockOrder);

            await createPaymentOrder(mockReq, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith(mockOrder);
        });

        test('should handle missing parameters', async () => {
            mockReq.body = {};

            await createPaymentOrder(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: 'UserId and amount are required'
            });
        });
    });

    describe('Verify Payment', () => {
        test('should verify payment successfully', async () => {
            mockReq.body = {
                razorpay_payment_id: 'pay_123',
                razorpay_order_id: 'order_123',
                razorpay_signature: 'valid_signature'
            };

            paymentService.verifyPayment.mockResolvedValue(true);

            await verifyPayment(mockReq, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith({ status: 'success' });
        });
    });
});