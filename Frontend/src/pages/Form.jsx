import axios from 'axios';

import React from 'react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../api/axios.js';
import Navbar from '../components/Navbar.jsx';



const FormPage = () => {
    const { authUser } = useAuth(); // token
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        topic: '',
        level: '',
        goal: '',
        customGoal: '',
        style: '',
        subtopics: '',
      });
    
      const { topic,level, goal, customGoal, style, subtopics } = formData;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("formData: ", formData);

        try {
            const response = await api.post('/ai/gemini',formData, {
                
                headers: {
                    'Content-Type': 'application/json',
                },
                
            });
            
            const data = response.data;
            console.log("Response data:", data);
            navigate(`/structure/${data.course._id}`, { state: { course: data.course } });
            toast.success("Course outline generated successfully!");
            
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to generate course outline. Please try again.";
            toast.error(errorMessage);
            console.error(errorMessage);
           
        }finally {
            setIsLoading(false);
        }
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, // Dynamically updates based on input name
        });
    };
    return (
        <>
        <Navbar />
        <div className="hero  items-center justify-center min-h-screen bg-gray-800">
            <div className="card w-96 bg-white shadow-xl p-6">
                <h1 className="text-2xl font-bold mb-4 text-center text-black">Create a New Course</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4">
                        <label htmlFor="topic" className="label">
                            <span className="label-text">Topic:</span>
                        </label>
                        <input
                            type="text"
                            id="topic"
                            name="topic"
                            placeholder="Enter topic"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label htmlFor="subtopics" className="label">
                            <span className="label-text">Number of Subtopics:</span>
                        </label>
                        <select
                            id="subTopicsDropdown"
                            className="select select-bordered w-full mb-2"
                            name="subtopics"
                            value={formData.subtopics}
                            required
                            onChange={handleChange}
                        >
                            <option value="" disabled >
                                Select number of sub topics
                            </option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                        
                    </div>
                     {/* -----Level Dropdown ----- */}
                    <div className="form-control mb-4">
                        <label htmlFor="level" className="label">
                            <span className="label-text">Level:</span>
                        </label>
                        <select
                            id="levelDropdown"
                            className="select select-bordered w-full mb-2"
                            name="level"
                            value={formData.level}
                            required
                            onChange={handleChange}
                        >
                            <option value="" disabled >
                                Select level
                            </option>
                            <option value="Beginner">"Beginner"</option>
                            <option value="Intermediate">"Intermediate"</option>
                            <option value="Advanced">"Advanced"</option>
                        </select>
                    </div>

                    {/* -----Goal Dropdown ----- */}
                    <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Goal:</span>
                    </label>

                    <select
                        className="select select-bordered w-full mb-2"
                        name="goal"
                        value={formData.goal}
                        required
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                        Select goal
                        </option>
                        <option value="Understand fundamentals">Understand fundamentals</option>
                        <option value="Exam preparation">Exam preparation</option>
                        <option value="Interview preparation">Interview preparation</option>
                        <option value="Placement-focused learning">Placement-focused learning</option>
                        <option value="Project-based learning">Project-based learning</option>
                        <option value="Revision / Crash course">Revision / Crash course</option>
                        <option value="Other">Other (Specify)</option>
                    </select>

                    {formData.goal === "Other" && (
                        <input
                        type="text"
                        name="customGoal"
                        placeholder="Enter your custom goal"
                        className="input input-bordered w-full"
                        value={formData.customGoal}
                        onChange={handleChange}
                        required
                        />
                    )}
                    </div>

                    {/* -----Style Dropdown ----- */}
                    <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Style:</span>
                    </label>

                    <select
                        className="select select-bordered w-full mb-2"
                        name="style"
                        value={formData.style}
                        required
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                        Select style
                        </option>
                        <option value="Beginner-friendly">Beginner-friendly</option>
                        <option value="Step-by-step">Step-by-step</option>
                        <option value="Code-first">Code-first</option>
                        <option value="Real-world examples">Real-world examples</option>
                        <option value="Visual explanations">Visual explanations</option>
                        <option value="Short & concise">Short & concise</option>
                        <option value="Practice-heavy">Practice-heavy</option>
                        <option value="Deep theoretical">Deep theoretical</option>
                    </select>

                    
                    </div>

                    {/* <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Style:</span>
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                        "Beginner-friendly",
                        "Step-by-step",
                        "Code-first",
                        "Real-world examples",
                        "Visual explanations",
                        "Short & concise",
                        "Practice-heavy",
                        "Deep theoretical",
                        ].map((styleOption) => (
                        <label key={styleOption} className="cursor-pointer flex items-center gap-2">
                            <input
                            type="radio"
                            name="style"                 // ✅ SAME name
                            value={styleOption}
                            checked={formData.style === styleOption}
                            onChange={handleChange}      // ✅ handleChange works
                            className="radio radio-primary"
                            required
                            />
                            <span className="label-text">{styleOption}</span>
                        </label>
                        ))}
                    </div>
                    </div> */}

                    


                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`btn btn-primary w-full flex justify-center items-center
                        ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                <span className="ml-2">Generating...</span>
                            </>
                        ) : (
                            "Generate Course"
                        )}
                    </button>

                </form>
            </div>
        </div>
        </>
    );
};

export default FormPage;