"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { Calendar } from "lucide-react";

export default function BookingPage() {
    const { propertyid } = useParams();
    const pid = propertyid;

    const [property, setProperty] = useState(null);
    const [visitDate, setVisitDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    // Fetch property details
    useEffect(() => {
        async function fetchProperty() {
            try {
                const res = await fetch(`/api/property/getsingleproperty?pid=${pid}`, {
                    cache: "no-store",
                });

                const data = await res.json();
                if (data.success) setProperty(data.property);
            } catch (error) {
                console.log(error);
            }
        }
        if (pid) fetchProperty();
    }, [pid]);

    // Handle booking form submit
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMsg("");

        try {
            const res = await fetch(`/api/booking/addbooking?pid=${pid}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ visitDate, status: "pending" }),
            });

            const data = await res.json();
            setLoading(false);

            if (data.success) {
                setMsg("🎉 Booking Successful!");
                setVisitDate("");
            } else {
                setMsg(data.message || "Something went wrong!");
            }
        } catch (error) {
            setLoading(false);
            setMsg("❌ Server error!");
        }
    }

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <Navbar theme="light" />

            <div className="max-w-5xl mx-auto px-6 py-10">

                <h1 className="text-3xl font-bold mb-8 text-gray-800">
                    Book a Property Visit
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* LEFT — PROPERTY DETAILS */}
                    <div className="lg:col-span-2">
                        {property ? (
                            <div className="bg-white rounded-2xl shadow-md p-6 border">
                                <h2 className="text-2xl font-bold mb-3 text-gray-900">
                                    {property.title}
                                </h2>

                                <p className="text-gray-600 mb-4">{property.location}</p>

                                <img
                                    src={property.image || property.images?.[0]}
                                    alt="property"
                                    className="w-full h-72 object-cover rounded-xl shadow-sm"
                                />

                                <p className="mt-4 text-gray-700 leading-relaxed">
                                    {property.description}
                                </p>

                                <p className="mt-3 text-2xl font-bold text-green-600">
                                    ₹ {property.price}
                                </p>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">Loading property...</p>
                        )}
                    </div>

                    {/* RIGHT — BOOKING FORM */}
                    <div>
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white rounded-2xl shadow-xl p-6 border sticky top-24"
                        >
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                                <Calendar size={22} /> Schedule a Visit
                            </h3>

                            <label className="block mb-2 font-medium text-gray-700">
                                Select Visit Date:
                            </label>

                            <input
                                type="date"
                                value={visitDate}
                                onChange={(e) => setVisitDate(e.target.value)}
                                className="w-full border px-3 py-2 rounded-lg mb-6  text-black bg-gray-50 focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
                            >
                                {loading ? "Booking..." : "Book Visit"}
                            </button>

                            {msg && (
                                <p className="mt-4 text-center font-semibold text-gray-800">
                                    {msg}
                                </p>
                            )}
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
