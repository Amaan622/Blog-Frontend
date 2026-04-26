📚 Full Stack Blog Application (MERN)

A modern full-stack blog application built using MongoDB, Express, React, and Node.js (MERN) with authentication, image upload, likes/dislikes, and user profiles.


🚀 Live Demo
🌐 Frontend (Vercel):
https://blog-frontend-chi-neon.vercel.app
🔗 Backend (Render):
https://blog-53bs.onrender.com


🧑‍💻 Tech Stack
Frontend
React (Vite)
Axios
React Router
Tailwind CSS
React Icons

Backend
Node.js
Express.js
MongoDB Atlas
JWT Authentication
Multer (file upload)
CORS



Deployment
Frontend → Vercel
Backend → Render
Database → MongoDB Atlas

📁 Project Structure
Backend
Blog-Backend/
│── server.js
│── routes/
│── models/
│── middleware/
│── uploads/
│── .env
│── package.json


Frontend
Blog-Frontend/
│── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│── public/
│── vite.config.js
│── vercel.json
│── .env
│── package.json




⚙️ Environment Variables
Backend (.env)
PORT=5001
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret

AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=your_region
AWS_BUCKET_NAME=your_bucket


Frontend (.env)
VITE_API_URL=https://blog-53bs.onrender.com


🧪 Features
🔐 User Authentication (Login/Register)
📝 Create, Edit, Delete Blog Posts
❤️ Like / Dislike Posts
👤 User Profile Page
🖼 Image Upload Support
📱 Responsive UI
⚡ Fast API Integration


🛠️ Installation (Local Setup)
1️⃣ Clone Repository
Backend
git clone https://github.com/Amaan622/Blog.git
cd Blog
npm install

Frontend
git clone https://github.com/Amaan622/Blog-Frontend.git
cd Blog-Frontend
npm install



2️⃣ Run Backend
npm start

3️⃣ Run Frontend
npm run dev



🌐 Deployment Guide
Backend (Render)
Push backend code to GitHub
Go to Render Dashboard
Click New Web Service
Connect GitHub repo
Add environment variables
Build Command:
npm install
Start Command:
node server.js

Frontend (Vercel)
Push frontend code to GitHub
Go to Vercel Dashboard
Import GitHub repo
Add Environment Variable:
VITE_API_URL=https://your-backend-url.onrender.com
Framework: Vite
Output Directory:
dist


Deploy 🚀

🔥 Author

Md Amaan
MERN Stack Developer

📌 Notes
Backend must be deployed first (Render)
Then update frontend .env
Then redeploy frontend (Vercel)
Never push .env to GitHub





