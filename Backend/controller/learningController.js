import getLearningContent from '../services/learningService.js';
import getYoutubeVideos from '../services/youtubeService.js';

const getLearningResources = async (req, res) => {
    try {
        const { subtopic } = req.body;

        if (!subtopic) {
            return res.status(400).json({ error: 'Subtopic is required' });
        }

        const [content, videos] = await Promise.all([
            getLearningContent(subtopic),
            getYoutubeVideos(subtopic + " tutorial")
        ]);
        console.log("content",content)
        console.log("videos",videos)
        return res.json({
            textContent: content,
            videoResources: videos
        });
    } catch (error) {
        console.error('Learning resources error:', error);
        return res.status(500).json({ error: 'Failed to fetch learning resources' });
    }
};

export default getLearningResources;
