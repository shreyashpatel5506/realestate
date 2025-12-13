 "use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { Calendar } from "lucide-react";
import ImageGallery from "@/app/components/ImageGallery";

export default function BookingPage() {
    const { propertyid } = useParams();
    const pid = propertyid;

    const [property, setProperty] = useState(null);
    const [VisitDate, setVisitDate] = useState("");
    const [loading, setLoading] = useState(false);

    const [showSoldModal, setShowSoldModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [alreadyBooked, setAlreadyBooked] = useState(false);

    /* ---------------- FETCH PROPERTY ---------------- */
    useEffect(() => {
        async function fetchProperty() {
            try {
                const res = await fetch(
                    `/api/property/getsingleproperty?pid=${pid}`,
                    { cache: "no-store" }
                );
                const data = await res.json();

                if (data.success) {
                    setProperty(data.property);
                    if (data.property.status === "sold") {
                        setShowSoldModal(true);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }

        async function checkAlreadyBooked() {
            try {
                const res = await fetch(`/api/booking/getbooking`, {
                    headers: {
                        userId: localStorage.getItem("userId"),
                    },
                });

                const data = await res.json();

                if (data.success) {
                    const exists = data.data.some(
                        (b) => b.property?._id === pid
                    );
                    setAlreadyBooked(exists);
                }
            } catch (err) {
                console.log(err);
            }
        }

        if (pid) {
            fetchProperty();
            checkAlreadyBooked();
        }
    }, [pid]);

    /* ---------------- SUBMIT BOOKING ---------------- */
    async function handleSubmit(e) {
        e.preventDefault();

        if (alreadyBooked || property?.status === "sold") return;

        setLoading(true);

        try {
            const res = await fetch(`/api/booking/addbooking?pid=${pid}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    userId: localStorage.getItem("userId"),
                },
                body: JSON.stringify({
                    VisitDate,
                    status: "pending",
                }),
            });

            const data = await res.json();
            setLoading(false);

            if (data.success) {
                setSuccessModal(true);

                setTimeout(() => {
                    window.location.href = "/bookingList";
                }, 2000);
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <Navbar theme="light" />

            {/* -------- SOLD MODAL -------- */}
            {showSoldModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">
                            Property Sold
                        </h2>
                        <p className="text-gray-600 mb-6">
                            This property is already sold. You cannot book a visit.
                        </p>
                        <button
                            onClick={() => (window.location.href = "/properties")}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            )}

            {/* -------- SUCCESS MODAL -------- */}
            {successModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-scaleIn">
                        <div className="mx-auto mb-4 h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-3xl">✅</span>
                        </div>
                        <h2 className="text-2xl font-bold text-green-600 mb-2">
                            Booking Confirmed!
                        </h2>
                        <p className="text-gray-600 mb-2">
                            Your visit has been scheduled successfully.
                        </p>
                        <p className="text-sm text-gray-400">
                            Redirecting to your bookings...
                        </p>
                    </div>
                </div>
            )}

            {/* -------- MAIN CONTENT -------- */}
            <div className="max-w-5xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">
                    Book a Property Visit
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* PROPERTY DETAILS */}
                    <div className="lg:col-span-2">
                        {property ? (
                            <div className="bg-white rounded-2xl shadow-md p-6 border">
                                <h2 className="text-2xl text-black font-bold mb-2">
                                    {property.title}
                                </h2>
                        <p className="text-gray-600 text-lg mt-1">
                    {property.city}, {property.state}
                </p>
                                <ImageGallery images={property.images} />

                                <p className="mt-4 text-gray-700">
                                    {property.description}
                                </p>

                                <p className="mt-3 text-2xl font-bold text-green-600">
                                    ₹ {property.price}
                                </p>

                                <p className="mt-2 font-semibold text-red-600">
                                    Status: {property.status}
                                </p>
                            </div>
                        ) : (
                            <p className="text-gray-500">Loading property...</p>
                        )}
                    </div>

                    {/* BOOKING FORM */}
                    <div className="text-black">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white rounded-2xl shadow-xl p-6 border sticky top-24"
                        >
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Calendar size={22} /> Schedule a Visit
                            </h3>

                            {alreadyBooked && (
                                <div className="mb-4 bg-blue-50 text-blue-700 px-4 py-3 rounded-lg text-sm font-medium">
                                    ✅ You have already booked this property.
                                </div>
                            )}

                            <label className="block mb-2 font-medium text-gray-700">
                                Select Visit Date
                            </label>

                            <div className="relative mb-6">
                                <Calendar
                                    size={18}
                                    className="absolute left-3 top-3 text-gray-400"
                                />
                                <input
                                    type="date"
                                    value={VisitDate}
                                    onChange={(e) =>
                                        setVisitDate(e.target.value)
                                    }
                                    disabled={alreadyBooked}
                                    required
                                    className={`w-full pl-10 px-4 py-3 rounded-xl border-2 bg-gray-50 transition
                                    ${
                                        alreadyBooked
                                            ? "opacity-50 cursor-not-allowed"
                                            : "border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    }`}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || alreadyBooked}
                                className={`w-full py-3 rounded-lg text-lg font-medium transition
                                ${
                                    alreadyBooked
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                            >
                                {alreadyBooked
                                    ? "Already Booked"
                                    : loading
                                    ? "Booking..."
                                    : "Book Visit"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
