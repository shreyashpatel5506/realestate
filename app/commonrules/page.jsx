"use client";

import Navbar from "../components/Navbar";
import Image from "next/image";
import content from "../../public/Content.png"

export default function BlogArticlePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navbar */}
            <Navbar theme="light" />

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 py-10">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Top 5 tips for first-time home buyers navigating the market
                </h1>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm  text-black mb-6">
                    <span>By Homely Team</span>
                    <span>•</span>
                    <span>June 12, 2025</span>
                    <span>•</span>
                    <span>5 min read</span>
                </div>

                {/* Hero Image */}
                <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-8">
                    <Image
                        src={content}
                        alt="Home interior"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Article Body */}
                <article className="prose prose-gray max-w-none text-black">
                    <p>
                        Buying your first home can feel overwhelming, especially in a fast-
                        moving real estate market. With the right preparation and guidance,
                        you can make confident decisions and avoid common mistakes.
                    </p>

                    <h2>1. Determine your budget and get pre-approved</h2>
                    <p>
                        Before you start browsing listings, understand how much you can
                        realistically afford. Getting pre-approved for a mortgage gives you
                        clarity and strengthens your position when making an offer.
                    </p>

                    <h2>2. Research the market and neighborhoods</h2>
                    <p>
                        Study recent sale prices, local amenities, future development plans,
                        and commute times. A good neighborhood often matters as much as the
                        property itself.
                    </p>

                    <h2>3. Work with a trusted real estate agent</h2>
                    <p>
                        An experienced agent can guide you through negotiations, paperwork,
                        and inspections while helping you avoid costly pitfalls.
                    </p>

                    <h2>4. Consider additional costs beyond the purchase price</h2>
                    <p>
                        Remember to budget for closing costs, maintenance, property taxes,
                        insurance, and potential renovations.
                    </p>

                    <h2>5. Don’t rush—be patient and strategic</h2>
                    <p>
                        It’s easy to feel pressured, but the right home is worth waiting for.
                        Stay focused on your priorities and long-term goals.
                    </p>

                    <hr />

                    <p className="font-semibold">Final thoughts</p>
                    <p>
                        Your first home purchase is a major milestone. With preparation,
                        research, and professional support, you can navigate the market with
                        confidence and peace of mind.
                    </p>
                </article>
            </main>
        </div>
    );
}
