"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import {
  Home,
  Key,
  Tag,
  CalendarCheck,
  Star,
} from "lucide-react";
import backgroundImage from "../public/backgroundimageHome.png";
import PropertyHome from "./components/propertyHome";

/* ---------------- SERVICES ---------------- */

const ServiceCardItem = ({ Icon, title }) => (
  <div className="flex flex-col items-center text-center p-4">
    <Icon className="mb-3 w-10 h-10 text-black" />
    <h3 className="font-semibold text-gray-800">{title}</h3>
  </div>
);

const SERVICES = [
  { Icon: Home, title: "Buy a Home" },
  { Icon: Key, title: "Rent a Place" },
  { Icon: Tag, title: "List Your Property" },
  { Icon: CalendarCheck, title: "Schedule a Visit" },
];

/* ---------------- REVIEWS DATA ---------------- */

const REVIEWS = [
  {
    name: "Amit Sharma",
    role: "Home Buyer",
    text: "The entire process felt effortless. Everything was transparent and professionally handled.",
    rating: 5,
  },
  {
    name: "Neha Verma",
    role: "Investor",
    text: "Very refined experience. The team understands quality and long-term value.",
    rating: 5,
  },
  {
    name: "Rohit Mehta",
    role: "First-time Buyer",
    text: "I felt guided at every step. No pressure, just honest advice.",
    rating: 4,
  },
  {
    name: "Pooja Patel",
    role: "Property Owner",
    text: "Listing my property here was smooth and stress-free.",
    rating: 5,
  },
];

export default function HomePage() {
  const [active, setActive] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % REVIEWS.length);
        setAnimate(true);
      }, 200);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white font-bricolage text-gray-900">

      {/* ================= HERO ================= */}
      <section className="relative h-[90vh] min-h-[700px] overflow-hidden">
         <div className="relative z-20">
                    <Navbar />
                </div>

        <Image
          src={backgroundImage}
          alt="Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-xl text-white space-y-6">
            <p className="text-sm tracking-wide">Palm Springs, CA</p>

            <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
              Futuristic <br /> Haven
            </h1>

            <div className="flex gap-4">
              {/* ✅ ROUTE FIX */}
              <Link
                href="/properties"
                className="px-6 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition"
              >
                Get in touch
              </Link>

              <Link href="/commonrules" className="px-6 py-3 border border-white rounded-full">
                View details
              </Link>
            </div>
          </div>
        </div>

        {/* Floating services */}
        <div className="hidden md:block absolute bottom-8 right-8 bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-xl">
          <div className="grid grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <ServiceCardItem key={i} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPLORE ================= */}
      <PropertyHome />

      {/* ================= GOOGLE STYLE RATINGS ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <p className="text-green-600 font-medium mb-3">
            Google verified reviews
          </p>

          <h2 className="text-4xl font-semibold mb-6">
            4.8 / 5 Customer Rating
          </h2>

          {/* Google look */}
          <div className="flex justify-center items-center gap-2 mb-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="w-6 h-6 text-yellow-400 fill-yellow-400"
              />
            ))}
            <span className="text-gray-500 text-sm ml-2">
              Based on 120+ reviews
            </span>
          </div>

          {/* Review Card */}
          <div
            className={`bg-white rounded-2xl p-10 shadow-md transition-all duration-500
            ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              “{REVIEWS[active].text}”
            </p>

            <h4 className="font-semibold">{REVIEWS[active].name}</h4>
            <p className="text-sm text-gray-500">
              {REVIEWS[active].role}
            </p>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-3 h-3 rounded-full ${
                  active === i ? "bg-green-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-green-600 font-medium mb-3">Why choose us</p>

            <h2 className="text-4xl font-semibold mb-6">
              Designed for comfort,<br />built on trust.
            </h2>

            <p className="text-gray-500 mb-10 max-w-lg">
              We focus on clarity, quality and long-term value — not just listings.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <ValueItem title="Verified properties" desc="Quality-checked listings only." />
              <ValueItem title="Expert guidance" desc="Professional support throughout." />
              <ValueItem title="Transparent pricing" desc="No hidden surprises." />
              <ValueItem title="Smooth experience" desc="From search to success." />
            </div>
          </div>

          <div className="relative h-[420px] rounded-2xl overflow-hidden">
            <Image
              src="/images/property1.png"
              alt="Lifestyle"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
}

/* ---------------- SMALL COMPONENT ---------------- */

const ValueItem = ({ title, desc }) => (
  <div className="border rounded-xl p-5 hover:shadow-md transition">
    <h4 className="font-semibold mb-2">{title}</h4>
    <p className="text-sm text-gray-500">{desc}</p>
  </div>
);
