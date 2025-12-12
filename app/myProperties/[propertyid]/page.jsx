"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import ImageGallery from "@/app/components/ImageGallery";
import {
    Bed,
    Bath,
    Square,
    MapPin,
} from "lucide-react";
import Link from "next/link";

export default function MyPropertyDetails() {
    const { propertyid } = useParams();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProperty = async () => {
        try {
            const res = await fetch(`/api/property/getsingleproperty?pid=${propertyid}`, {
                method: "GET",
                cache: "no-store",
            });
            const data = await res.json();
            setProperty(data.property);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperty();
    }, []);

    if (loading)
        return (
            <div className="w-full text-center py-20 text-xl font-semibold">
                Loading property...
            </div>
        );

    return (
        <div className="bg-white min-h-screen">

            {/* NAVBAR */}
            <Navbar theme="white" />
            <hr className="bg-gray-300" />

            {property && (
                <div className="px-6 md:px-16 mt-10">

                    {/* TITLE */}
                    <h1 className="text-3xl md:text-4xl font-bold text-[#102A23] font-bricolage">
                        {property.title}
                    </h1>

                    {/* CITY, STATE */}
                    <p className="text-gray-600 text-lg mt-1">
                        {property.city}, {property.state}
                    </p>

                    {/* DESKTOP LAYOUT */}
                    <div className="mt-10 hidden md:flex gap-10">

                        {/* LEFT - IMAGE GALLERY */}
                        <div className="w-[55%]">
                            <ImageGallery images={property.images} />
                        </div>

                        {/* RIGHT - PROPERTY INFO */}
                        <div className="w-[45%] space-y-5 font-bricolage">

                            {/* Price */}
                            <div className="text-3xl font-bold text-green-700">
                                ₹ {property.price.toLocaleString()}
                            </div>

                            {/* Features */}
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

                            {/* UPDATE / DELETE BUTTON */}
                            <div className="mt-6">
                                <Link href={`/myProperties/${propertyid}/updateanddelete`}>
                                    <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                        Update / Delete
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE LAYOUT */}
                    <div className="md:hidden mt-6">
                        <ImageGallery images={property.images} />

                        <div className="mt-6 space-y-4">

                            <div className="text-2xl font-bold text-green-700">
                                ₹ {property.price.toLocaleString()}
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-gray-700">
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

                            {/* UPDATE / DELETE BUTTON */}
                            <button
                                onClick={() => (window.location.href = `/myProperties/${propertyid}/updateanddelete`)}
                                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700"
                            >
                                Update / Delete
                            </button>
                        </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-[#102A23] mb-2">
                            Description
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {property.description}
                        </p>
                    </div>

                    {/* MORE DETAILS */}
                    {property.moredetails && (
                        <div className="mt-10">
                            <h2 className="text-2xl font-bold text-[#102A23] mb-2">
                                More Details
                            </h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {property.moredetails}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
