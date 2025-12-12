"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function PropertyGallery({ images = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const [isUserClicked, setIsUserClicked] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);

    // AUTO NEXT SLIDE
    const triggerNext = useCallback(() => {
        setFade(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
            setFade(true);
        }, 200);
    }, [images.length]);

    // AUTO PLAY STOP ON CLICK
    useEffect(() => {
        if (isUserClicked) return;
        const interval = setInterval(triggerNext, 3000);
        return () => clearInterval(interval);
    }, [triggerNext, isUserClicked]);

    // PREV SLIDE
    const triggerPrev = useCallback(() => {
        setFade(false);
        setTimeout(() => {
            setCurrentIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
            );
            setFade(true);
        }, 200);
    }, [images.length]);

    // MODAL
    const openModal = (i) => {
        setModalIndex(i);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const modalNext = () =>
        setModalIndex((prev) => (prev + 1) % images.length);

    const modalPrev = () =>
        setModalIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    // TOUCH SWIPE
    let startX = 0;

    const onTouchStart = (e) => {
        startX = e.touches[0].clientX;
        setIsUserClicked(true);
    };

    const onTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) triggerNext();
        if (endX - startX > 50) triggerPrev();
    };

    return (
        <div className="w-full flex gap-4">

            {/* LEFT THUMBNAILS (HIDE ON MOBILE) */}
            <div className="hidden md:flex flex-col gap-3 w-24 overflow-y-auto max-h-[350px]">

                {images.map((img, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setCurrentIndex(index);
                            setIsUserClicked(true);
                        }}
                        className={`cursor-pointer border rounded-lg overflow-hidden 
                            ${currentIndex === index ? "ring-2 ring-blue-500" : ""}`}
                    >
                        <Image
                            src={img}
                            width={200}
                            height={150}
                            alt={`Thumbnail ${index + 1}`}
                            className="object-cover w-full h-20"
                        />
                    </div>
                ))}
            </div>

            {/* MAIN IMAGE */}
            <div
                className={`relative w-full h-[350px] rounded-xl overflow-hidden transition-opacity duration-300 
                ${fade ? "opacity-100" : "opacity-0"}`}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <Image
                    src={images[currentIndex]}
                    alt="Main image"
                    fill
                    className="object-cover cursor-pointer"
                    onClick={() => openModal(currentIndex)}
                />

                {/* Prev */}
                <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
                    onClick={() => {
                        setIsUserClicked(true);
                        triggerPrev();
                    }}
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Next */}
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
                    onClick={() => {
                        setIsUserClicked(true);
                        triggerNext();
                    }}
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* ───────────── MODAL ───────────── */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">

                    {/* CLOSE BUTTON */}
                    <button
                        onClick={closeModal}
                        className="absolute top-5 right-5 text-white p-2"
                    >
                        <X size={32} />
                    </button>

                    {/* MAIN MODAL CONTAINER */}
                    <div className="flex flex-col items-center w-full max-w-4xl">

                        {/* BIG IMAGE */}
                        <div className="relative w-full h-[60vh] rounded-xl overflow-hidden">
                            <Image
                                src={images[modalIndex]}
                                alt="Zoomed image"
                                fill
                                className="object-cover"
                            />

                            {/* Prev */}
                            <button
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white"
                                onClick={modalPrev}
                            >
                                <ChevronLeft size={28} />
                            </button>

                            {/* Next */}
                            <button
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white"
                                onClick={modalNext}
                            >
                                <ChevronRight size={28} />
                            </button>
                        </div>

                        {/* BOTTOM THUMBNAILS */}
                        <div className="flex gap-3 mt-4 overflow-x-auto p-2 w-full justify-center">
                            {images.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => setModalIndex(i)}
                                    className={`cursor-pointer border rounded-xl overflow-hidden 
                                    min-w-[80px] h-20
                                    ${modalIndex === i ? "ring-2 ring-blue-500" : ""}`}
                                >
                                    <Image
                                        src={img}
                                        width={100}
                                        height={70}
                                        alt={`Preview ${i}`}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
