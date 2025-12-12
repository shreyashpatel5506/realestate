"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import {
    Bed,
    Bath,
    Square,
    MapPin,
    CheckCircle2,
    Phone,
    User,
    Heart,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ImageGallery from "@/app/components/ImageGallery";

export default function PropertyDetailsPage() {
    const { propertyid } = useParams();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // ❤️ Favourite state
    const [isFavourite, setIsFavourite] = useState(false);

    const mockImages = [
        "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80",
        "https://images.unsplash.com/photo-1600585152887-291b8f3d5b77?q=80",
        "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80",
    ];


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

    const checkFavourite = async () => {
        try {
            const res = await fetch("/api/favourite/getFavourite", {
                method: "GET",
            });

            const data = await res.json();

            if (data.success) {
                const favList = data.favouriteProperty;

                // CHECK IF THIS PROPERTY EXISTS IN FAV MODEL
                const exists = favList.some(
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
        checkFavourite(); // ⭐ VERY IMPORTANT
    }, [propertyid]);

    const toggleFavourite = async () => {
        try {
            if (isFavourite) {
                // REMOVE FAV
                const res = await fetch(
                    `/api/favourite/deleteFavourite?pid=${propertyid}`,
                    { method: "DELETE" }
                );

                const data = await res.json();
                if (data.success) setIsFavourite(false);
            } else {
                // ADD FAV
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

    // --------------------------------------------------------

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center text-xl font-semibold">
                Loading property...
            </div>
        );
    }

    if (!property) {
        return (
            <div className="w-full h-screen flex justify-center items-center text-xl font-semibold">
                Property not found
            </div>
        );
    }

    // IMAGE HANDLING
    const images =
        property.images && property.images.length > 0
            ? [...property.images, ...mockImages].slice(0, 4)
            : mockImages;

    return (
        <div className="w-full bg-white text-[#102A23]">
            <Navbar theme="light" />

            <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-20 relative">

                {/* ❤️ FLOATING HEART BUTTON */}
                <button
                    onClick={toggleFavourite}
                    className="absolute top-6 right-6 z-50 bg-white shadow-xl rounded-full p-3 hover:scale-110 transition"
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
                <h1 className="text-[clamp(2rem,3.5vw,3rem)] font-bold mb-2">
                    {property.title}
                </h1>

                <p className="text-gray-600 flex items-center gap-2">
                    <MapPin size={18} /> {property.city}, {property.state}
                </p>

                {/* ICON ROW */}
                <div className="flex items-center gap-10 mt-6 text-gray-700">
                    <div className="flex items-center gap-2">
                        <Bed size={22} /> {property.bedrooms} Bedrooms
                    </div>
                    <div className="flex items-center gap-2">
                        <Bath size={22} /> {property.bathrooms} Bathrooms
                    </div>
                    <div className="flex items-center gap-2">
                        <Square size={22} /> {property.areaSqFt} sqft
                    </div>
                </div>

                {/* GALLERY */}
                <ImageGallery images={property.images} />

                {/* MAIN CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-14">

                    {/* LEFT INFO */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-4">
                            About this property
                        </h2>
                        <p className="text-gray-700">{property.description}</p>

                        <h2 className="text-2xl font-bold mt-10 mb-4">
                            What this property offers
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
                            {property.features?.map((f, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <CheckCircle2
                                        className="text-green-600"
                                        size={18}
                                    />
                                    {f}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="w-full flex flex-col gap-6">

                        {/* PRICE */}
                        <div className="p-6 bg-white rounded-xl shadow-xl border sticky top-24">
                            <h1 className="text-3xl font-bold text-[#1B8C66]">
                                ₹ {property.price.toLocaleString()}
                            </h1>

                            {localStorage.getItem("userRole") === "user" && (
                                <button
                                    onClick={() => router.push(`/properties/${propertyid}/booking`)}
                                    className="mt-6 w-full bg-[#1B8C66] hover:bg-[#157a58] text-white py-3 rounded-xl text-lg"
                                >
                                    Book Now
                                </button>
                            )}
                            {localStorage.getItem("userRole") === "agent" && (
                                <button
                                    onClick={() => router.push(`/properties/${propertyid}/updatestatus`)}
                                    className="mt-4 w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-xl"
                                >
                                    Update Status
                                </button>
                            )}
                        </div>

                        {/* AGENT */}
                        <div className="p-6 bg-gray-50 rounded-xl shadow border">
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
            </div>
        </div>
    );
}
