import axios from 'axios';

import React from 'react';
import { useState } from 'react';



const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        topic: '',
        subtopics: '',
      });
    
      const { topic, subtopics } = formData;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("topic: ", topic);
        console.log("subtopics: ", subtopics);
        
        try {
            const response = await axios.post('http://localhost:5000/api/ai/gemini',formData, {
                // withCredentials: true, // Include credentials (cookies) in the request
                
                headers: {
                    'Content-Type': 'application/json',
                },
                
            });
            
            const data = response.data;
            console.log("Response data:", data);
            
        } catch (error) {
            console.error("Network error:", error);
            alert("Network error: " + error.message);
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
        
        <div className="hero  items-center justify-center min-h-screen bg-gray-800">
            <div className="card w-96 bg-white shadow-xl p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Create a New Memo</h1>
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
                        <label htmlFor="subTopics" className="label">
                            <span className="label-text">Number of Sub Topics:</span>
                        </label>
                        <select
                            id="subTopicsDropdown"
                            className="select select-bordered w-full mb-2"
                            name="subtopics"
                    
                            required
                            onChange={handleChange}
                        >
                            <option value="" disabled selected>
                                Select number of sub topics
                            </option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                        
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        Submit
                    </button>
                </form>
            </div>
        </div>
        
    );
};

export default Home;