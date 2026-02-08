import getLearningResources from '../controller/learningController.js';
import getLearningContent from '../services/learningService.js';
import getYoutubeVideos from '../services/youtubeService.js';

jest.mock('../services/learningService.js');
jest.mock('../services/youtubeService.js');

describe('Learning Controller Tests', () => {
    let mockReq;
    let mockRes;

    beforeEach(() => {
        mockReq = {
            body: {
                subtopic: 'JavaScript Promises'
            }
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('should return learning resources successfully', async () => {
        const mockContent = 'Test content';
        const mockVideos = [
            {
                title: 'Test Video',
                videoUrl: 'https://youtube.com/test',
                thumbnailUrl: 'https://youtube.com/thumb'
            }
        ];

        getLearningContent.mockResolvedValue(mockContent);
        getYoutubeVideos.mockResolvedValue(mockVideos);

        await getLearningResources(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith({
            textContent: mockContent,
            videoResources: mockVideos
        });
    });

    test('should handle missing subtopic', async () => {
        mockReq.body = {};

        await getLearningResources(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: 'Subtopic is required'
        });
    });

    test('should handle service errors', async () => {
        getLearningContent.mockRejectedValue(new Error('Service error'));

        await getLearningResources(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: 'Failed to fetch learning resources'
        });
    });
});