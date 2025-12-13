"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    Pencil,
    Trash,
    Calendar,
    MapPin,
    User,
    X
} from "lucide-react";

export default function AgentBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/booking/getagentbookings", {
                method: "GET",
                headers: {
                    userId: localStorage.getItem("userId"),
                },
            });

            const data = await res.json();
            setBookings(Array.isArray(data.data) ? data.data : []);
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleOpenModal = (booking) => {
        setSelectedBooking(booking);
        setNewStatus(booking.status);
        setOpenModal(true);
    };

    const updateStatus = async () => {
        try {
            const res = await fetch(
                `/api/booking/statusbokkingchanged?bid=${selectedBooking._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        userId: localStorage.getItem("userId"),
                    },
                    body: JSON.stringify({ status: newStatus }),
                }
            );

            const data = await res.json();
            if (data.success) {
                fetchBookings();
                setOpenModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteBooking = async (id) => {
        if (!confirm("Are you sure you want to delete this booking?")) return;

        try {
            const res = await fetch(`/api/booking/deletebooking?bid=${id}`, {
                method: "DELETE",
                headers: {
                    userId: localStorage.getItem("userId"),
                },
            });

            const data = await res.json();
            if (data.success) fetchBookings();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <Navbar theme="light" />

            <div className="max-w-6xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">
                    Agent Bookings
                </h1>

                {loading && <p className="text-gray-500">Loading bookings...</p>}

                {!loading && bookings.length === 0 && (
                    <p className="text-gray-600">No bookings found.</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bookings.map((b) => (
                        <div
                            key={b._id}
                            className="bg-white rounded-2xl shadow-md border p-4 hover:shadow-lg transition relative"
                        >
                            {/* Action Buttons */}
                            <div className="absolute top-3 right-3 flex gap-2">
                                <button
                                    onClick={() => handleOpenModal(b)}
                                    className="bg-blue-600 text-white p-2 rounded-full"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={() => deleteBooking(b._id)}
                                    className="bg-red-600 text-white p-2 rounded-full"
                                >
                                    <Trash size={16} />
                                </button>
                            </div>

                            {/* Image */}
                            <img
                                src={b.property?.images?.[0]}
                                alt="property"
                                className="w-full h-48 object-cover rounded-xl"
                            />

                            {/* Property Info */}
                            <h2 className="text-xl font-bold mt-4 text-gray-800">
                                {b.property?.title}
                            </h2>

                            <p className="text-gray-600 flex items-center gap-2 mt-1">
                                <MapPin size={16} /> {b.property?.address}
                            </p>

                            <p className="text-gray-600 flex items-center gap-2 mt-1">
                                <User size={16} /> {b.user?.name}
                            </p>

                            <p className="text-gray-600 flex items-center gap-2 mt-1">
                                <Calendar size={16} />
                                {new Date(b.VisitDate).toLocaleDateString()}
                            </p>

                            {/* Status */}
                            <span
                                className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold
                                    ${b.status === "pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : b.status === "booked"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {b.status}
                            </span>

                            <p className="mt-4 text-green-600 font-bold text-lg">
                                ₹ {b.property?.price}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= Update Status Modal ================= */}
            {openModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-96 shadow-xl text-black">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Update Status</h2>
                            <button onClick={() => setOpenModal(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="w-full p-2 border rounded-lg mb-4"
                        >
                            <option value="pending">Pending</option>
                            <option value="booked">Booked</option>
                            <option value="cancel">Cancel</option>
                        </select>

                        <button
                            onClick={updateStatus}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg"
                        >
                            Update
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
