import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SubtitleItem from "./SubtitleItem.jsx";

const SubtopicCard = ({ subtopic, courseId }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-gray-800 p-5 rounded-lg">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <h2 className="text-lg font-semibold">
          {subtopic.order}. {subtopic.title}
        </h2>

        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>

      {isOpen && (
        <div className="mt-4 space-y-2">
          {subtopic.subtitles.map(sub => (
            <SubtitleItem
              key={sub.suborder}
              subtitle={sub}
              courseId={courseId}
              subtopicId={subtopic.subtopicId}
              subtopicTitle={subtopic.title}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubtopicCard;
