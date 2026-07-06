import React, { useState } from "react";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;

    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <section className="bg-gradient-to-b from-violet-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">

        <div className="text-center">

          {/* Badge */}
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-xs sm:text-sm font-medium">
            🚀 #1 Job Portal Platform
          </span>

          {/* Heading */}
          <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Find Your <br />
            <span className="text-violet-600">
              Dream Job
            </span>{" "}
            Today
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg px-2">
            Discover thousands of opportunities from top companies and
            take the next step in your career.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-3xl mx-auto">

            {/* Mobile */}
            <div className="flex flex-col sm:hidden gap-3">

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search jobs, skills, companies..."
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
              />

              <button
                onClick={handleSearch}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <Search size={18} />
                Search
              </button>

            </div>

            {/* Desktop */}
            <div className="hidden sm:flex items-center bg-white border rounded-2xl shadow-lg overflow-hidden">

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search jobs, skills, companies..."
                className="flex-1 px-5 py-4 outline-none text-gray-700 text-sm md:text-base"
              />

              <button
                onClick={handleSearch}
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 md:px-8 py-4 flex items-center gap-2 transition"
              >
                <Search size={18} />
                <span className="hidden md:block">
                  Search
                </span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;