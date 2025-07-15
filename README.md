# my_person_Ai
# 🤖 AI Assistant - ChatGPT Clone (MERN Stack)

![Project Screenshot](./screenshot.png) <!-- Add your screenshot here -->
![ai1](https://github.com/user-attachments/assets/37f008b9-c2e1-435f-abca-e2a18afe73f5)
![ai2](https://github.com/user-attachments/assets/98a02054-f594-4621-92c1-3ef819f9de18)
![ai3](https://github.com/user-attachments/assets/564deea5-9df2-48bc-b1f1-0234f51499c3)
![ai4](https://github.com/user-attachments/assets/0bc14c8f-4e4a-4583-b5b5-c1354e957604)


A full-featured ChatGPT-like AI assistant built with the MERN stack (MongoDB, Express, React, Node.js) with modern UI and responsive design.

## ✨ Features

- 🗣️ ChatGPT-like conversational interface
- 📱 Responsive design (works on mobile & desktop)
- 🔐 JWT Authentication
- 📝 Markdown support in messages
- 🌈 Syntax highlighting for code blocks
- 🔄 Real-time streaming responses
- 📤📥 Conversation history
- 🔍 Context-aware follow-up questions
- 📧 Email notifications
- 🎨 Tailwind CSS for styling
- ⚡ Vite for ultra-fast development

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

## 📦 Dependencies

### Frontend
- `react` & `react-dom` (v19)
- `react-router-dom` for navigation
- `axios` for API calls
- `react-markdown` for message rendering
- `react-syntax-highlighter` for code blocks
- `tailwindcss` for styling
- `react-hot-toast` for notifications
- `react-icons` for icons

### Backend
- `express` for server framework
- `mongoose` for MongoDB ODM
- `jsonwebtoken` for authentication
- `cors` for cross-origin requests
- `nodemailer` for email functionality
- `dotenv` for environment variables

## 🚀 Installation

# Frontend setup
cd frontend && npm install

# Backend setup
cd ../backend && npm install
# .env file
# Server Configuration
PORT=5000

# Database Configuration
DB_URL=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/ai-assistant?retryWrites=true&w=majority

# Authentication
JWT_SEC=your_super_strong_jwt_secret_here
ACTIVATION_SEC=your_activation_secret_here

# Email Service (for notifications)
EMAIL=your.email@service.com
PASSWORD=your_app_specific_password
