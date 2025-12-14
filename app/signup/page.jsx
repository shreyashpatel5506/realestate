"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import background from "../../public/backgroundimageHome.png";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        role: "",
        password: "",
        confirmPassword: "",
    });

    // STEP 1: SEND OTP
    const sendOtp = async () => {
        if (!email.trim()) return toast.error("Please enter your email");

        setLoading(true);

        try {
            const response = await fetch("/api/User/sendOtp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (!data.success) {
                setLoading(false);
                return toast.error(data.message);
            }

            toast.success("OTP sent successfully!");
            setStep(2);
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // STEP 2: VERIFY OTP
    const verifyOtp = async () => {
        if (!otp.trim()) return toast.error("Please enter OTP");

        setLoading(true);

        try {
            const response = await fetch("/api/User/verifyotp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();
            if (!data.success) {
                setLoading(false);
                return toast.error(data.message);
            }

            toast.success("OTP verified!");
            setStep(3);
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // STEP 3: CREATE ACCOUNT
    const createAccount = async () => {
        const { name, phoneNumber, role, password, confirmPassword } = formData;

        if (!name || !phoneNumber || !role || !password || !confirmPassword)
            return toast.error("Please fill all fields");

        if (password !== confirmPassword)
            return toast.error("Passwords do not match");

        setLoading(true);

        try {
            const response = await fetch("/api/User/UserCreate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phoneNumber, role, password }),
            });

            const data = await response.json();
            if (!data.success) {
                setLoading(false);
                return toast.error(data.message);
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("userRole", data.user.role);
            localStorage.setItem("userName", data.user.name);

            toast.success("Account created successfully!");
            router.push("/");
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
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
                                    className={`w-10 h-10 flex items-center justify-center rounded-full font-bold
                                    ${step >= num ? "bg-blue-600" : "bg-gray-500/40"}`}
                                >
                                    {num}
                                </div>
                                <p className="mt-2 text-sm">
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
                                disabled={loading}
                            />

                            <button
                                onClick={sendOtp}
                                disabled={loading}
                                className="btn-primary flex justify-center items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="loader"></span>
                                        Sending OTP...
                                    </>
                                ) : (
                                    "Send OTP"
                                )}
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
                                disabled={loading}
                            />

                            <button
                                onClick={verifyOtp}
                                disabled={loading}
                                className="btn-primary flex justify-center items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="loader"></span>
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify OTP"
                                )}
                            </button>

                            <button
                                onClick={() => setStep(1)}
                                className="text-blue-300 underline"
                                disabled={loading}
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
                                disabled={loading}
                            />

                            <input
                                type="text"
                                placeholder="Phone Number"
                                className="input"
                                value={formData.phoneNumber}
                                onChange={(e) =>
                                    setFormData({ ...formData, phoneNumber: e.target.value })
                                }
                                disabled={loading}
                            />

                            <select
                                className="input"
                                value={formData.role}
                                onChange={(e) =>
                                    setFormData({ ...formData, role: e.target.value })
                                }
                                disabled={loading}
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
                                disabled={loading}
                            />

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="input"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({ ...formData, confirmPassword: e.target.value })
                                }
                                disabled={loading}
                            />

                            <button
                                onClick={createAccount}
                                disabled={loading}
                                className="btn-success flex justify-center items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="loader"></span>
                                        Creating Account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </div>
                    )}
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
                    color: white;
                    outline: none;
                }
                .btn-primary, .btn-success {
                    width: 100%;
                    padding: 12px;
                    font-weight: bold;
                    color: white;
                    border-radius: 8px;
                }
                .btn-primary { background: #2563eb; }
                .btn-success { background: #16a34a; }
                .loader {
                    width: 18px;
                    height: 18px;
                    border: 3px solid rgba(255,255,255,0.3);
                    border-top: 3px solid white;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
