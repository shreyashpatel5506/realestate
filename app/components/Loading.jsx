"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center z-50">
      
      {/* Loader Container */}
      <div className="relative flex items-center justify-center mb-6">
        
        {/* Outer Ring: Spinning Gradient (symbolizing progress) */}
        <div className="w-24 h-24 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
        
        {/* Center Icon: The House (symbolizing the core product) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-10 h-10 text-blue-600 animate-pulse" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.753.753 1.141 1.763 1.091 2.828l-.203 4.254a2.25 2.25 0 01-2.246 2.138H5.199a2.25 2.25 0 01-2.247-2.138l-.2-4.254a3.75 3.75 0 011.09-2.828L12 5.432z" />
          </svg>
        </div>
      </div>

      {/* Brand Text */}
      <h2 className="text-xl font-bold text-slate-800 tracking-tight">
        <span className="text-blue-600">Loading</span>
      </h2>
      
      {/* Subtext */}
      <p className="text-slate-500 text-sm font-medium mt-2 animate-pulse">
        Finding your dream home...
      </p>
    </div>
  );
}
