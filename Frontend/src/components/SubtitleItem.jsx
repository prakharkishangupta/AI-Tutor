import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const SubtitleItem = ({ subtitle, courseId, subtopicId, subtopicTitle }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  console.log("subtopicTitle", subtopicTitle);
  const handleClick = async () => {
    if(loading) return;
    setLoading(true);
    try {
      const res = await api.post(
        "/ai/learning-resources",
        {
          courseId,
          subtopicId,
          subtitleName: subtitle.subtitleName,
          order: subtitle.suborder,
          subtopicTitle
        },
        
      );

      navigate(`/learning/${courseId}/${subtitle.suborder}`, {
        state: res.data
      });
    } catch (error) {
      console.error("Error navigating to learning page:", error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`w-full text-left bg-gray-700 p-2 rounded 
      flex items-center justify-between
      ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-600"}`}
    >
      <span>
        {subtitle.suborder}. {subtitle.subtitleName}
      </span>

      {loading && (
        <span className="loading loading-spinner loading-sm"></span>
      )}
    </button>

  );
};

export default SubtitleItem;
