"use client";

import { useEffect, useState } from "react";
import RatingModal from "./RatingModal";
import Navbar from "./Navbar";

export default function ProfilePage({ agentId, onClose }) {
    const [profile, setProfile] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [openRatingModal, setOpenRatingModal] = useState(false);

    // If no agentId passed → fallback to logged-in user
    const finalAgentId =
        agentId ||
        (typeof window !== "undefined" ? localStorage.getItem("userId") : null);

    // Fetch profile
    const fetchProfile = async () => {
        if (!finalAgentId) return;
        const res = await fetch(`/api/User/UserProfile?uid=${finalAgentId}`);
        const data = await res.json();
        if (data.success) setProfile(data.userProfile);
    };

    // Fetch ratings
    const fetchRatings = async () => {
        if (!finalAgentId) return;

        const res = await fetch(`/api/Rating?aid=${finalAgentId}`);
        const data = await res.json();
        if (data.success) setRatings(data.ratings);
    };

    useEffect(() => {
        fetchProfile();
        fetchRatings();
    }, [finalAgentId]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-[90%] max-w-[900px] shadow-xl h-[90vh] overflow-y-auto relative">

                {/* CLOSE BUTTON */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-black"
                >
                    ✕
                </button>

                {/* NAVBAR */}
                <Navbar />

                {/* PROFILE CARD */}
                {profile && (
                    <div className="bg-gray-100 p-4 rounded-xl mt-6 shadow">
                        <h2 className="text-xl font-bold">{profile.name}</h2>
                        <p className="text-gray-600">{profile.email}</p>

                        <button
                            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
                            onClick={() => setOpenRatingModal(true)}
                        >
                            Rate This Agent
                        </button>
                    </div>
                )}

                {/* RATINGS LIST */}
                <h2 className="mt-8 text-xl font-bold">User Ratings</h2>

                <div className="space-y-4 mt-4">
                    {ratings.length === 0 && <p>No ratings yet.</p>}

                    {ratings.map((r, i) => (
                        <div key={i} className="border p-4 rounded-lg shadow-sm">
                            <div className="flex text-yellow-500 text-xl">
                                {[...Array(5)].map((_, idx) => (
                                    <span key={idx}>
                                        {idx < r.rating ? "★" : "☆"}
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm mt-1">
                                By: {r.user?.name || "Unknown"}
                            </p>
                        </div>
                    ))}
                </div>

                {/* RATING MODAL */}
                {openRatingModal && (
                    <RatingModal
                        agentId={finalAgentId}
                        onClose={() => setOpenRatingModal(false)}
                        onSubmitted={fetchRatings}
                    />
                )}
            </div>
        </div>
    );
}
