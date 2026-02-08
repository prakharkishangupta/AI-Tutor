import Course from "../model/Course.js";

export const getUserCourse = async (req, res) => {
  try {
    const userId = req.userId;

    const courses = await Course.find({ userId })
      .select("topic courseImage createdAt")
      .sort({ createdAt: -1 });

    res.json({ courses });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.courseId,
      userId: req.userId
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ course });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch course" });
  }
};
