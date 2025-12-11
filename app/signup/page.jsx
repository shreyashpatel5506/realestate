"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import background from "../../public/backgroundimageHome.png";
import { toast } from "react-toastify";

export default function Signup() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        role: "",
        password: "",
        confirmPassword: "",
    });

    const sendOtp = async () => {
        if (!email.trim()) {
            toast.error("Please enter your email");
            return;
        }

        try {
            const response = await fetch("/api/User/sendOtp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (!data.success) return toast.error(data.message);

            toast.success("OTP sent successfully!");
            setStep(2);
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const verifyOtp = async () => {
        if (!otp.trim()) return toast.error("Please enter OTP");

        try {
            const response = await fetch("/api/User/verifyotp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();
            if (!data.success) return toast.error(data.message);

            toast.success("OTP verified!");
            setStep(3);
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const createAccount = async () => {
        const { name, phoneNumber, role, password, confirmPassword } = formData;

        if (!name || !phoneNumber || !role || !password || !confirmPassword)
            return toast.error("Please fill all fields");

        if (password !== confirmPassword)
            return toast.error("Passwords do not match");

        try {
            const response = await fetch("/api/User/UserCreate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phoneNumber, role, password }),
            });

            const data = await response.json();
            if (!data.success) return toast.error(data.message);

            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("userRole", data.user.role);
            localStorage.setItem("userName", data.user.name);

            toast.success("Account created successfully!");
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
                <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl p-10 rounded-2xl text-white">

                    {/* STEP BAR */}
                    <div className="flex justify-between mb-10">
                        {[1, 2, 3].map((num) => (
                            <div key={num} className="flex flex-col items-center flex-1">
                                <div
                                    className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-all
                                    ${step >= num ? "bg-blue-600 shadow-lg" : "bg-gray-500/40"}`}
                                >
                                    {num}
                                </div>
                                <p
                                    className={`mt-2 text-sm font-semibold ${step >= num ? "text-blue-300" : "text-gray-300"
                                        }`}
                                >
                                    {num === 1 && "Send OTP"}
                                    {num === 2 && "Verify OTP"}
                                    {num === 3 && "Details"}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* STEP 1 */}
                    {step === 1 && (
                        <div className="space-y-5 animate-fadeIn">
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <button
                                onClick={sendOtp}
                                className="btn-primary"
                            >
                                Send OTP
                            </button>
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div className="space-y-5 animate-fadeIn">
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                className="input"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />

                            <button
                                onClick={verifyOtp}
                                className="btn-primary"
                            >
                                Verify OTP
                            </button>

                            <button
                                onClick={() => setStep(1)}
                                className="text-blue-300 hover:text-blue-400 underline"
                            >
                                Change Email
                            </button>
                        </div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <div className="space-y-5 animate-fadeIn">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="input"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                            />

                            <input
                                type="text"
                                placeholder="Phone Number"
                                className="input"
                                value={formData.phoneNumber}
                                onChange={(e) =>
                                    setFormData({ ...formData, phoneNumber: e.target.value })
                                }
                            />

                            <select
                                className="input"
                                value={formData.role}
                                onChange={(e) =>
                                    setFormData({ ...formData, role: e.target.value })
                                }
                            >
                                <option value="">Select Role</option>
                                <option value="user">User</option>
                                <option value="agent">Agent</option>
                            </select>


                            <input
                                type="password"
                                placeholder="Password"
                                className="input"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                            />

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="input"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({ ...formData, confirmPassword: e.target.value })
                                }
                            />

                            <button
                                onClick={createAccount}
                                className="btn-success"
                            >
                                Create Account
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .input {
                    width: 100%;
                    padding: 12px;
                    border-radius: 8px;
                    background: rgba(255,255,255,0.2);
                    border: 1px solid rgba(255,255,255,0.3);
                    font-weight: 500;
                    transition: 0.3s;
                    color: grey;
                    backdrop-filter: blur(4px);
                    outline: none;
                }
                .input::placeholder {
                    color: #e5e5e5;
                }
                .btn-primary {
                    width: 100%;
                    padding: 12px;
                    background: #2563eb;
                    border-radius: 8px;
                    font-weight: bold;
                    color: white;
                    transition: 0.3s;
                }
                .btn-primary:hover {
                    background: #1d4ed8;
                }
                .btn-success {
                    width: 100%;
                    padding: 12px;
                    background: #16a34a;
                    border-radius: 8px;
                    font-weight: bold;
                    color: white;
                    transition: 0.3s;
                }
                .btn-success:hover {
                    background: #15803d;
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
