"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function BookingListPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchBookings() {
            try {
                const res = await fetch("/api/booking/getbooking", {
                    method: "GET",
                    headers: {
                        "userId": localStorage.getItem("userId"),
                    }
                });

                const data = await res.json();

                setBookings(Array.isArray(data.data) ? data.data : []);

            } catch (error) {
                console.log("Error fetching bookings:", error);
                setBookings([]);
            }

            setLoading(false);
        }

        fetchBookings();
    }, []);

    const deleteBooking = async (id) => {
        if (!confirm("Are you sure you want to cancel this booking?")) return;

        try {
            const res = await fetch(`/api/booking/deletebooking?bid=${id}`, {
                method: "DELETE",
                headers: {
                    "userId": localStorage.getItem("userId"),
                }
            });

            const data = await res.json();

            if (data.success) {
                // Remove deleted booking from UI
                setBookings((prev) => prev.filter((b) => b._id !== id));
            } else {
                alert("Failed to delete booking");
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <Navbar theme="light" />

            <div className="max-w-6xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">
                    My Bookings
                </h1>

                {loading && (
                    <p className="text-gray-500">Loading bookings...</p>
                )}

                {!loading && Array.isArray(bookings) && bookings.length === 0 && (
                    <p className="text-gray-600">No bookings found.</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.isArray(bookings) && bookings.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-2xl shadow-md border p-4 hover:shadow-lg transition relative"
                        >
                            {/* Delete Button */}
                            <button
                                onClick={() => deleteBooking(item._id)}
                                className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700"
                            >
                                Cancel
                            </button>

                            <img
                                src={item.property?.image || item.property?.images?.[0]}
                                className="w-full h-52 object-cover rounded-xl"
                                alt="property"
                            />

                            <h2 className="text-xl font-bold mt-4 text-gray-800">
                                {item.property?.title}
                            </h2>

                            <p className="text-gray-600 mb-2">
                                {item.property?.location}
                            </p>

                            <div className="mt-3 text-gray-700">
                                <p>
                                    <span className="font-semibold">Visit Date: </span>
                                    {item.VisitDate
                                        ? new Date(item.VisitDate).toISOString().split("T")[0]
                                        : "N/A"}
                                </p>

                                <p className="mt-1">
                                    <span className="font-semibold">Status: </span>
                                    <span
                                        className={
                                            item.status === "pending"
                                                ? "text-orange-600 font-semibold"
                                                : item.status === "cancel"
                                                    ? "text-red-600 font-semibold"
                                                    : "text-green-600 font-semibold"
                                        }
                                    >
                                        {item.status}
                                    </span>
                                </p>
                            </div>

                            <p className="mt-3 text-green-600 font-bold text-lg">
                                ₹ {item.property?.price}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
