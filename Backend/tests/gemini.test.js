import getResponse from '../services/geminiService.js';
import { mockRequest, mockResponse } from './helpers/testUtils.js';

jest.mock('@google/generative-ai');

describe('Gemini Service Tests', () => {
    let mockReq;
    let mockRes;

    beforeEach(() => {
        mockReq = mockRequest({
            topic: 'JavaScript',
            subtopics: 5
        });
        mockRes = mockResponse();
    });

    test('should generate content successfully', async () => {
        const mockContent = 'Generated content';
        jest.spyOn(getResponse, 'generateContent').mockResolvedValue(mockContent);

        const response = await getResponse('test prompt');
        expect(response).toBe(mockContent);
    });

    test('should handle API errors', async () => {
        const mockError = new Error('API Error');
        jest.spyOn(getResponse, 'generateContent').mockRejectedValue(mockError);

        await expect(getResponse('test prompt')).rejects.toThrow('API Error');
    });
});