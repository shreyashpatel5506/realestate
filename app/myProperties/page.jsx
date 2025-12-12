"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { Heart, Bed, Bath, Square } from "lucide-react";
import Image from "next/image";

export default function MyProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const agentId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

    const fallbackImage =
        "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80";

    const getMyProperties = async () => {
        try {
            const res = await fetch(`/api/property/myproperties?agentId=${agentId}`, {
                method: "GET",
                cache: "no-store",
            });

            const data = await res.json();
            setProperties(data.properties || []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (agentId) getMyProperties();
    }, [agentId]);

    return (
        <div className="w-full bg-white relative overflow-hidden">
            <Navbar theme="white" />
            <hr className="bg-gray-300" />

            <div className="text-center mt-20 mb-10">
                <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#102A23]">
                    My Uploaded Properties
                </h1>
            </div>

            <div className="w-full px-6 md:px-16 pb-20">
                {loading ? (
                    <div className="w-full text-center py-10 text-xl">Loading...</div>
                ) : properties.length === 0 ? (
                    <p className="text-center text-gray-600">No properties found</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {properties.map((p) => (
                            <Link
                                key={p._id}
                                href={`/myProperties/${p._id}`}
                                className="rounded-2xl shadow-lg bg-white border hover:shadow-2xl transition-all"
                            >
                                <div className="relative">
                                    <Image
                                        src={p.images?.[0] || fallbackImage}
                                        className="w-full h-56 object-cover"
                                    />
                                </div>

                                <div className="p-5">
                                    <h2 className="text-xl font-bold">{p.title}</h2>

                                    <p className="text-gray-600 mt-1">
                                        {p.city}, {p.state}
                                    </p>

                                    <div className="mt-4 text-lg font-bold text-green-700">
                                        ₹ {p.price.toLocaleString()}
                                    </div>

                                    <div className="flex justify-between mt-4 text-gray-700">
                                        <span className="flex gap-1 items-center">
                                            <Bed size={16} /> {p.bedrooms}
                                        </span>
                                        <span className="flex gap-1 items-center">
                                            <Bath size={16} /> {p.bathrooms}
                                        </span>
                                        <span className="flex gap-1 items-center">
                                            <Square size={16} /> {p.areaSqFt}
                                        </span>
                                    </div>

                                    <span
                                        className={`inline-block mt-4 px-3 py-1 rounded-full text-sm font-medium ${p.status === "sold"
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
        </div>
    );
}
