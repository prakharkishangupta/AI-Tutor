// services/youtubeService.js

const getYoutubeVideos = async (query, maxResults = 3) => {
  if (!process.env.YOUTUBE_API_KEY) {
    throw new Error("YouTube API key missing");
  }

  const url = `https://www.googleapis.com/youtube/v3/search
    ?part=snippet
    &q=${encodeURIComponent(query)}
    &type=video
    &maxResults=${maxResults}
    &order=relevance
    &videoDuration=medium
    &safeSearch=strict
    &key=${process.env.YOUTUBE_API_KEY}`.replace(/\s+/g, "");

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`YouTube API error: ${response.status} ${errText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.items)) {
      return [];
    }

    return data.items
      .filter(item => item.id?.videoId && item.snippet)
      .map(item => ({
        title: item.snippet.title,
        videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        thumbnailUrl:
          item.snippet.thumbnails?.medium?.url ||
          item.snippet.thumbnails?.default?.url ||
          ""
      }));

  } catch (error) {
    console.error("YouTube fetch error:", error.message);
    return []; // fail gracefully
  }
};

export default getYoutubeVideos;
