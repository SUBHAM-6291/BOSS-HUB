"use client";

import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="h-[190vh] flex flex-col">
      <div className="flex flex-1">
        <div className="w-1/2 bg-black border-t-4 border-white flex items-center justify-center">
          <div className="text-white p-8 max-w-md space-y-6">
            <div className="relative inline-block group">
              <h1 className="text-4xl font-bold tracking-tight transition-transform duration-300 group-hover:scale-105">
                Welcome to BossHub
              </h1>
              <span className="absolute left-0 bottom-[-8px] w-full h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </div>

            <p className="text-xl font-light leading-relaxed">
              Empowering businesses with innovative solutions and professional
              services. Let us help you achieve your goals with excellence.
            </p>
            <Link href="/direct-login">
              <button className="mt-6 px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium text-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
                Direct Login
              </button>
            </Link>
          </div>
        </div>

        <div className="w-1 bg-white"></div>

        <div className="w-1/2 h-[90vh]">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Professional Workspace"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="min-h-screen flex flex-col">
        {/* Divider */}
        <div className="w-full h-1 bg-white"></div>

        {/* First Section (Previous) */}
        <div className="w-full h-screen bg-[#C2C3FB] flex">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between w-full pt-0">
            {/* Left Side: Business Heading and Text */}
            <div className="space-y-4 md:w-1/2 text-center md:text-left  translate-x-[10vh] ">
              <h1 className="font-bold text-5xl tracking-tighter text-black">
                Welcome to BossHub
              </h1>
              <p className="text-xl text-black font-semibold leading-relaxed">
                Grow your business with innovative strategies and expert solutions. Unlock new opportunities and thrive in today’s market.
              </p>
            </div>

            {/* Right Side: Hands Planting Image */}
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://www.lighthousecu.org/wp-content/uploads/2025/02/hands-plant-1-png.webp"
                alt="Hands planting symbolizing business growth"
                className="w-full max-w-md h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-1 bg-white"></div>

      

        {/* Second Section (No Divider) */}
        <div className="w-full h-[80vh] bg-[#C2C3FB] flex ">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between w-full pt-0">
            <div className="md:w-1/2 flex justify-center translate-x-[-30vh]">
              <img
                src="https://www.lighthousecu.org/wp-content/uploads/2025/02/card-image-1400x1400.webp"
                alt="Business card image"
                className="w-full max-w-md h-auto object-contain "
              />
            </div>
            <div className="space-y-4 md:w-1/2 text-center md:text-left">
              <h1 className="font-bold text-5xl tracking-tighter text-black">
                Achieve More with BossHub
              </h1>
              <p className="text-xl text-black font-semibold leading-relaxed">
                Elevate your business to new heights with our tailored services.
              </p>
              <p className="text-2xl text-black italic">
                "Success Starts Here"
              </p>
              <button className="px-6 py-3 bg-white text-black border-2 border-black rounded-lg font-medium hover:bg-black hover:text-white transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Third Section (No Divider) */}
        <div className="w-full h-[80vh] bg-[#C2C3FB] flex items-center justify-center">
          <div className="text-center space-y-4 max-w-4xl mx-auto px-4">
            <h1 className="font-bold text-6xl md:text-7xl tracking-tighter text-black leading-tight">
              Transform Your Business Today with BossHub
            </h1>
            <p className="text-xl text-black font-semibold leading-relaxed">
              Discover the tools and expertise you need to scale, innovate, and succeed.
            </p>
            <p className="text-2xl text-black italic">
              "Empower Your Future"
            </p>
            <button className="px-8 py-4 bg-white text-black border-2 border-black rounded-lg font-medium text-lg hover:bg-black hover:text-white transition-all duration-300">
              Take Action Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;