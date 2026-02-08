const CourseCard = ({ course, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg shadow cursor-pointer hover:scale-105 transition"
    >
      <img
        src={course.courseImage}
        alt={course.topic}
        className="h-40 w-full object-cover rounded-t-lg"
      />

      <div className="p-4">
        <h2 className="text-white font-semibold">{course.topic}</h2>
        <p className="text-gray-400 text-sm">
          {new Date(course.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
