"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function AddPropertyPage() {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMsg("");

        const formData = new FormData(e.target);

        try {
            const res = await fetch("/api/property/addproperty", {
                method: "POST",
                headers: {
                    "userId": localStorage.getItem("userId"), // REQUIRED
                },
                body: formData,
            });

            const data = await res.json();
            setLoading(false);

            if (data.success) {
                setMsg("🎉 Property added successfully!");

                setTimeout(() => {
                    window.location.href = "/properties"; // redirect to property list
                }, 1500);
            } else {
                setMsg(data.message || "Something went wrong!");
            }
        } catch (error) {
            setLoading(false);
            setMsg("❌ Server error!");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar theme="light" />

            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Add New Property
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-2xl shadow-lg border"
                >
                    {/* TITLE */}
                    <label className="block mb-2 font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        name="title"
                        required
                        className="w-full border px-3 py-2 rounded mb-4 text-black"
                        placeholder="Enter property title"
                    />

                    {/* DESCRIPTION */}
                    <label className="block mb-2 font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        required
                        className="w-full border px-3 py-2 rounded mb-4 text-black"
                        placeholder="Short description"
                    />

                    {/* MORE DETAILS */}
                    <label className="block mb-2 font-medium text-gray-700">
                        More Details
                    </label>
                    <textarea
                        name="moredetails"
                        className="w-full border px-3 py-2 rounded mb-4 text-black"
                        placeholder="Detailed information"
                    />

                    {/* PRICE */}
                    <label className="block mb-2 font-medium text-gray-700">
                        Price (₹)
                    </label>
                    <input
                        name="price"
                        type="number"
                        required
                        className="w-full border px-3 py-2 rounded mb-4 text-black"
                        placeholder="Property price"
                    />

                    {/* TYPE */}
                    <label className="block mb-2 font-medium text-gray-700">
                        Type
                    </label>
                    <select
                        name="type"
                        required
                        className="w-full border px-3 py-2 rounded mb-4 text-black"
                    >
                        <option>Flat</option>
                        <option>House</option>
                        <option>Villa</option>
                        <option>Land</option>
                    </select>

                    {/* CATEGORY */}
                    <label className="block mb-2 font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        name="category"
                        required
                        className="w-full border px-3 py-2 rounded mb-4 text-black"
                    >
                        <option>Rent</option>
                        <option>Sale</option>
                    </select>

                    {/* ADDRESS */}
                    <label className="block mb-2 font-medium text-gray-700">
                        Address
                    </label>
                    <input
                        name="address"
                        required
                        className="w-full border px-3 py-2 rounded mb-4 text-black"
                        placeholder="Street address"
                    />

                    {/* CITY */}
                    <label className="block mb-2 font-medium text-gray-700">
                        City
                    </label>
                    <input
                        name="city"
                        required
                        className="w-full border px-3 py-2 rounded mb-4 text-black"
                        placeholder="City name"
                    />

                    {/* STATE */}
                    <label className="block mb-2 font-medium text-gray-700">
                        State
                    </label>
                    <input
                        name="state"
                        required
                        className="w-full border px-3 py-2 rounded mb-4 text-black"
                        placeholder="State name"
                    />

                    {/* BEDROOMS */}
                    <label className="block mb-2 font-medium text-gray-700">
                        Bedrooms
                    </label>
                    <input
                        name="bedrooms"
                        type="number"
                        className="w-full border px-3 py-2 rounded mb-4 text-black"
                        placeholder="Number of bedrooms"
                    />

                    {/* BATHROOMS */}
                    <label className="block mb-2 font-medium text-gray-700">
                        Bathrooms
                    </label>
                    <input
                        name="bathrooms"
                        type="number"
                        className="w-full border px-3 py-2 rounded mb-4 text-black"
                        placeholder="Number of bathrooms"
                    />

                    {/* AREA SQFT */}
                    <label className="block mb-2 font-medium text-gray-700">
                        Area (SqFt)
                    </label>
                    <input
                        name="areaSqFt"
                        type="number"
                        className="w-full border px-3 py-2 rounded mb-4 text-black"
                        placeholder="Area in square feet"
                    />

                    {/* STATUS */}
                    <label className="block mb-2 font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        name="status"
                        required
                        className="w-full border px-3 py-2 rounded mb-4 text-black"
                    >
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                    </select>

                    {/* IMAGES */}
                    <label className="block mb-2 font-medium text-gray-700">
                        Upload Images
                    </label>
                    <input
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        required
                        className="w-full border px-3 py-2 rounded mb-6 bg-white"
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
                    >
                        {loading ? "Uploading..." : "Add Property"}
                    </button>

                    {msg && (
                        <p className="mt-4 text-center text-lg font-semibold text-gray-800">
                            {msg}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
