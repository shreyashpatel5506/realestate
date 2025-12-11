// app/components/PropertyCard.jsx
"use client";
import Image from "next/image";
import { BedDouble, Bath, Square, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const PropertyCard = ({ property }) => {
    const router = useRouter();
    const { title, price, images, city, state, bedrooms, bathrooms, areaSqFt, category } = property;

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(price);

    // Use the first image from the array, or a placeholder if none exists.
    const propertyImage = images && images.length > 0 ? images[0] : "/images/property1.png";

    return (
        <div
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer w-full"
            // Assuming there would be a dedicated single property page route, e.g., /properties/[id]
            onClick={() => router.push(`/property/${property._id}`)}
        >
            {/* Image & Price/Category */}
            <div className="relative h-48">
                <Image
                    src={propertyImage}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={true}
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">
                    {category}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-lg font-bold px-3 py-1 rounded-lg">
                    {formattedPrice}
                </div>
                {/* Favorite Button (Placeholder) */}
                <button
                    className="absolute top-3 right-3 text-white z-10 p-2"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent card click when clicking favorite
                        alert(`Add/Remove ${title} from favorites!`);
                    }}
                >
                    <Heart className="w-6 h-6 fill-white hover:fill-red-500 transition-colors" />
                </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Title & Location */}
                <h3 className="text-xl font-semibold text-gray-800 truncate">
                    {title}
                </h3>
                <p className="text-sm text-gray-500">
                    {city}, {state}
                </p>

                {/* Details */}
                <div className="flex items-center justify-between text-gray-600 text-sm border-t pt-3">
                    <div className="flex items-center gap-1">
                        <BedDouble className="w-4 h-4 text-blue-500" />
                        <span>{bedrooms || 0} Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4 text-blue-500" />
                        <span>{bathrooms || 0} Baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Square className="w-4 h-4 text-blue-500" />
                        <span>{areaSqFt} SqFt</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;