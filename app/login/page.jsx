"use client";
import { useState } from "react";
import Image from "next/image";
import background from "../../public/backgroundimageHome.png";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            return toast.error("Please fill all fields");
        }

        try {
            const res = await fetch("/api/User/UserLogin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!data.success) {
                return toast.error(data.message);
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("userRole", data.user.role);
            localStorage.setItem("userName", data.user.name);

            console.log(localStorage.getItem("token"))
            console.log(localStorage.getItem("userId"))

            toast.success("Login successful!");

            router.push("/home");

        } catch (error) {
            toast.error("Something went wrong");
        }
    };


    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Background */}
            <Image
                src={background}
                alt="Background"
                fill
                priority
                className="object-cover brightness-75"
            />

            {/* Navbar */}
            <div className="absolute top-0 left-0 w-full z-30">
                <Navbar />
            </div>

            {/* CARD */}
            <div className="relative z-20 w-full max-w-lg p-6">
                <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl p-10 rounded-2xl text-white animate-fadeIn">

                    <h2 className="text-3xl font-bold text-center mb-6">
                        Welcome Back 👋
                    </h2>

                    <div className="space-y-6">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            onClick={handleLogin}
                            className="btn-primary"
                        >
                            Login
                        </button>

                        <p className="text-center text-sm text-gray-200 mt-2">
                            Don’t have an account?
                            <a href="/signup" className="text-blue-300 hover:text-blue-400 font-semibold ml-1">
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* CSS */}
            <style>{`
                .input {
                    width: 100%;
                    padding: 12px;
                    border-radius: 8px;
                    background: rgba(255,255,255,0.2);
                    border: 1px solid rgba(255,255,255,0.3);
                    font-weight: 500;
                    color: white;
                    outline: none;
                    transition: 0.3s;
                }
                .input::placeholder {
                    color: #e5e5e5;
                }
                .input:focus {
                    border-color: #60a5fa;
                    background: rgba(255,255,255,0.3);
                }
                .btn-primary {
                    width: 100%;
                    padding: 12px;
                    background: #2563eb;
                    border-radius: 10px;
                    font-weight: bold;
                    color: white;
                    transition: 0.3s;
                }
                .btn-primary:hover {
                    background: #1d4ed8;
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0px); }
                }
            `}</style>
        </div>
    );
}
