# AI Tutor – Full Stack Learning Platform

A full-stack AI-powered learning platform that allows users to generate structured courses, view AI-generated educational content, upload media, and manage learning resources.

Built using **React (Vite)** on the frontend and **Node.js + Express + MongoDB** on the backend, with integrations for **Gemini AI**, **Cloudinary**, **Unsplash**, **YouTube API**, and email services.

---

## Overview

AI Tutor is a dynamic educational platform where users can:

* Sign up / Log in securely
* Generate AI-powered structured courses
* View lesson-wise deep learning content
* Automatically generate course thumbnails
* Fetch relevant YouTube videos
* Upload media files
* Receive email notifications

---

## High-Level Architecture

```
Frontend (React + Vite)
        ↓
REST API Calls (Axios)
        ↓
Backend (Express Server)
        ↓
Services Layer (Gemini, Cloudinary, Unsplash, YouTube)
        ↓
MongoDB Database
```

---

# Frontend (Vite + React)

----Location:--- `Frontend/`

## Tech Stack

* React
* Vite
* Axios
* Context API (AuthProvider)
* TailwindCSS / DaisyUI

## Key Features

* Authentication UI (Login / Signup)
* Course Dashboard
* Course Structure Viewer
* Learning Content Viewer
* Course Generation Form
* Protected Routes

## Important Files

```
Frontend/src/main.jsx
Frontend/src/context/AuthProvider.jsx
Frontend/src/api/axios.js
Frontend/src/pages/
```

## Auth Handling

* Auth state managed via `AuthProvider`
* User info stored in `localStorage`
* Protected routes redirect unauthenticated users

---

# ⚙ Backend (Node.js + Express)

---Location:--- `Backend/`

## Tech Stack

* Express
* MongoDB (Mongoose)
* JWT Authentication
* Gemini AI API
* Cloudinary
* Unsplash API
* YouTube API
* Multer (file uploads)
* Nodemailer (email)

---

## 📂 Backend Structure

```
Backend/
│
├── controller/
├── services/
├── model/
├── middleware/
├── config/
├── uploads/
└── index.js
```

---

# Authentication Flow

1. User signs up or logs in.
2. Backend verifies credentials.
3. JWT token is issued.
4. Frontend stores user data and updates context.
5. Protected routes verify token via middleware.

---

# AI Content Generation (Gemini)

Frontend sends structured prompt to:

```
POST /api/ai/gemini
POST /api/ai/learning-resources
```

Backend:

* Calls `geminiService`
* Forces JSON mode output
* Parses and validates response
* Stores structured course content in MongoDB

---

# Course & Content Management

### MongoDB Models

* `User`
* `Course`
* `Content`

### Features

* Create course
* Store structured subtopics
* Fetch course list
* View course details
* Save AI-generated lessons

---

# Image Flow (Unsplash → Cloudinary)

1. Fetch topic-based image from Unsplash
2. Download image as buffer
3. Upload to Cloudinary
4. Store Cloudinary URL in MongoDB
5. Render optimized image on frontend

---

# YouTube Integration

Backend generates contextual YouTube search queries and fetches relevant videos using YouTube Data API.

---

# File Uploads

* Handled via `multer`
* Files saved locally under `uploads/`
* Optionally uploaded to Cloudinary
* Backend returns accessible URLs

---

# Email Integration

Uses SMTP credentials to send:

* Notifications
* Password reset emails (if implemented)

---

# Environment Variables (Backend/.env)

```env
MONGO_URI=
JWT_SECRET=
GEMINI_API_KEY=
YOUTUBE_API_KEY=
UNSPLASH_ACCESS_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL_USER=
EMAIL_PASS=
```

---

# Getting Started

## Clone the Repository

```bash
git clone <repo-url>
cd AI-Tutor
```

---

##  Setup Backend

```bash
cd Backend
npm install
```

Create `.env` file with required variables.

Run:

```bash
node index.js
```

---

##  Setup Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:8000
```

# Key Learning Concepts Demonstrated

* RESTful API design
* JWT authentication
* Context-based auth state management
* AI prompt engineering
* JSON-mode structured AI output
* External API integration
* File uploads with Multer
* Cloudinary CDN usage
* Async/await architecture
* Clean service/controller separation

---

# Tech Stack Summary

| Layer          | Technology   |
| -------------- | ------------ |
| Frontend       | React + Vite |
| Backend        | Express      |
| Database       | MongoDB      |
| Authentication | JWT          |
| AI             | Gemini API   |
| Image Source   | Unsplash     |
| Image Hosting  | Cloudinary   |
| Video          | YouTube API  |
| Email          | Nodemailer   |

---

# Future Improvements

* Refresh token authentication
* Role-based access
* Course progress tracking
* Rate limiting
* AI cost optimization
