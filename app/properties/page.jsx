"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { Heart, Bed, Bath, Square } from "lucide-react";
import Loading from "../components/Loading";

export default function PropertyPage() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const fallbackImage =
        "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80";

    const getProperties = async () => {
        try {
            const res = await fetch("/api/property/showallProperty", {
                method: "GET",
                cache: "no-store",
            });

            const data = await res.json();
            setProperties(data.properties || []);
        } catch (err) {
            console.log("Error fetching properties:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProperties();
    }, []);

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
        return null;
    }
    return (
        <div className="w-full bg-white relative overflow-hidden">

            {/* NAVBAR */}
            <div className="w-full z-10 relative top-0">
                <Navbar theme="white" />
            </div>

            <hr className="bg-gray-300" />

            {/* PAGE TITLE */}
            <div className="text-center mt-20 mb-10">
                <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold font-bricolage text-[#102A23]">
                    Explore Our Properties
                </h1>
                <p className="text-gray-600 mt-2 font-bricolage font-semibold">
                    Find the perfect place that matches your lifestyle.
                </p>
            </div>

            {/* PROPERTY GRID */}
            <div className="w-full px-6 md:px-16 pb-20">
                {loading ? (
                    <Loading />
                ) : properties.length === 0 ? (
                    <p className="text-center text-gray-600">
                        No properties found
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {properties.map((p) => (
                            <Link
                                key={p._id}
                                href={`/properties/${p._id}`}
                                className="rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300 group"
                            >
                                {/* IMAGE */}
                                <div className="relative">

                                    {/* HEART ICON (future favourite toggle) */}


                                    <img
                                        src={p.images?.[0] || fallbackImage}
                                        alt={p.title}
                                        className="w-full h-56 object-cover group-hover:scale-105 transition-all duration-300"
                                    />
                                </div>

                                {/* CARD CONTENT */}
                                <div className="p-5 font-bricolage">
                                    <h2 className="text-xl font-semibold text-[#12342A]">
                                        {p.title}
                                    </h2>

                                    <p className="text-gray-600 mt-1">
                                        {p.city}, {p.state}
                                    </p>

                                    {/* PRICE */}
                                    <div className="mt-4 text-lg font-bold text-[#1B8C66]">
                                        ₹ {p.price.toLocaleString()}
                                    </div>

                                    {/* FEATURES */}
                                    <div className="flex justify-between mt-4 text-gray-700 text-sm">
                                        <span className="flex gap-1 items-center"><Bed size={16} /> {p.bedrooms} Beds</span>
                                        <span className="flex gap-1 items-center"><Bath size={16} /> {p.bathrooms} Baths</span>
                                        <span className="flex gap-1 items-center"><Square size={16} /> {p.areaSqFt} sqft</span>
                                    </div>

                                    {/* AGENT */}
                                    <div className="mt-4 text-sm text-gray-600">
                                        Agent:{" "}
                                        <span className="font-semibold">
                                            {p.Agent?.name || "Unknown"}
                                        </span>
                                    </div>

                                    {/* STATUS BADGE */}
                                    <span
                                        className={`inline-block mt-4 px-3 py-1 rounded-full text-sm font-medium ${p.status?.toLowerCase() === "sold"
                                            ? "bg-red-100 text-red-600"
                                            : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        {p.status}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* FIXED SCROLL TO TOP BUTTON */}
            <div className="fixed bottom-8 right-8">
                <button
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg cursor-pointer"
                    aria-label="Scroll to top"
                >
                    <span className="text-4xl">↑</span>
                </button>
            </div>
        </div>
    );
}
