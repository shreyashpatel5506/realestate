"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import ImageGallery from "@/app/components/ImageGallery";
import Link from "next/link";

export default function SingleAgentProperty() {
    const { propertyid } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    const getProperty = async () => {
        try {
            const res = await fetch(`/api/property/getsingleproperty?pid=${propertyid}`);
            const data = await res.json();
            if (data.success) setProperty(data.property);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProperty();
    }, []);

    if (loading) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="w-full bg-white">
            <Navbar theme="light" />

            <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-20">
                <h1 className="text-4xl font-bold">{property.title}</h1>

                <p className="text-gray-600 flex gap-2 mt-1">
                    <MapPin /> {property.city}, {property.state}
                </p>

                <div className="flex gap-10 mt-5 text-gray-700">
                    <span className="flex items-center gap-2">
                        <Bed /> {property.bedrooms} Beds
                    </span>
                    <span className="flex items-center gap-2">
                        <Bath /> {property.bathrooms} Baths
                    </span>
                    <span className="flex items-center gap-2">
                        <Square /> {property.areaSqFt} sqft
                    </span>
                </div>

                <ImageGallery images={property.images} />

                <p className="mt-6 text-gray-700">{property.description}</p>

                <div className="mt-10">
                    <Link href={`/myProperties/${propertyid}/updateanddelete`}>
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
                            Update / Delete
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
