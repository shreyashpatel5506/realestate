"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import ImageGallery from "../../../components/ImageGallery";

export default function UpdateStatus() {
    const { propertyid } = useParams();
    const router = useRouter();

    const [property, setProperty] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const [checkingRole, setCheckingRole] = useState(true);

    useEffect(() => {
        const role = typeof window !== "undefined"
            ? localStorage.getItem("userRole")
            : null;

        if (role !== "agent") {
            router.replace(`/properties/${propertyid}`);
            return;
        }

        setCheckingRole(false);
    }, [propertyid]);

    useEffect(() => {
        async function getProperty() {
            try {
                const res = await fetch(
                    `/api/property/getsingleproperty?pid=${propertyid}`,
                    { cache: "no-store" }
                );

                const data = await res.json();
                if (data.success) {
                    setProperty(data.property);
                    setStatus(data.property.status);
                }
            } catch (err) {
                console.log(err);
            }
        }

        if (!checkingRole) getProperty();
    }, [propertyid, checkingRole]);

    async function updateStatus(e) {
        e.preventDefault();
        setLoading(true);
        setMsg("");

        try {
            const res = await fetch(
                `/api/property/updateStatus?pid=${propertyid}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        userId: localStorage.getItem("userId"),
                    },
                    body: JSON.stringify({ status }),
                }
            );

            const data = await res.json();
            setLoading(false);

            if (data.success) {
                setMsg("✅ Status Updated Successfully!");
            } else {
                setMsg("❌ " + data.message);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setMsg("❌ Server Error!");
        }
    }

    if (checkingRole) {
        return (
            <div className="w-full h-screen flex justify-center items-center text-xl">
                Checking permissions...
            </div>
        );
    }

    if (!property) {
        return (
            <div className="w-full h-screen flex justify-center items-center text-xl">
                Loading property...
            </div>
        );
    }

    const images =
        property.images && property.images.length > 0
            ? property.images
            : ["https://via.placeholder.com/800x600"];

    return (
        <div className="bg-white min-h-screen">
            <Navbar theme="light" />

            <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-50 rounded-xl shadow">

                <h1 className="text-3xl font-bold mb-6 text-black">Update Property Status</h1>

                {/* PROPERTY TITLE */}
                <h2 className="text-xl font-semibold mb-2 text-black">{property.title}</h2>
                <p className="text-black mb-4">
                    {property.city}, {property.state}
                </p>

                {/* ⭐ IMAGE GALLERY */}
                <ImageGallery images={images} />

                {/* FORM */}
                <form onSubmit={updateStatus} className="mt-10">
                    <label className="block mb-2 font-medium text-black">Select Status</label>

                    <select
                        className="w-full border p-3 rounded-lg bg-white text-black"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                        <option value="pending">Pending</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full mt-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Status"}
                    </button>

                    {msg && (
                        <p className="mt-4 text-center font-semibold">{msg}</p>
                    )}
                </form>
            </div>
        </div>
    );
}
