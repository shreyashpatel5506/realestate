"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";

export default function UpdateDeletePage() {
    const { propertyid } = useParams();
    const router = useRouter();

    const [data, setData] = useState({
        title: "",
        price: "",
        status: "",
    });

    const [loading, setLoading] = useState(false);

    // Fetch property
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/property/getsingleproperty?pid=${propertyid}`);
            const dt = await res.json();

            if (dt.success) {
                setData({
                    title: dt.property.title,
                    price: dt.property.price,
                    status: dt.property.status
                });
            }
        }
        fetchData();
    }, []);

    // UPDATE PROPERTY
    async function updateHandler(e) {
        e.preventDefault();
        setLoading(true);

        const res = await fetch(`/api/property/updateproperty?pid=${propertyid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "userId": localStorage.getItem("userId"),
            },
            body: JSON.stringify(data),
        });

        const out = await res.json();
        setLoading(false);

        if (out.success) {
            alert("Updated Successfully!");
            router.push("/myProperties");
        } else {
            alert(out.message);
        }
    }

    // DELETE PROPERTY
    async function deleteHandler() {
        if (!confirm("Are you sure?")) return;

        const res = await fetch(`/api/property/deleteproperty?pid=${propertyid}`, {
            method: "DELETE",
            headers: {
                "userId": localStorage.getItem("userId"),
            },
        });

        const out = await res.json();

        if (out.success) {
            alert("Deleted Successfully!");
            router.push("/myProperties");
        } else {
            alert(out.message);
        }
    }

    return (
        <div className="w-full bg-white min-h-screen">
            <Navbar theme="light" />

            <div className="max-w-3xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6">Update Property</h1>

                <form onSubmit={updateHandler} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Title"
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={data.price}
                        onChange={(e) => setData({ ...data, price: e.target.value })}
                        className="w-full border p-3 rounded-lg"
                    />

                    <select
                        value={data.status}
                        onChange={(e) => setData({ ...data, status: e.target.value })}
                        className="w-full border p-3 rounded-lg"
                    >
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full py-3 bg-green-600 text-white rounded-lg"
                    >
                        {loading ? "Updating..." : "Update Property"}
                    </button>
                </form>

                <button
                    onClick={deleteHandler}
                    className="w-full py-3 bg-red-600 text-white rounded-lg mt-6"
                >
                    Delete Property
                </button>
            </div>
        </div>
    );
}
