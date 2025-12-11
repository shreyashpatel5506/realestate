"use client";
import React, { useState } from "react";

export default function ImageGallery({ images = [] }) {
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className="w-full">
            {/* MAIN IMAGE */}
            <img
                src={mainImage}
                className="w-full h-[420px] rounded-2xl object-cover shadow-md"
            />

            {/* THUMBNAILS */}
            <div className="grid grid-cols-4 gap-3 mt-3">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        onClick={() => setMainImage(img)}
                        className={`h-24 rounded-xl object-cover cursor-pointer border 
                        ${mainImage === img ? "border-blue-600" : "border-transparent"}`}
                    />
                ))}
            </div>
        </div>
    );
}
