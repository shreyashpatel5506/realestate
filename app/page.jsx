"use client";

import React from 'react'
import Image from 'next/image'
import background from '../public/backgroundimageHome.png'
import Navbar from './components/Navbar'
import { Home, Key, Tag, CalendarCheck } from 'lucide-react'
import PropertyHome from './components/propertyHome'

// Service Card (Icon + Title)
const ServiceCardItem = ({ Icon, title, isFloating }) => (
    <div className="flex flex-col items-center text-center p-2 sm:p-4">
        <Icon
            className={`
                mb-3
                w-[clamp(2rem,4vw,3rem)]
                h-[clamp(2rem,4vw,3rem)]
                ${isFloating ? 'text-[#020202]' : 'text-white'}
            `}
        />
        <h3
            className={`
                font-semibold font-sans
                text-[clamp(0.8rem,2vw,1.2rem)]
                ${isFloating ? 'text-gray-800' : 'text-white'}
            `}
        >
            {title}
        </h3>
    </div>
);

const SERVICES = [
    { Icon: Home, title: "Buy a Home" },
    { Icon: Key, title: "Rent a Place" },
    { Icon: Tag, title: "List Your Property" },
    { Icon: CalendarCheck, title: "Schedule a Visit" }
];

const Page = () => {
    return (
        <div className="w-full m-0 p-0 bg-white">

            {/* HERO SECTION */}
            <div className="relative w-full h-[541px] md:h-[868px] overflow-hidden">

                {/* Navbar */}
                <div className="relative z-20">
                    <Navbar />
                </div>

                {/* Background Image */}
                <Image
                    src={background}
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />

                {/* HERO TEXT */}
                <div className="absolute inset-0 z-10 flex justify-start items-center p-4 sm:p-8 md:p-12 lg:p-24">
                    <div className="max-w-xl text-white font-sans flex flex-col gap-6">

                        {/* City Name */}
                        <div className="text-[clamp(0.9rem,2.5vw,1.4rem)] font-medium leading-relaxed font-bricolage" >
                            Palm springs, CA
                        </div>

                        {/* MAIN HEADING */}
                        <h1 className="font-semibold  font-bricolage leading-none text-[clamp(2.5rem,8vw,6rem)]">
                            Futuristic <br /> Haven
                        </h1>

                        {/* BUTTONS */}
                        <div className="flex flex-wrap gap-4 pt-6">

                            <button className="px-6 py-3 sm:px-8 sm:py-4 bg-white rounded-full font-bricolage font-semibold text-[clamp(0.9rem,2vw,1rem)] text-[#172023] hover:bg-gray-100 transition"
                                onClick={() => window.location.href = '/properties'}
                            >
                                Get in touch
                            </button>

                            <button className="px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-white font-bricolage font-semibold text-[clamp(0.9rem,2vw,1rem)] text-white hover:bg-white/10 transition">
                                View Details
                            </button>

                        </div>
                    </div>
                </div>

                {/* FLOATING SERVICES CARD (DESKTOP/TABLET) */}
                <div className="hidden md:block absolute bottom-8 right-8 z-10 w-auto">
                    <div className="bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-2xl max-w-xl">
                        <div className="grid grid-cols-4 gap-6">
                            {SERVICES.map((service, index) => (
                                <ServiceCardItem
                                    key={`floating-${index}`}
                                    Icon={service.Icon}
                                    title={service.title}
                                    isFloating={true}
                                />
                            ))}
                        </div>
                    </div>
                </div>

            </div> {/* END HERO */}

            <section className="md:hidden w-full mx-auto py-12 px-4 bg-white">
                <h2 className="text-[clamp(1.5rem,6vw,2.2rem)] font-semibold mb-8 text-center font-sans text-black">
                    Explore Our Services
                </h2>

                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                    {SERVICES.map((service, index) => (
                        <div
                            key={`mobile-${index}`}
                            className="flex flex-col items-center text-center p-4 bg-gray-100 rounded-lg shadow-sm"
                        >
                            <service.Icon className="w-[clamp(2rem,6vw,3rem)] h-[clamp(2rem,6vw,3rem)] text-[#000000] mb-2" />
                            <h3 className="text-[clamp(0.9rem,3vw,1.2rem)] font-semibold font-sans text-black">
                                {service.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </section>

            <PropertyHome />
        </div>
    )
}

export default Page
