<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

</head>
<body>

  <h1>🏡 RealEstate Platform</h1>
  <p>
    A modern <strong>full-stack real estate web application</strong> that allows users
    to list, browse, and manage properties with secure authentication and cloud-based
    image handling.
  </p>

  <span class="badge">Full Stack</span>
  <span class="badge">Next.js</span>
  <span class="badge">Node.js</span>
  <span class="badge">MongoDB</span>

  <section>
    <h2>🔗 Live Demo</h2>
    <p>https://homely-sage.vercel.app/</p>
  </section>

  <section>
    <h2>✨ Features</h2>
    <ul>
      <li>JWT & OTP based authentication</li>
      <li>Role-based access (User / Admin)</li>
      <li>Property listing & management</li>
      <li>Image uploads using Cloudinary</li>
      <li>Search and filter functionality</li>
      <li>Responsive UI</li>
    </ul>
  </section>

  <section>
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
  </section>

  <section>
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
  </section>

  <section>
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
  </section>

  <section>
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
  </section>

  <section>
    <h2>🚀 Run Project</h2>
    <pre>
# Backend
npm run dev

# Frontend
npm run dev
    </pre>
  </section>

  <section>
    <h2>📁 Folder Structure</h2>
    <pre>
realestate/
├── frontend/
├── backend/
└── README.html
    </pre>
  </section>

  <section>
    <h2>🛠️ Future Improvements</h2>
    <ul>
      <li>Unit & integration tests</li>
      <li>Map-based property search</li>
      <li>Admin analytics dashboard</li>
      <li>CI/CD with GitHub Actions</li>
    </ul>
  </section>

  <section>
    <h2>📄 License</h2>
    <p>This project is licensed under the <strong>MIT License</strong>.</p>
  </section>

  <section>
    <h2>⭐ Project Note</h2>
    <p>
      This is a <strong>serious full-stack portfolio project</strong> created to demonstrate
      real-world application architecture and best practices.
    </p>
  </section>

</body>
</html>
