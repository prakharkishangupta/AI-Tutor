import emailService from '../services/emailService.js';
import { mockRequest, mockResponse } from './helpers/testUtils.js';

jest.mock('nodemailer');

describe('Email Service Tests', () => {
    let mockReq;
    let mockRes;

    beforeEach(() => {
        mockReq = mockRequest({
            email: 'test@example.com',
            username: 'testUser'
        });
        mockRes = mockResponse();
    });

    test('should send welcome email successfully', async () => {
        const result = await emailService.sendWelcomeEmail(
            mockReq.body.email,
            mockReq.body.username
        );
        expect(result.success).toBe(true);
        expect(result.messageId).toBeDefined();
    });

    test('should handle email sending failure', async () => {
        const mockError = new Error('Failed to send email');
        jest.spyOn(emailService, 'sendWelcomeEmail').mockRejectedValue(mockError);

        const result = await emailService.sendWelcomeEmail(
            'invalid@email.com',
            'username'
        );
        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
    });
});