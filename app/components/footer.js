"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#0f1a1d] text-gray-300">
            {/* Newsletter */}
            <div className="max-w-7xl mx-auto px-6 py-10 border-b border-white/10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <p className="text-white text-lg max-w-md">
                        Stay updated with the latest news, promotions, and exclusive offers.
                    </p>

                    <div className="flex w-full max-w-md">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-5 py-3 rounded-l-full bg-white/10 text-white placeholder-gray-400 focus:outline-none"
                        />
                        <button className="px-8 py-3 rounded-r-full bg-white text-black font-semibold">
                            Subscribe
                        </button>
                    </div>

                    <p className="text-sm text-gray-400 max-w-sm">
                        By subscribing, you agree to receive our promotional emails. You can
                        unsubscribe at any time.
                    </p>

                    <div className="flex gap-4">
                        <Twitter className="cursor-pointer hover:text-white" />
                        <Facebook className="cursor-pointer hover:text-white" />
                        <Instagram className="cursor-pointer hover:text-white" />
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Left */}
                <div>
                    <h2 className="text-4xl font-bold text-white leading-tight">
                        Begin your path to
                        <br /> success—contact us today.
                    </h2>
                    <button className="mt-6 px-8 py-3 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600">
                        Get in touch
                    </button>
                </div>

                {/* Middle Links */}
                <div className="grid grid-cols-2 gap-4">
                    <ul className="space-y-3">
                        <li><Link href="/" className="hover:text-white">Home</Link></li>
                        <li><Link href="/commonrules" className="hover:text-white">Common rules</Link></li>
                        <li><Link href="/properties" className="text-white font-semibold">Properties</Link></li>
                        <li><Link href="/bookingList" className="hover:text-white">BookingList</Link></li>
                    </ul>

                    <ul className="space-y-3">
                        <li><Link href="/signup" className="hover:text-white">Register</Link></li>
                        <li><Link href="/login" className="hover:text-white">Login</Link></li>

                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">© 2025 Homely</p>
                    <div className="flex gap-6 text-sm">
                        <span className="hover:text-white">Terms of service</span>
                        <span  className="hover:text-white">Privacy policy</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}


