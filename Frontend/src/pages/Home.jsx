import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/course/getCourse", {
        withCredentials: true,
      })
      .then(res => setCourses(res.data.courses))
      .catch(console.error);
  }, []);

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-white font-bold">
          Your Courses
        </h1>

        <button
          onClick={() => navigate("/form")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition duration-200"
        >
          Generate Course
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard
            key={course._id}
            course={course}
            onClick={() =>
              navigate(`/structure/${course._id}`)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
