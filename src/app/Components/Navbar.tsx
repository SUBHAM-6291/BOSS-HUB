"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const navItems = [
    "Services",
    "Our Work",
    "About Us",
    "Contact Us",
    "Login",
    "Sign Up"
  ];

  const navLinks = [
    "/services",
    "/our-work",
    "/about-us",
    "/contact-us",
    "/login",
    "/signup"
  ];

  return (
    <div className="w-full">
      <nav className="bg-black w-full h-18 px-4 md:px-16 py-3 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Image
            src="/images/download.jpeg"
            alt="BossHub Logo"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="text-xl font-semibold ">BossHub</span>
        </div>

        <div className="flex items-center gap-7">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={navLinks[index]}
              className={
                item === "Login" || item === "Sign Up"
                  ? "text-sm font-medium px-4 py-1.5 border border-white rounded-full hover:bg-white hover:text-black transition-all duration-200 ease-in-out"
                  : "text-sm font-medium hover:text-gray-200 transition-colors "
              }
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>
      <div className="w-full h-[2px] bg-white"></div>

    </div>
  );
};

export default Navbar;