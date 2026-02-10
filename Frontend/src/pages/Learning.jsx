import { useEffect, useRef, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const Learning = () => {
  const { state } = useLocation();
  const { courseId, subtitleId } = useParams();
  const navigate = useNavigate();

  const abortRef = useRef(null);

  // session cache key (per subtitle per course)
  const cacheKey = `learning-${courseId}-${subtitleId}`;
  const cached = sessionStorage.getItem(cacheKey);

  const [learningData, setLearningData] = useState(
    cached ? JSON.parse(cached) : state || null
  );
  const [loading, setLoading] = useState(!learningData);
  const [error, setError] = useState(null);

  // 🔁 ID-driven fallback (DB fetch)
  useEffect(() => {
  // If already have data (state or cache), skip fetch
  if (learningData?.generationStatus === "completed") {
    setLoading(false);
    return;
  }

  const controller = new AbortController();
  abortRef.current = controller;

  const fetchLearning = async () => {
    try {
      const res = await api.get(
        "/ai/learning-resources",
        {
          params: { courseId, subtitleId },
          signal: controller.signal
        }
      );

      setLearningData(res.data);
      console.log("Fetched learning data:", res.data);
      sessionStorage.setItem(cacheKey, JSON.stringify(res.data));
    } catch (err) {
      if (!controller.signal.aborted) {
        setError("Failed to load learning content");
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  fetchLearning();

  return () => {
    controller.abort();
  };
}, [courseId, subtitleId]); // ✅ FIXED dependencies


  /* ---------------- UI STATES ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Generating lesson…
      </div>
    );
  }

  if (!learningData || error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <p className="mb-4">{error || "No learning content found"}</p>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  // If backend lock exists but AI still generating
  if (learningData.generationStatus === "generating") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Still generating content… please wait
      </div>
    );
  }

  /* ---------------- DATA ---------------- */
  console.log("Final learning data:", learningData);
  const {
    content,
    videoResources,
    subtitleName,
    subtopicTitle
  } = learningData;

  const getEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const videoId =
        urlObj.searchParams.get("v") ||
        urlObj.pathname.split("/").pop();

      return `https://www.youtube.com/embed/${videoId}`;
    } catch {
      return url;
    }
  };


  /* ---------------- RENDER ---------------- */

  return (
    <>
    <Navbar />
    <div className="p-8 max-w-5xl mx-auto text-white">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">{subtitleName}</h1>
        <p className="text-gray-400 mt-1">
          Subtopic: {subtopicTitle}
        </p>
      </div>

      {/* Overview */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
        <p className="text-gray-300">{content.overview}</p>
      </section>

      {/* Core Idea */}
      <section className="mb-8 bg-gray-800 p-5 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Core Idea</h2>
        <p className="text-gray-300">{content.coreIdea}</p>
      </section>

      {/* Sections */}
      {content.sections?.map((section, idx) => (
        <section key={idx} className="mb-6 bg-gray-800 p-5 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            {section.heading}
          </h3>

          <p className="text-gray-300 mb-3">
            {section.explanation}
          </p>

          {section.example && (
            <div className="bg-gray-900 p-3 rounded text-gray-200 text-sm">
              <strong>Example:</strong> {section.example}
            </div>
          )}
        </section>
      ))}

      {/* Comparative Insight */}
      {content.comparativeInsight && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Comparative Insight
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded">
              <strong>When to use</strong>
              <p className="text-gray-300 mt-1">
                {content.comparativeInsight.whenToUse}
              </p>
            </div>

            <div className="bg-gray-800 p-4 rounded">
              <strong>When not to use</strong>
              <p className="text-gray-300 mt-1">
                {content.comparativeInsight.whenNotToUse}
              </p>
            </div>

            <div className="bg-gray-800 p-4 rounded">
              <strong>Why</strong>
              <p className="text-gray-300 mt-1">
                {content.comparativeInsight.why}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Common Mistakes */}
      {content.commonMistakes?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Common Mistakes
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {content.commonMistakes.map((mistake, i) => (
              <li key={i}>{mistake}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Practice Guidance */}
      {content.practiceGuidance?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            Practice Guidance
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {content.practiceGuidance.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Summary */}
      <section className="mb-10 bg-gray-800 p-5 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Summary</h2>
        <p className="text-gray-300">{content.summary}</p>
      </section>

      {/* Videos */}
      {videoResources?.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Video Resources
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {videoResources.map((video, i) => (
              <iframe
                key={i}
                src={getEmbedUrl(video.videoUrl)}
                title={video.title}
                className="w-full h-64 rounded"
                allowFullScreen
              />

            ))}
          </div>
        </section>
      )}
    </div>
    </>
  );
};

export default Learning;
