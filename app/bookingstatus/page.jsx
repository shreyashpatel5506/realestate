"use client";

import { useEffect, useState } from "react";
import {
    Pencil,
    Trash,
    Calendar,
    Home,
    User,
    MapPin,
    X
} from "lucide-react";

export default function AgentBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    // ================================
    // Fetch Agent Bookings
    // ================================
    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/agent/bookings", {
                method: "GET",
                headers: {
                    "userId": localStorage.getItem("userId"),
                },
            });

            const data = await res.json();
            setBookings(data.data || []);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // ================================
    // Open Update Status Modal
    // ================================
    const handleOpenModal = (booking) => {
        setSelectedBooking(booking);
        setNewStatus(booking.status);
        setOpenModal(true);
    };

    // ================================
    // Update Booking Status
    // ================================
    const updateStatus = async () => {
        try {
            const res = await fetch(`/api/agent/bookings?bid=${selectedBooking._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "userId": localStorage.getItem("userId"),
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await res.json();

            if (data.success) {
                fetchBookings();
                setOpenModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // ================================
    // Delete Booking
    // ================================
    const deleteBooking = async (id) => {
        if (!confirm("Are you sure you want to delete this booking?")) return;

        try {
            const res = await fetch(`/api/agent/bookings?bid=${id}`, {
                method: "DELETE",
                headers: {
                    "userId": localStorage.getItem("userId"),
                },
            });

            const data = await res.json();

            if (data.success) {
                fetchBookings();
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Agent Bookings</h1>

            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div className="space-y-4">
                    {bookings.map((b) => (
                        <div
                            key={b._id}
                            className="p-5 rounded-xl shadow-md border bg-white flex justify-between items-center"
                        >
                            <div>
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <Home size={18} /> {b.property.title}
                                </h2>

                                <p className="flex items-center gap-2 text-gray-600 mt-1">
                                    <MapPin size={16} /> {b.property.address}
                                </p>

                                <p className="flex items-center gap-2 text-gray-600 mt-1">
                                    <User size={16} /> {b.user.name}
                                </p>

                                <p className="flex items-center gap-2 text-gray-600 mt-1">
                                    <Calendar size={16} />
                                    {new Date(b.VisitDate).toLocaleDateString()}
                                </p>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold mt-2 inline-block ${b.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : b.status === "booked"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {b.status}
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleOpenModal(b)}
                                    className="p-2 bg-blue-600 text-white rounded-lg"
                                >
                                    <Pencil size={18} />
                                </button>

                                <button
                                    onClick={() => deleteBooking(b._id)}
                                    className="p-2 bg-red-600 text-white rounded-lg"
                                >
                                    <Trash size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ================================
                Update Status Modal
            ================================== */}
            {openModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
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
