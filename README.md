# Homely: Full-Stack Real Estate Platform

Homely is a modern, full-stack real estate application designed to connect property buyers/renters (Users) with agents managing listings. It supports multiple user roles, secure authentication with OTP, comprehensive property management features, and an integrated booking system.

## 🛠️ Tech Stack

* **Frontend Framework:** Next.js 16 (App Router), React 19
* **Styling:** Tailwind CSS, `styled-jsx`
* **Database/ORM:** MongoDB via Mongoose 9
* **Authentication & Security:** JSON Web Tokens (JWT), `bcryptjs` for password hashing.
* **Email & OTP:** `nodemailer` is used for secure user registration via One-Time Passwords (OTP) and booking status updates.
* **Image Storage:** Cloudinary for robust media hosting.
* **Icons:** Lucide React

## ✨ Features

### User Capabilities (Role: `user`)

* **Property Browsing:** View all listed properties and detailed property pages.
* **Favorites:** Add and remove properties from a personal favorites list.
* **Booking:** Schedule property visits with an integrated calendar and check for existing bookings.
* **Agent Rating:** Rate the associated real estate agent after viewing a property.
* **Booking Management:** View a list of scheduled bookings and cancel pending visits.

### Agent Capabilities (Role: `agent`)

* **Property Creation:** Add new property listings complete with multiple images, details, and specifications.
* **Listing Management:** View all properties listed by the agent.
* **Update & Delete:** Modify property status (`available`, `sold`, `rented`) and delete properties.
* **Booking Status:** View all bookings made on their properties and update the booking status (e.g., to `booked` or `cancel`), triggering an email notification to the user.

### Authentication & Security

* **User/Agent Registration:** Multi-step signup process requiring email verification via OTP.
* **Login:** Secure login using email and password, generating a JWT for session management.
* **Role-Based Access Control (RBAC):** Next.js Middleware (`proxy.js`) protects API routes, ensuring only logged-in users and agents can access specific endpoints (e.g., only agents can update property status or create properties).

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [your-repo-link]
    cd realestate
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Setup Environment Variables:**
    Create a `.env.local` file in the root directory and add the following variables:
    ```env
    # MongoDB connection string (see app/db.js)
    MONGODB_URI=your_mongodb_connection_string

    # JWT Secret for token signing (see app/api/User/UserLogin/route.js)
    JWT_SECRET=your_secret_key_for_jwt

    # Nodemailer credentials for OTP and Booking Emails (see app/utils/sendEmail.js)
    MAIL_USER=your_email@gmail.com
    MAIL_PASS=your_app_password

    # Cloudinary credentials for image uploads (see app/api/property/createProperty/route.js)
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser.