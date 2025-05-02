const getYoutubeVideos = async (topic) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(topic)}&type=video&maxResults=3&key=${process.env.YOUTUBE_API_KEY}`
        );
        const data = await response.json();

        return data.items.map(item => ({
            title: item.snippet.title,
            videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            thumbnailUrl: item.snippet.thumbnails.medium.url
        }));
    } catch (error) {
        throw new Error('Failed to fetch YouTube videos');
    }
};

export default getYoutubeVideos;
