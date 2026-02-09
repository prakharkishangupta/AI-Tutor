import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const SubtitleItem = ({ subtitle, courseId, subtopicId, subtopicTitle }) => {
  const navigate = useNavigate();
  console.log("subtopicTitle", subtopicTitle);
  const handleClick = async () => {
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
  };

  return (
    <button
      onClick={handleClick}
      className="w-full text-left bg-gray-700 p-2 rounded hover:bg-gray-600"
    >
      {subtitle.suborder}. {subtitle.subtitleName}
    </button>
  );
};

export default SubtitleItem;
