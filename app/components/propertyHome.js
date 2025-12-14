"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function PropertyHome() {
      const router = useRouter();
    return (
        <div className="w-full bg-white px-4 sm:px-6 md:px-10 lg:px-20 py-14 relative font-sans">

            {/* FAINT CURVED BG LINE */}
            <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
                <svg
                    viewBox="0 00 650 650"
                    className="opacity-50 text-green-600 w-[80%] md:w-[60%] -translate-y-10"
                >
                    <path
                        d="M0 300 C150 200 300 400 600 250"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="transparent"
                    />
                </svg>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 relative z-10">

                {/* LEFT TEXT SECTION */}
                <div className="space-y-4">

                    <p className="text-green-600 font-medium flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        Categories
                    </p>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-bricolage text-gray-900 leading-tight">
                        Explore best properties <br />
                        with expert services.
                    </h1>

                    <p className="text-gray-500 text-base sm:text-lg w-[90%] font-bricolage">
                        Discover a diverse range of premium properties, from luxurious apartments
                        to spacious villas, tailored to your needs.
                    </p>

                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium font-bricolage mt-4"
                    onClick={() => router.push("/properties")}>
                        View properties
                    </button>
                </div>

                {/* RIGHT TOP IMAGE (Featured Property) */}
                <div className="w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px] relative">
                    <Image
                        src="/images/property1.png"
                        alt="Featured property"
                        fill
                        className="rounded-xl shadow-md object-cover"
                    />
                </div>

            </div>

            {/* --- */}

            {/* LOWER SECTION GRID (ALIGNED TO DESIGN IMAGE) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 relative z-10">

                {/* COLUMN 1 & 2: LARGE LUXURY VILLA CARD (span 2 cols on lg) */}
                <div className="relative lg:col-span-2 h-[340px] sm:h-[300px] md:h-[380px] lg:h-[400px] rounded-xl overflow-hidden">
                    {/* IMAGE */}
                    <Image
                        src="/images/luxuryvilla.png"
                        alt="Luxury villa"
                        fill
                        className="object-cover brightness-95"
                    />
                </div>
                {/* COLUMN 3: CONTAINER FOR SMALL CARDS (span 1 col on lg) */}
                <div className="lg:col-span-1 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">

                    {/* SMALL CARD 1: MODERN APARTMENT */}
                    <div className="relative h-[200px] sm:h-[240px] lg:h-full rounded-xl overflow-hidden">
                        <Image
                            src="/images/Apartment.png"
                            alt="Modern apartment"
                            fill
                            className="object-cover"
                        />
                        {/* OVERLAY TEXT */}
                        <div className="absolute inset-0 p-4 flex flex-col justify-end text-white bg-black/20">
                            <h3 className="text-xl font-bold">Modern Apartments</h3>
                        </div>
                    </div>

                    {/* SMALL CARD 2: OFFICE INTERIOR */}
                    <div className="relative h-[200px] sm:h-[240px] lg:h-full rounded-xl overflow-hidden">
                        <Image
                            src="/images/property3.png"
                            alt="Office interior"
                            fill
                            className="object-cover"
                        />
                        {/* OVERLAY TEXT */}
                        <div className="absolute inset-0 p-4 flex flex-col justify-end text-white bg-black/20">
                            <h3 className="text-xl font-bold">Commercial Spaces</h3>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}