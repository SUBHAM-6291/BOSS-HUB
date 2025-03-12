"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Page = () => {
  const [eye1Position, setEye1Position] = useState({ x: 0, y: 0 });
  const [eye2Position, setEye2Position] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e:MouseEvent) => {
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
    <div className="flex flex-col">
      {}
      <div className="flex h-screen">
        <div className="w-1/2 bg-black border-t-4 border-white flex items-center justify-center">
          <div className="text-white p-8 max-w-md space-y-6">
            <div className="relative inline-block group">
              <h1 className="text-4xl font-bold tracking-tight transition-transform duration-300 group-hover:scale-105">
                Welcome to BossHub
              </h1>
              <span className="absolute left-0 bottom-[-8px] w-full h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </div>
            <p className="text-xl font-light leading-relaxed">
              Empowering businesses with innovative solutions and professional services. Let us help you achieve your goals with excellence.
            </p>
            <Link href="/direct-login">
              <button className="mt-6 px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium text-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
                Direct Login
              </button>
            </Link>
          </div>
        </div>
        <div className="w-1 bg-white"></div>
        <div className="w-1/2">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Professional Workspace"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {}
      <div className="h-screen bg-[#C2C3FB] flex">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between w-full">
          <div className="space-y-4 w-1/2 text-left translate-x-[10vh]">
            <h1 className="font-bold text-5xl tracking-tighter text-black">
              Welcome to BossHub
            </h1>
            <p className="text-xl text-black font-semibold leading-relaxed">
              Grow your business with innovative strategies and expert solutions. Unlock new opportunities and thrive in today’s market.
            </p>
          </div>
          <div className="w-1/2 flex justify-center">
            <img
              src="https://www.lighthousecu.org/wp-content/uploads/2025/02/hands-plant-1-png.webp"
              alt="Hands planting symbolizing business growth"
              className="w-[400px] h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {}
      <div className="h-[80vh] bg-[#C2C3FB] flex">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between w-full">
          <div className="w-1/2 flex justify-center translate-x-[-30vh]">
            <img
              src="https://www.lighthousecu.org/wp-content/uploads/2025/02/card-image-1400x1400.webp"
              alt="Business card image"
              className="w-[400px] h-auto object-contain"
            />
          </div>
          <div className="space-y-4 w-1/2 text-left">
            <h1 className="font-bold text-5xl tracking-tighter text-black">
              Achieve More with BossHub
            </h1>
            <p className="text-xl text-black font-semibold leading-relaxed">
              Elevate your business to new heights with our tailored services.
            </p>
            <p className="text-2xl text-black italic">"Success Starts Here"</p>
            <button className="px-6 py-3 bg-white text-black border-2 border-black rounded-lg font-medium hover:bg-black hover:text-white transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {}
      <div className="h-screen bg-[#ffccaf] flex items-center justify-center">
        <div className="flex items-center justify-center text-left space-x-12 px-4">
          <div className="relative group">
            <img
              src="https://www.lighthousecu.org/wp-content/uploads/2025/02/Member-1-1-1-png.webp"
              alt="Master Your Empire Section"
              className="w-[300px] h-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-semibold text-black">
              Master Your Empire with BossHub
            </h1>
            <p className="text-xl text-black italic font-semibold opacity-80 transition-opacity duration-300 hover:opacity-100">
              "Control Simplified, Success Amplified"
            </p>
            <div className="flex gap-5">
              <button className="px-8 py-3 bg-[#1a1a1a] text-white font-medium text-lg rounded-md hover:bg-[#333333] transition-colors duration-300 shadow-md hover:shadow-lg">
                Get Started Today
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-[#1a1a1a] text-[#1a1a1a] font-medium text-lg rounded-md hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
                Explore Solutions
              </button>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="h-[140vh] bg-[#C2C3FB] flex items-center justify-center">
        <div className="flex flex-col items-center text-center space-y-8 px-4">
          <div className="relative group">
            <img
              src="https://www.lighthousecu.org/wp-content/uploads/2025/02/card-image-1400x1400.webp"
              alt="Business card image"
              className="w-[400px] h-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-5xl font-semibold text-black">
              Grow Your Business with BossHub
            </h1>
            <p className="text-xl text-black font-semibold max-w-2xl">
              Leverage powerful tools and insights to streamline operations and drive success in today’s competitive market.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-[#1a1a1a] text-white font-medium text-lg rounded-md hover:bg-[#333333] transition-colors duration-300 shadow-md hover:shadow-lg">
                Get Started Today
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-[#1a1a1a] text-[#1a1a1a] font-medium text-lg rounded-md hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
                Explore Solutions
              </button>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="h-screen bg-white flex items-center justify-center">
        <div className="flex w-full max-w-7xl mx-auto px-4 items-center">
          <div className="w-1/2 flex justify-center">
            <img
              src="https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5488.jpg?ga=GA1.1.87197245.1740113568&semt=ais_hybrid"
              alt="High Quality Feature Image"
              className="w-[500px] h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col items-center space-y-6">
            <h1 className="text-5xl">"ARE YOU READY"</h1>
            <div className="flex items-center gap-6">
              <button className="px-8 py-3 bg-[#6b48ff] text-white font-medium text-lg rounded-md hover:bg-[#8b6bff] transition-colors duration-300 shadow-md hover:shadow-lg">
                Download for iOS
              </button>
              <button className="px-8 py-3 bg-[#6b48ff] text-white font-medium text-lg rounded-md hover:bg-[#8b6bff] transition-colors duration-300 shadow-md hover:shadow-lg">
                Download for Android
              </button>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="flex w-full max-w-7xl mx-auto px-4 items-center">
          <div className="w-1/2 flex flex-col items-start text-left space-y-6">
            <h1 className="text-5xl font-semibold text-black">
              Welcome to BossHub
            </h1>
            
            <p className="text-xl text-black font-semibold max-w-lg">
              We’re thrilled to have you join our community. BossHub is here to empower your business journey with cutting-edge tools and support.
            </p>
      
            <img
              src="https://img.freepik.com/free-photo/latin-confident-professionals-suit-standing-against-isolated-background_662251-330.jpg?ga=GA1.1.87197245.1740113568&semt=ais_hybrid"
              alt="Welcome Illustration"
              className="w-[200px] h-auto object-contain "
            />
          </div>
          <div className="w-1/2 flex justify-center">
            <img
              src="https://img.freepik.com/free-photo/young-woman-inside-buisness-center_1303-11919.jpg?ga=GA1.1.87197245.1740113568&semt=ais_hybrid"
              alt="Family Business Image"
              className="w-[500px] h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {}
      <div className="h-screen bg-[#cdea68] flex">
        <div className="w-1/2 flex flex-col justify-center items-start pl-16 space-y-6">
          <h1 className="text-5xl font-bold text-black">Our Approach</h1>
          <button className="px-6 py-3 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-all duration-300">
            Read More
          </button>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <img
            src="https://ochi.design/wp-content/uploads/2022/05/Homepage-Photo-663x469.jpg"
            alt="Our Approach Image"
            className="w-[500px] h-[70vh] object-cover rounded-lg"
          />
        </div>
      </div>

      {}
      <div className="eyes w-full min-h-screen overflow-hidden">
        <div className="relative w-full h-full bg-cover bg-center">
          <img
            src="https://ochi.design/wp-content/uploads/2022/05/Top-Viewbbcbv-1-1440x921.jpg"
            alt="Eyes Background"
            className="w-full h-screen object-cover"
          />
          <div className="absolute flex gap-10 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
            {}
            <div className="flex items-center justify-center w-[15vw] h-[15vw] rounded-full bg-zinc-100">
              <div className="relative flex items-center justify-center w-2/3 h-2/3 rounded-full bg-zinc-900">
                <p className="text-center font-semibold capitalize text-white">play</p>
                <div
                  style={{
                    transform: `translate(${eye1Position.x}px, ${eye1Position.y}px)`,
                  }}
                  className="absolute w-[2vw] h-[2vw] rounded-full bg-zinc-100"
                ></div>
              </div>
            </div>

            {}
            <div className="flex items-center justify-center w-[15vw] h-[15vw] rounded-full bg-zinc-100">
              <div className="relative flex items-center justify-center w-2/3 h-2/3 rounded-full bg-zinc-900">
                <p className="text-center font-semibold capitalize text-white">play</p>
                <div
                  style={{
                    transform: `translate(${eye2Position.x}px, ${eye2Position.y}px)`,
                  }}
                  className="absolute w-[2vw] h-[2vw] rounded-full bg-zinc-100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="w-full py-20 capitalize bg-zinc-900">
        <h1 className="text-3xl font-neue-montreal tracking-tight bg-zinc-900 text-center uppercase text-white py-10">
          Featured Projects
        </h1>

        <div className="flex justify-center items-center bg-zinc-900 gap-20">
          <div className="card-container w-[50%] flex flex-col items-center">
            <h3 className="font-neue-montreal text-2xl text-white mb-5">
              Cardboard Spaceship
            </h3>
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <img
                src="https://ochi.design/wp-content/uploads/2024/08/CS_Website_1-663x551.png"
                alt="Cardboard Spaceship"
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          <div className="card-container w-[50%] flex flex-col items-center">
            <h3 className="font-neue-montreal text-2xl mb-5 text-white">AH2 & Matt Horn</h3>
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <img
                src="https://ochi.design/wp-content/uploads/2024/08/Frame-481692-1-663x551.png"
                alt="AH2 & Matt Horn"
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center bg-zinc-900 mt-20 gap-20">
          <div className="card-container w-[50%] flex flex-col items-center">
            <h3 className="font-neue-montreal text-2xl mb-5 uppercase text-white">Fyde</h3>
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <img
                src="https://ochi.design/wp-content/uploads/2022/09/VISE1-1340x740.jpg"
                alt="Fyde"
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          <div className="card-container w-[55%] flex flex-col items-center">
            <h3 className="font-neue-montreal text-2xl mb-5 uppercase text-white">Vise</h3>
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <img
                src="https://ochi.design/wp-content/uploads/2023/10/Fyde_Illustration_Crypto_2-663x551.png"
                alt="Vise"
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center bg-zinc-900 mt-20 gap-20">
          <div className="card-container w-[55%] flex flex-col items-center">
            <h3 className="font-neue-montreal text-2xl mb-5 uppercase text-white">Trawa</h3>
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <img
                src="https://ochi.design/wp-content/uploads/2023/08/Frame-3875-663x551.jpg"
                alt="Trawa"
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          <div className="card-container w-[55%] flex flex-col items-center">
            <h3 className="font-neue-montreal text-2xl mb-5 uppercase text-white">Premium Blend</h3>
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <img
                src="https://ochi.design/wp-content/uploads/2022/12/PB-Front-4-663x551.png"
                alt="Premium Blend"
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Page;