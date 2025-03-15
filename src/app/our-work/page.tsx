import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
    
      <section className="relative h-[70vh] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Our Work"
          layout="fill"
          objectFit="cover"
          className="opacity-40"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide text-white drop-shadow-lg">
            Our Work
          </h1>
          <p className="mt-3 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Building Success, Step by Step
          </p>
        </div>
      </section>

     
      <section className="py-12 px-4 md:px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            At BossHub, we empower businesses with innovative tools and solutions to streamline operations, enhance productivity, and achieve goals efficiently.
          </p>
        </div>
      </section>

  
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <div className="overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Team Management"
                width={400}
                height={250}
                className="w-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Team Management</h2>
              <p className="text-gray-300 text-sm">
                Tools to monitor attendance, manage schedules, and track performance for seamless coordination.
              </p>
            </div>
          </div>

          {}
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <div className="overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=500&auto=format&fit=crop&q=60"
                alt="Budget Tracking"
                width={400}
                height={250}
                className="w-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Budget Tracking</h2>
              <p className="text-gray-300 text-sm">
                Oversee budgets, approve expenses, and forecast costs with detailed insights.
              </p>
            </div>
          </div>

    
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <div className="overflow-hidden">
              <Image
                src="https://plus.unsplash.com/premium_photo-1661772661721-b16346fe5b0f?w=500&auto=format&fit=crop&q=60"
                alt="Communication"
                width={400}
                height={250}
                className="w-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-indigo-400 mb-3">Communication</h2>
              <p className="text-gray-300 text-sm">
                Integrated messaging to connect CEOs, managers, and teams effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

 
      <footer className="py-6 bg-gray-950 text-center text-gray-400 text-sm">
        <p>© 2025 BossHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;