"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Damru Shape */}
        <div className="relative w-28 h-28 animate-spin">
          {/* Gradient rotating body */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 shadow-lg"></div>

          {/* Top knob */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-7 bg-white rounded-full border-4 border-purple-600"></div>

          {/* Bottom knob */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-7 bg-white rounded-full border-4 border-purple-600"></div>
        </div>

        {/* Loading text */}
        <p className="text-white text-lg font-semibold tracking-wide animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
