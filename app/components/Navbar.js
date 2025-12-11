"use client";
import React, { useState, useEffect } from "react";
import { PhoneCall, HouseHeart, Menu, X } from "lucide-react";

const Navbar = ({ theme = "dark" }) => {
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);

    // COLORS BASED ON THEME
    const textColor = theme === "dark" ? "text-white" : "text-[#172023]";
    const iconColor = theme === "dark" ? "text-white" : "text-[#172023]";
    const menuBtnBg = theme === "dark" ? "bg-white" : "bg-[#172023]";
    const menuBtnTextColor = theme === "dark" ? "text-[#172023]" : "text-white";

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            const userRole = localStorage.getItem("userRole"); // 👈 ROLE HERE

            setIsLoggedIn(Boolean(token));
            setRole(userRole); // sets "agent" or "user"
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsLoggedIn(false);
        setRole(null);
        setOpen(false);
    };

    return (
        <>
            {/* NAVBAR */}
            <div className="w-full py-10 flex justify-center">
                <div className="w-full max-w-[1400px] flex justify-between items-center px-4">

                    {/* Logo */}
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => window.location.href = '/home'}
                    >
                        <HouseHeart className={`${iconColor}`} />
                        <h1 className={`${textColor} text-2xl font-semibold font-bricolage`}>
                            Homely
                        </h1>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-6">

                        {/* Phone */}
                        <div className="hidden sm:flex items-center gap-2">
                            <PhoneCall className={`${iconColor}`} />
                            <p className={`${textColor} text-base font-semibold font-bricolage`}>
                                +1-212-456-7890
                            </p>
                        </div>

                        <div className={`hidden sm:block w-1 h-9 ${theme === "dark" ? "bg-white" : "bg-[#172023]"} rounded-full`}></div>

                        {/* Menu Button */}
                        <button
                            onClick={() => setOpen(true)}
                            className={`h-12 px-5 rounded-full flex items-center gap-3 ${menuBtnBg}`}
                        >
                            <Menu className={`${menuBtnTextColor}`} />
                            <span className={`${menuBtnTextColor} text-base font-semibold font-bricolage`}>
                                Menu
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* OVERLAY */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                ></div>
            )}

            {/* RIGHT SLIDER */}
            <div
                className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-2xl z-[1000] transform
                    ${open ? "translate-x-0" : "translate-x-full"}
                    transition-transform duration-300`}
            >
                {/* Close Button */}
                <div className="flex justify-between items-center p-5 border-b">
                    <h2 className="text-xl font-semibold text-[#172023] font-bricolage">
                        Menu
                    </h2>
                    <button onClick={() => setOpen(false)}>
                        <X className="text-black" />
                    </button>
                </div>

                {/* MENU ITEMS */}
                <div className="flex flex-col gap-6 p-6">

                    <a href="/properties" className="text-lg font-semibold text-[#172023] hover:opacity-70">
                        Properties
                    </a>

                    <a href="/bookingList" className="text-lg font-semibold text-[#172023] hover:opacity-70">
                        Booking
                    </a>

                    {/* ------------------------------------- */}
                    {/* AGENT-ONLY MENU OPTIONS */}
                    {/* ------------------------------------- */}
                    {role === "agent" && (
                        <>
                            <div className="border-b my-2"></div>

                            <a href="/addProperty" className="text-lg font-semibold text-blue-700 hover:opacity-70">
                                ➕ Add Property
                            </a>

                            <a href="/updateproperty" className="text-lg font-semibold text-blue-700 hover:opacity-70">
                                ✏️ Update Property
                            </a>

                            <a href="/bookinglist" className="text-lg font-semibold text-blue-700 hover:opacity-70">
                                📄 Booking List
                            </a>
                        </>
                    )}

                    {/* AUTH BUTTONS */}
                    {!isLoggedIn ? (
                        <>
                            <a href="/login" className="text-lg font-semibold text-[#172023] hover:opacity-70">
                                Login
                            </a>

                            <a href="/signup" className="text-lg font-semibold text-[#172023] hover:opacity-70">
                                Signup
                            </a>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="text-lg font-semibold text-red-600 hover:opacity-70 text-left"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
