"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import ImageGallery from "@/app/components/ImageGallery";
import { Trash2, Edit3, AlertTriangle } from "lucide-react";

export default function UpdateDeletePage() {
    const { propertyid } = useParams();
    const router = useRouter();

    const [data, setData] = useState({
        title: "",
        price: "",
        status: "",
        images: [],
        location: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    /* ---------------- FETCH PROPERTY ---------------- */
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(
                    `/api/property/getsingleproperty?pid=${propertyid}`,
                    { cache: "no-store" }
                );
                const dt = await res.json();

                if (dt.success) {
                    setData({
                        title: dt.property.title,
                        price: dt.property.price,
                        status: dt.property.status,
                        images: dt.property.images || [],
                        location: dt.property.location,
                        description: dt.property.description,
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [propertyid]);

    /* ---------------- UPDATE PROPERTY ---------------- */
    async function updateHandler(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(
                `/api/property/updatepropertysatus?pid=${propertyid}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        userId: localStorage.getItem("userId"),
                    },
                    body: JSON.stringify({
                        title: data.title,
                        price: data.price,
                        status: data.status,
                    }),
                }
            );

            const out = await res.json();
            setLoading(false);

            if (out.success) {
                router.push("/myProperties");
            } else {
                alert(out.message);
            }
        } catch (err) {
            setLoading(false);
        }
    }

    /* ---------------- DELETE PROPERTY ---------------- */
    async function confirmDelete() {
        try {
            const res = await fetch(
                `/api/property/deleteProperty?pid=${propertyid}`,
                {
                    method: "DELETE",
                    headers: {
                        userId: localStorage.getItem("userId"),
                    },
                }
            );

            const out = await res.json();

            if (out.success) {
                router.push("/myProperties");
            } else {
                alert(out.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <Navbar theme="light" />

            {/* -------- DELETE MODAL -------- */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-scaleIn">
                        <div className="mx-auto mb-4 h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="text-red-600" size={30} />
                        </div>

                        <h2 className="text-2xl font-bold text-red-600 mb-3">
                            Delete Property?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            This action cannot be undone. All data related to
                            this property will be permanently removed.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="w-full py-3 rounded-lg border font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* -------- MAIN CONTENT -------- */}
            <div className="max-w-5xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">
                    Manage Property
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* PROPERTY PREVIEW */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-md p-6 border">
                            <h2 className="text-2xl font-bold text-black mb-2">
                                {data.title}
                            </h2>
                          <p className="text-gray-600 text-lg mt-1">
                    {data.city}, {data.state}
                </p>

                            <ImageGallery images={data.images} />

                            <p className="mt-4 text-gray-700">
                                {data.description}
                            </p>

                            <p className="mt-3 text-2xl font-bold text-green-600">
                                ₹ {data.price}
                            </p>

                            <p className="mt-2 font-semibold text-red-600">
                                Status: {data.status}
                            </p>
                        </div>
                    </div>

                    {/* UPDATE FORM */}
                    <div>
                        <form
                            onSubmit={updateHandler}
                            className="bg-white rounded-2xl shadow-xl p-6 border sticky top-24 text-black"
                        >
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Edit3 size={22} /> Update Details
                            </h3>


                            <label className="block mb-2 font-medium">
                                Status
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        status: e.target.value,
                                    })
                                }
                                className="w-full mb-6 px-4 py-3 rounded-xl border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="available">available</option>
                                <option value="sold">sold</option>
                                <option value="rented">rented</option>
                            </select>

                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition"
                            >
                                {loading ? "Updating..." : "Update Property"}
                            </button>

                            {/* DELETE CTA */}
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(true)}
                                className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-red-200 text-red-600 font-medium hover:bg-red-50 transition"
                            >
                                <Trash2 size={18} /> Delete Property
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
