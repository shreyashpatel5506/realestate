🏡 RealEstate Platform – Full Stack Property Listing Application

A modern full-stack real estate web application that allows users to list, browse, and manage properties with secure authentication, role-based access, and cloud media handling.

This project demonstrates real-world full-stack development, including authentication flows, database modeling, and scalable frontend architecture.

🔗 Live Demo

🌐 (Add deployed link here – Render / Vercel)

🖼️ Screenshots
/screenshots
 ├── homepage.png
 ├── property-listing.png
 ├── property-details.png
 ├── dashboard.png
 ├── auth.png


📌 Screenshots significantly increase recruiter interest — add them.

✨ Features

🔐 Secure Authentication (JWT + OTP)

👤 Role-based Access (User / Admin)

🏠 Property Listing & Management

📸 Image Upload with Cloudinary

🔍 Property Search & Filters

📱 Responsive UI

⚡ Optimized API performance

🧠 Tech Stack
Frontend

Next.js 16

React.js

JavaScript

Tailwind CSS / CSS Modules

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Cloud & Tools

Cloudinary (image storage)

Render / Vercel (deployment)

🏗️ System Architecture
Client (Next.js)
   |
   |  API Requests
   v
Backend (Node + Express)
   |
   |  Auth / Data
   v
MongoDB


Frontend handles UI, routing, and state

Backend manages authentication, business logic, and database

Cloudinary stores property images securely

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/shreyashpatel5506/realestate.git
cd realestate

2️⃣ Install Dependencies
Backend
cd backend
npm install

Frontend
cd frontend
npm install

🔐 Environment Variables

Create .env files:

Backend .env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

Frontend .env
NEXT_PUBLIC_API_URL=http://localhost:5000

🚀 Running the Application
Backend
npm run dev

Frontend
npm run dev


Access app:

Frontend → http://localhost:3000

Backend → http://localhost:5000

📁 Folder Structure
realestate/
├── frontend/
│   ├── app/
│   ├── components/
│   └── styles/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── middleware/
└── README.md

🛠️ Future Improvements

🧪 Unit & integration tests

🗺️ Map-based property search

💬 User-agent chat

📊 Admin analytics dashboard

🔄 CI/CD with GitHub Actions

🤝 Contributing

Contributions are welcome!

Fork the repository

Create a feature branch

Commit changes with clear messages

Open a Pull Request

📄 License

This project is licensed under the MIT License.

⭐ Why This Project Matters

Real-world full-stack use case

Production-style architecture

Scalable and extensible

Strong portfolio signal for React / Full-Stack roles