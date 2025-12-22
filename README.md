<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RealEstate Platform</title>
</head>
<body>

<h1>🏡 RealEstate Platform</h1>

<p>
A modern full-stack real estate web application that allows users to list,
browse, and manage properties with secure authentication and cloud-based image handling.
</p>

<p>
<strong>Tech:</strong> Full Stack • Next.js • Node.js • MongoDB
</p>

<hr>

<h2>🔗 Live Demo</h2>
<p>
<a href="https://homely-sage.vercel.app/" target="_blank">
https://homely-sage.vercel.app/
</a>
</p>

<hr>

<h2>✨ Features</h2>
<ul>
  <li>JWT & OTP based authentication</li>
  <li>Role-based access (User / Admin)</li>
  <li>Property listing & management</li>
  <li>Image uploads using Cloudinary</li>
  <li>Search and filter functionality</li>
  <li>Responsive UI</li>
</ul>

<hr>

<h2>🧠 Tech Stack</h2>

<h3>Frontend</h3>
<ul>
  <li>Next.js 16</li>
  <li>React.js</li>
  <li>JavaScript</li>
  <li>Tailwind CSS</li>
</ul>

<h3>Backend</h3>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>MongoDB (Mongoose)</li>
  <li>JWT Authentication</li>
</ul>

<hr>

<h2>🏗️ Architecture</h2>
<pre>
Client (Next.js)
   |
   | API Requests
   v
Backend (Node + Express)
   |
   | Data / Auth
   v
MongoDB
</pre>

<hr>

<h2>⚙️ Installation & Setup</h2>

<h3>1. Clone Repository</h3>
<pre>
git clone https://github.com/shreyashpatel5506/realestate.git
cd realestate
</pre>

<h3>2. Install Dependencies</h3>
<pre>
cd backend
npm install

cd ../frontend
npm install
</pre>

<hr>

<h2>🔐 Environment Variables</h2>

<h3>Backend (.env)</h3>
<pre>
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
</pre>

<h3>Frontend (.env)</h3>
<pre>
NEXT_PUBLIC_API_URL=http://localhost:5000
</pre>

<hr>

<h2>🚀 Run Project</h2>
<pre>
# Backend
npm run dev

# Frontend
npm run dev
</pre>

<hr>


<hr>

<h2>🛠️ Future Improvements</h2>
<ul>
  <li>Unit & integration tests</li>
  <li>Map-based property search</li>
  <li>Admin analytics dashboard</li>
  <li>CI/CD with GitHub Actions</li>
</ul>

<hr>

<h2>📄 License</h2>
<p>
This project is licensed under the MIT License.
</p>

<hr>

<h2>⭐ Project Note</h2>
<p>
This is a serious full-stack portfolio project created to demonstrate real-world
application architecture and best practices.
</p>

</body>
</html>
