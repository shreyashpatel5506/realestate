"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import ImageGallery from "@/app/components/ImageGallery";

import {
    Bed,
    Bath,
    Square,
    MapPin,
    Phone,
    User,
    Heart,
    Star,
    X,
} from "lucide-react";

export default function PropertyDetailsPage() {
    const { propertyid } = useParams();
    const router = useRouter();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavourite, setIsFavourite] = useState(false);

    // ⭐ Rating Modal
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [loadingRating, setLoadingRating] = useState(false);

    // Mock images if property has few images
    const mockImages = [
        "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80",
        "https://images.unsplash.com/photo-1600585152887-291b8f3d5b77?q=80",
        "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80",
    ];

    // Fetch property
    const getProperty = async () => {
        try {
            const res = await fetch(
                `/api/property/getsingleproperty?pid=${propertyid}`,
                { cache: "no-store" }
            );

            const data = await res.json();

            if (data.success) {
                setProperty(data.property);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // Check favourite
    const checkFavourite = async () => {
        try {
            const res = await fetch("/api/favourite/getFavourite");
            const data = await res.json();

            if (data.success) {
                const exists = data.favouriteProperty.some(
                    (f) => f.property?._id === propertyid
                );
                setIsFavourite(exists);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getProperty();
        checkFavourite();
    }, [propertyid]);

    // Toggle favourite
    const toggleFavourite = async () => {
        try {
            if (isFavourite) {
                const res = await fetch(
                    `/api/favourite/deleteFavourite?pid=${propertyid}`,
                    { method: "DELETE" }
                );
                const data = await res.json();

                if (data.success) setIsFavourite(false);
            } else {
                const res = await fetch(
                    `/api/favourite/addFavourite?pid=${propertyid}`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            visitDate: "2025-01-01",
                            status: "favourite",
                        }),
                    }
                );

                const data = await res.json();
                if (data.success) setIsFavourite(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // ⭐ Submit rating
    const submitRating = async () => {
        if (!selectedRating) return;

        try {
            setLoadingRating(true);

            const res = await fetch(
                `/api/rating/addrating?aid=${property.Agent?._id}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ rating: selectedRating }),
                }
            );

            const data = await res.json();

            if (data.success) {
                alert("Thank you! Rating submitted.");
                setShowRatingModal(false);
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingRating(false);
        }
    };

    if (loading)
        return (
            <div className="w-full h-screen flex justify-center items-center text-xl font-semibold">
                Loading property...
            </div>
        );

    if (!property)
        return (
            <div className="w-full h-screen flex justify-center items-center text-xl font-semibold">
                Property not found
            </div>
        );

    const images =
        property.images && property.images.length > 0
            ? [...property.images, ...mockImages].slice(0, 4)
            : mockImages;

    return (
        <div className="bg-white min-h-screen text-[#102A23]">
            <Navbar theme="white" />
            <hr className="bg-gray-200" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-16 mt-10 relative">
                {/* ❤️ Floating Favourite */}
                <button
                    onClick={toggleFavourite}
                    className="absolute top-2 right-2 md:top-6 md:right-6 z-50 bg-white shadow-xl rounded-full p-3 hover:scale-110 transition"
                >
                    <Heart
                        size={30}
                        className={
                            isFavourite
                                ? "text-red-500 fill-red-500"
                                : "text-gray-400"
                        }
                    />
                </button>

                {/* TITLE */}
                <h1 className="text-3xl md:text-4xl font-bold font-bricolage">
                    {property.title}
                </h1>
                <p className="text-gray-600 text-lg mt-1">
                    {property.city}, {property.state}
                </p>

                {/* DESKTOP LAYOUT */}
                <div className="mt-10 hidden md:flex gap-10">
                    {/* LEFT SIDE */}
                    <div className="w-[60%]">
                        <ImageGallery images={images} />

                        <div className="mt-6 space-y-5">
                            <div className="text-3xl font-bold text-green-700">
                                ₹ {property.price.toLocaleString()}
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-gray-700">
                                <span className="flex gap-2 items-center">
                                    <Bed size={20} /> {property.bedrooms} Bedrooms
                                </span>
                                <span className="flex gap-2 items-center">
                                    <Bath size={20} /> {property.bathrooms} Bathrooms
                                </span>
                                <span className="flex gap-2 items-center">
                                    <Square size={20} /> {property.areaSqFt} sq.ft
                                </span>
                                <span className="flex gap-2 items-center">
                                    <MapPin size={20} /> {property.address}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="w-[40%] flex flex-col gap-6">

                        {/* BOX WITHOUT BORDER */}
                        <div className="p-6 bg-white rounded-xl shadow-md">
                            <h1 className="text-3xl font-bold text-[#1B8C66]">
                                ₹ {property.price.toLocaleString()}
                            </h1>

                            <button
                                onClick={() =>
                                    router.push(`/properties/${propertyid}/booking`)
                                }
                                className="mt-6 w-full bg-[#1B8C66] hover:bg-[#157a58] text-white py-3 rounded-xl text-lg"
                            >
                                Book Now
                            </button>
                        </div>

                        {/* AGENT CARD CLICKABLE */}
                        <div
                            onClick={() => setShowRatingModal(true)}
                            className="p-6 bg-white rounded-xl shadow-md cursor-pointer hover:shadow-lg transition"
                        >
                            <h3 className="text-lg font-bold mb-4">Listed by</h3>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex justify-center items-center">
                                    <User />
                                </div>

                                <div>
                                    <p className="font-semibold">
                                        {property.Agent?.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Real Estate Agent
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-4 text-gray-700">
                                <Phone size={18} />{" "}
                                {property.Agent?.phone || "000-000-0000"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* MOBILE LAYOUT */}
                <div className="md:hidden mt-6">
                    <ImageGallery images={images} />

                    <div className="mt-6 space-y-4">
                        <div className="text-2xl font-bold text-green-700">
                            ₹ {property.price.toLocaleString()}
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-gray-800">
                            <span className="flex gap-2 items-center">
                                <Bed size={18} /> {property.bedrooms} Beds
                            </span>
                            <span className="flex gap-2 items-center">
                                <Bath size={18} /> {property.bathrooms} Baths
                            </span>
                            <span className="flex gap-2 items-center">
                                <Square size={18} /> {property.areaSqFt} sq.ft
                            </span>
                            <span className="flex gap-2 items-center">
                                <MapPin size={18} /> {property.address}
                            </span>
                        </div>

                        <button
                            onClick={() =>
                                router.push(`/properties/${propertyid}/booking`)
                            }
                            className="w-full mt-4 bg-[#1B8C66] text-white py-3 rounded-lg shadow hover:bg-[#157a58]"
                        >
                            Book Now
                        </button>

                        {/* MOBILE AGENT */}
                        <div
                            onClick={() => setShowRatingModal(true)}
                            className="p-5 bg-white rounded-xl shadow cursor-pointer"
                        >
                            <h3 className="text-lg font-bold mb-4">Listed by</h3>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-300 flex justify-center items-center">
                                    <User />
                                </div>

                                <div>
                                    <p className="font-semibold">
                                        {property.Agent?.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Real Estate Agent
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-4 text-gray-700">
                                <Phone size={18} />{" "}
                                {property.Agent?.phone || "000-000-0000"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* DESCRIPTION */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-2">Description</h2>
                    <p className="text-gray-700 leading-relaxed">
                        {property.description}
                    </p>
                </div>

                {/* MORE DETAILS */}
                {property.moredetails && (
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold mb-2">More Details</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {property.moredetails}
                        </p>
                    </div>
                )}
            </div>

            {/** ⭐ Rating Modal */}
            {showRatingModal && (
                <div
                    onClick={() => setShowRatingModal(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 bg-transparent"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white w-[90%] max-w-md p-6 rounded-2xl shadow-xl relative animate-scaleIn"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setShowRatingModal(false)}
                            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
                        >
                            <X size={22} />
                        </button>

                        <h2 className="text-xl font-bold mb-4">
                            Rate {property.Agent?.name}
                        </h2>

                        {/* Stars */}
                        <div className="flex gap-3 justify-center my-4">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <Star
                                    key={num}
                                    size={38}
                                    onClick={() => setSelectedRating(num)}
                                    className={`cursor-pointer ${selectedRating >= num
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Submit Button */}
                        <button
                            disabled={loadingRating}
                            onClick={submitRating}
                            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
                        >
                            {loadingRating ? "Submitting..." : "Submit Rating"}
                        </button>
                    </div>
                </div>
            )}

            {/* Animation CSS */}
            <style jsx global>{`
        @keyframes scaleIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
        </div>
    );
}
