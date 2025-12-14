"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Heart } from "lucide-react";

export default function FavouriteListPage() {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFavourites() {
            try {
                const res = await fetch("/api/favourite/getFavourite", {
                    method: "GET",
                    headers: {
                        "userId": localStorage.getItem("userId"),
                    },
                });

                const data = await res.json();

                if (data.success && Array.isArray(data.favouriteProperty)) {
                    setFavourites(data.favouriteProperty);
                } else {
                    setFavourites([]);
                }

            } catch (error) {
                console.log("Error fetching favourites:", error);
                setFavourites([]);
            }

            setLoading(false);
        }

        fetchFavourites();
    }, []);

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <Navbar theme="light" />

            <div className="max-w-6xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">
                    My Favourites
                </h1>

                {loading && (
                    <p className="text-gray-500">Loading favourites...</p>
                )}

                {!loading && favourites.length === 0 && (
                    <p className="text-gray-600">No favourite properties found.</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favourites.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-2xl shadow-md border p-4 hover:shadow-lg transition relative"
                        >
                            {/* Favourite Icon */}
                            <div className="absolute top-3 right-3 bg-red-100 p-2 rounded-full">
                                <Heart className="text-red-600 fill-red-600" size={18} />
                            </div>

                            <img
                                src={
                                    item.property?.image ||
                                    item.property?.images?.[0]
                                }
                                className="w-full h-52 object-cover rounded-xl"
                                alt="property"
                            />

                            <h2 className="text-xl font-bold mt-4 text-gray-800">
                                {item.property?.title}
                            </h2>

                            <p className="text-gray-600 mb-2">
                                {item.property?.location}
                            </p>

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
