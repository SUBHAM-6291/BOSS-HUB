"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Page = () => {
  const [eye1Position, setEye1Position] = useState({ x: 0, y: 0 });
  const [eye2Position, setEye2Position] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const eye1DeltaX = mouseX - window.innerWidth / 2 - 100;
      const eye1DeltaY = mouseY - window.innerHeight / 2;
      const eye1Angle = Math.atan2(eye1DeltaY, eye1DeltaX);
      const eye1X = Math.cos(eye1Angle) * 20;
      const eye1Y = Math.sin(eye1Angle) * 20;

      const eye2DeltaX = mouseX - window.innerWidth / 2 + 100;
      const eye2DeltaY = mouseY - window.innerHeight / 2;
      const eye2Angle = Math.atan2(eye2DeltaY, eye2DeltaX);
      const eye2X = Math.cos(eye2Angle) * 20;
      const eye2Y = Math.sin(eye2Angle) * 20;

      setEye1Position({ x: eye1X, y: eye1Y });
      setEye2Position({ x: eye2X, y: eye2Y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {}
      <div className="flex flex-col lg:flex-row min-h-[50vh] lg:h-screen">
        <div className="w-full lg:w-1/2 bg-black border-t-4 border-white flex items-center justify-center py-8 lg:py-0">
          <div className="text-white p-4 sm:p-6 lg:p-8 max-w-md space-y-6">
            <div className="relative inline-block group">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight transition-transform duration-300 group-hover:scale-105">
                Welcome to BossHub
              </h1>
              <span className="absolute left-0 bottom-[-8px] w-full h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </div>
            <p className="text-lg sm:text-xl font-light leading-relaxed">
              Empowering businesses with innovative solutions and professional services.
            </p>
            <Link href="/dashboard">
              <button className="mt-6 px-4 py-2 sm:px-6 sm:py-3 bg-transparent border-2 border-white text-white rounded-full font-medium text-base sm:text-lg hover:bg-white hover:text-black transition-all duration-300">
                Direct Login
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Professional Workspace"
            className="w-full h-64 lg:h-full object-cover"
          />
        </div>
      </div>

      {}
      <div className="min-h-[50vh] lg:h-screen bg-[#C2C3FB] flex items-center py-8 lg:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between w-full space-y-6 lg:space-y-0">
          <div className="w-full lg:w-1/2 space-y-4 text-left">
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tighter text-black">
              Welcome to BossHub
            </h1>
            <p className="text-lg sm:text-xl text-black font-semibold leading-relaxed">
              Grow your business with innovative strategies and expert solutions.
            </p>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="https://www.lighthousecu.org/wp-content/uploads/2025/02/hands-plant-1-png.webp"
              alt="Business growth"
              className="w-full max-w-[300px] sm:max-w-[400px] h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {}
      <div className="min-h-[50vh] lg:h-[80vh] bg-[#C2C3FB] flex items-center py-8 lg:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between w-full space-y-6 lg:space-y-0">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="https://www.lighthousecu.org/wp-content/uploads/2025/02/card-image-1400x1400.webp"
              alt="Business card"
              className="w-full max-w-[300px] sm:max-w-[400px] h-auto object-contain"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-4 text-left">
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tighter text-black">
              Achieve More with BossHub
            </h1>
            <p className="text-lg sm:text-xl text-black font-semibold leading-relaxed">
              Elevate your business with tailored services.
            </p>
            <p className="text-xl sm:text-2xl text-black italic">"Success Starts Here"</p>
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-black border-2 border-black rounded-lg font-medium hover:bg-black hover:text-white transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {}
      <div className="min-h-[50vh] lg:h-screen bg-[#ffccaf] flex items-center justify-center py-8 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-center text-left space-y-6 lg:space-y-0 lg:space-x-12 px-4 sm:px-6 lg:px-8">
          <div className="relative group">
            <img
              src="https://www.lighthousecu.org/wp-content/uploads/2025/02/Member-1-1-1-png.webp"
              alt="Master Your Empire"
              className="w-full max-w-[250px] sm:max-w-[300px] h-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-black">
              Master Your Empire
            </h1>
            <p className="text-lg sm:text-xl text-black italic font-semibold opacity-80 hover:opacity-100 transition-opacity duration-300">
              "Control Simplified, Success Amplified"
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-[#1a1a1a] text-white font-medium text-base sm:text-lg rounded-md hover:bg-[#333333] transition-colors duration-300 shadow-md hover:shadow-lg">
                Get Started Today
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-[#1a1a1a] text-[#1a1a1a] font-medium text-base sm:text-lg rounded-md hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
                Explore Solutions
              </button>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="min-h-[50vh] lg:h-[140vh] bg-[#C2C3FB] flex items-center justify-center py-8 lg:py-0">
        <div className="flex flex-col items-center text-center space-y-6 px-4 sm:px-6 lg:px-8">
          <div className="relative group">
            <img
              src="https://www.lighthousecu.org/wp-content/uploads/2025/02/card-image-1400x1400.webp"
              alt="Business card"
              className="w-full max-w-[300px] sm:max-w-[400px] h-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-black">
              Grow Your Business
            </h1>
            <p className="text-lg sm:text-xl text-black font-semibold max-w-2xl">
              Leverage powerful tools and insights to drive success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-[#1a1a1a] text-white font-medium text-base sm:text-lg rounded-md hover:bg-[#333333] transition-colors duration-300 shadow-md hover:shadow-lg">
                Get Started Today
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-[#1a1a1a] text-[#1a1a1a] font-medium text-base sm:text-lg rounded-md hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
                Explore Solutions
              </button>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="min-h-[50vh] lg:h-screen bg-white flex items-center justify-center py-8 lg:py-0">
        <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center space-y-6 lg:space-y-0">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5488.jpg"
              alt="High Quality Feature"
              className="w-full max-w-[400px] sm:max-w-[500px] h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl">ARE YOU READY</h1>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="px-6 py-3 bg-[#6b48ff] text-white font-medium text-base sm:text-lg rounded-md hover:bg-[#8b6bff] transition-colors duration-300 shadow-md hover:shadow-lg">
                Download for iOS
              </button>
              <button className="px-6 py-3 bg-[#6b48ff] text-white font-medium text-base sm:text-lg rounded-md hover:bg-[#8b6bff] transition-colors duration-300 shadow-md hover:shadow-lg">
                Download for Android
              </button>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="min-h-[50vh] lg:h-screen bg-[#f5f5f5] flex items-center justify-center py-8 lg:py-0">
        <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center space-y-6 lg:space-y-0">
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-black">
              Welcome to BossHub
            </h1>
            <p className="text-lg sm:text-xl text-black font-semibold max-w-lg">
              We’re thrilled to empower your business journey with cutting-edge tools.
            </p>
            <img
              src="https://img.freepik.com/free-photo/latin-confident-professionals-suit-standing-against-isolated-background_662251-330.jpg"
              alt="Welcome Illustration"
              className="w-full max-w-[150px] sm:max-w-[200px] h-auto object-contain"
            />
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="https://img.freepik.com/free-photo/young-woman-inside-buisness-center_1303-11919.jpg"
              alt="Family Business"
              className="w-full max-w-[400px] sm:max-w-[500px] h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {}
      <div className="min-h-[50vh] lg:h-screen bg-[#cdea68] flex flex-col lg:flex-row py-8 lg:py-0">
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start px-4 sm:px-8 lg:pl-16 space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">Our Approach</h1>
          <button className="px-4 py-2 sm:px-6 sm:py-3 bg-black text-white rounded-full font-medium text-base sm:text-lg hover:bg-gray-800 transition-all duration-300">
            Read More
          </button>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img
            src="https://ochi.design/wp-content/uploads/2022/05/Homepage-Photo-663x469.jpg"
            alt="Our Approach"
            className="w-full max-w-[400px] sm:max-w-[500px] h-auto object-cover rounded-lg"
          />
        </div>
      </div>

      {}
      <div className="eyes w-full min-h-[50vh] lg:min-h-screen overflow-hidden">
        <div className="relative w-full h-full bg-cover bg-center">
          <img
            src="https://ochi.design/wp-content/uploads/2022/05/Top-Viewbbcbv-1-1440x921.jpg"
            alt="Eyes Background"
            className="w-full h-[50vh] lg:h-screen object-cover"
          />
          <div className="absolute flex gap-4 sm:gap-6 lg:gap-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center justify-center w-20 sm:w-28 lg:w-[15vw] h-20 sm:h-28 lg:h-[15vw] rounded-full bg-zinc-100">
              <div className="relative flex items-center justify-center w-2/3 h-2/3 rounded-full bg-zinc-900">
                <p className="text-xs sm:text-sm lg:text-base text-center font-semibold capitalize text-white">play</p>
                <div
                  style={{ transform: `translate(${eye1Position.x}px, ${eye1Position.y}px)` }}
                  className="absolute w-4 sm:w-6 lg:w-[2vw] h-4 sm:h-6 lg:h-[2vw] rounded-full bg-zinc-100"
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-center w-20 sm:w-28 lg:w-[15vw] h-20 sm:h-28 lg:h-[15vw] rounded-full bg-zinc-100">
              <div className="relative flex items-center justify-center w-2/3 h-2/3 rounded-full bg-zinc-900">
                <p className="text-xs sm:text-sm lg:text-base text-center font-semibold capitalize text-white">play</p>
                <div
                  style={{ transform: `translate(${eye2Position.x}px, ${eye2Position.y}px)` }}
                  className="absolute w-4 sm:w-6 lg:w-[2vw] h-4 sm:h-6 lg:h-[2vw] rounded-full bg-zinc-100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="w-full py-12 sm:py-20 capitalize bg-zinc-900">
        <h1 className="text-2xl sm:text-3xl font-neue-montreal tracking-tight text-center uppercase text-white py-6 sm:py-10">
          Featured Projects
        </h1>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20 px-4 sm:px-6 lg:px-8">
          <div className="card-container w-full lg:w-1/2 flex flex-col items-center">
            <h3 className="font-neue-montreal text-xl sm:text-2xl text-white mb-5">Cardboard Spaceship</h3>
            <div className="w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
              <img
                src="https://ochi.design/wp-content/uploads/2024/08/CS_Website_1-663x551.png"
                alt="Cardboard Spaceship"
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
          <div className="card-container w-full lg:w-1/2 flex flex-col items-center">
            <h3 className="font-neue-montreal text-xl sm:text-2xl mb-5 text-white">AH2 & Matt Horn</h3>
            <div className="w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
              <img
                src="https://ochi.design/wp-content/uploads/2024/08/Frame-481692-1-663x551.png"
                alt="AH2 & Matt Horn"
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
        {}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20 mt-8 lg:mt-20 px-4 sm:px-6 lg:px-8">
          <div className="card-container w-full lg:w-1/2 flex flex-col items-center">
            <h3 className="font-neue-montreal text-xl sm:text-2xl mb-5 uppercase text-white">Fyde</h3>
            <div className="w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
              <img
                src="https://ochi.design/wp-content/uploads/2022/09/VISE1-1340x740.jpg"
                alt="Fyde"
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
          <div className="card-container w-full lg:w-1/2 flex flex-col items-center">
            <h3 className="font-neue-montreal text-xl sm:text-2xl mb-5 uppercase text-white">Vise</h3>
            <div className="w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
              <img
                src="https://ochi.design/wp-content/uploads/2023/10/Fyde_Illustration_Crypto_2-663x551.png"
                alt="Vise"
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
        {}
      </div>
    </div>
  );
};

export default Page;