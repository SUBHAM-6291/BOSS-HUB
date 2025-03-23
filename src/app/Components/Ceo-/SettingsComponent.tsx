"use client";

import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import { useSession } from "next-auth/react";

// Define interfaces for UserData and Session user
interface UserData {
  fullName: string;
  email: string;
  profilePicture?: string;
}

// Define the expected shape of the session user (adjust based on your NextAuth setup)
interface SessionUser {
  name: string;
  email: string;
  image?: string;
}

// Extend the session type if needed
interface Session {
  user: SessionUser;
}

const SettingsComponent: React.FC = () => {
  const { data: session, status } = useSession();

  // Type the form state with UserData interface
  const [form, setForm] = useState<UserData>({
    fullName: "",
    email: "",
    profilePicture: "",
  });

  // Type the submit state as boolean
  const [submit, setSubmit] = useState<boolean>(false);

  // Populate form with session data when available
  useEffect(() => {
    if (session?.user) {
      setForm({
        fullName: session.user.name || "",
        email: session.user.email || "",
        profilePicture: session.user.image || "",
      });
    }
  }, [session]);

  // Handle input changes for text fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prevForm) => ({
        ...prevForm,
        profilePicture: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!submit) {
      setSubmit(true);
      try {
        const response = await fetch("/api/auth/ceo/setting", {
          method: "POST", // Assuming you're updating settings
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (!response.ok) {
          throw new Error("Failed to update settings");
        }

        // Optionally reset submit state or handle success
        setSubmit(false);
      } catch (error) {
        console.error(error);
        setSubmit(false); // Reset submit state on error
        throw new Error(
          "Your CEO settings did not fetch properly. Please check again."
        );
      }
    } else {
      throw new Error(
        "Submission already in progress. Please wait and try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="container mx-auto">
        <div className="bg-black shadow-lg rounded-lg p-6 border border-black">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Settings
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8 max-w-md mx-auto">
            <div className="flex flex-col items-center">
              <div className="relative">
                {form.profilePicture ? (
                  <img
                    src={form.profilePicture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                ) : (
                  <FaUserCircle className="w-32 h-32 text-gray-400 mb-4" />
                )}
                <label className="absolute bottom-4 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
                  <FaCamera className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full bg-black border border-gray-800 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-black border border-gray-800 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter email"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submit} // Disable button while submitting
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-200 w-full max-w-xs disabled:opacity-50"
              >
                {submit ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;
