"use client";
import { useState } from "react";

export default function RatingModal({ agentId, onClose, onSubmitted }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const submitRating = async () => {
        const res = await fetch(`/api/Rating?aid=${agentId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                userId: localStorage.getItem("userId"),
            },
            body: JSON.stringify({ rating }),
        });

        const data = await res.json();
        if (data.success) {
            onSubmitted();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl">
                <h2 className="text-xl font-bold mb-3">Give Rating</h2>

                <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <span
                            key={s}
                            onClick={() => setRating(s)}
                            onMouseEnter={() => setHover(s)}
                            onMouseLeave={() => setHover(0)}
                            className={`text-3xl cursor-pointer ${(hover || rating) >= s
                                ? "text-yellow-400"
                                : "text-gray-400"
                                }`}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <button
                    onClick={submitRating}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg"
                >
                    Submit
                </button>

                <button
                    onClick={onClose}
                    className="w-full mt-2 text-gray-600"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
