
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';


const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const getResponse = async (prompt)=> {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('API key is not configured');
        }
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
            {
                role: "user",
                parts: [{ text: prompt }],
            },
            ],
        });

        return response.text;
    } catch (error) {
        console.error('Error in Gemini API:', error);
        throw new Error(error.message || 'Failed to get response from Gemini AI');
    }
}





export const getCourseImage = async (topic) => {
  console.log("Unsplash Key:", process.env.UNSPLASH_ACCESS_KEY);
  try {
    // 1️⃣ Get image from Unsplash
   

    const unsplashResponse = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query: `${topic} education illustration`,
          per_page: 1,
          orientation: "squarish",
        },
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!unsplashResponse.data.results.length) {
      throw new Error("No image found on Unsplash");
    }

    const imageUrl =
      unsplashResponse.data.results[0].urls.regular;

    

    // 4️⃣ Return Cloudinary URL
    return imageUrl;

  } catch (error) {
    console.error("Image processing error:", error.message);
    return null;
  }
};


// // 🆕 IMAGE GENERATION (BASE64)
// export const generateCourseImage = async (topic) => {
//   try {
//     const response = await genAI.models.generateImages({
//         model: "imagen-3.0-generate-001",
//         prompt: `Create a modern, clean, flat educational illustration about ${topic}, no text`,
//         size: "512x512",
//     });

//     if (!response.generatedImages?.length) {
//         throw new Error("No image generated");
//     }

//     const base64Image = response.generatedImages[0].image.imageBytes;

//     return base64Image;
//   } catch (error) {
//     console.error('Error generating image with Gemini API:', error);
//     throw new Error(error.message || 'Failed to generate image with Gemini AI');
//   }
  
// };




