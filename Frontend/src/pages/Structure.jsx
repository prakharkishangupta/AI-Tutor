import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SubtopicCard from "../components/SubtopicCard.jsx";
import api from "../api/axios.js";
import Navbar from "../components/Navbar.jsx";

const Structure = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    api.get(`/course/${courseId}`)
      .then(res => setCourse(res.data.course))
      .catch(console.error);
  }, [courseId]);

  if (!course) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="p-8 bg-gray-900 min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-6">{course.topic}</h1>
        <div className="space-y-4">
          {course.subtopics.map(st => (
            <SubtopicCard
              key={st.subtopicId}
              subtopic={st}
              courseId={courseId}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Structure;