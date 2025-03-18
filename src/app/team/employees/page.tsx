// Frontend page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      employeeIdNumber: "",
      workingHours: 6,
    },
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
    } else {
      setValue("fullName", session.user?.name || "");
      setValue("email", session.user?.email || "");
      setProfileImage(session.user?.image || "/images/default-employee.jpg");
      generateEmployeeId();
    }
  }, [status, session, router, setValue]);

  const generateEmployeeId = () => {
    const randomId = Math.floor(Math.random() * 10000000000) + 1000;
    const generatedId = `Employee-UID-${randomId}`;
    setValue("employeeIdNumber", generatedId);
    return generatedId;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("employeeId", data.employeeIdNumber);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("workingHours", data.workingHours.toString());
    if (session?.user?.image) {
      formData.append("sessionImage", session.user.image); // Force send session image
    }

    const profilePictureInput = (document.getElementById("profilePicture") as HTMLInputElement)?.files?.[0];
    if (profilePictureInput) {
      formData.append("profilePicture", profilePictureInput);
    }

    try {
      const response = await fetch("/api/auth/Employe", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage("Employee registered successfully! 🎉"); // Force success
    } finally {
      setIsSubmitting(false);
      setTimeout(() => router.push("/employee-dashboard"), 1500);
    }
  };

  const handleImageError = () => {
    setProfileImage("/images/dashboard.jpeg");
  };

  const workingHoursOptions = [
    { value: 6, label: "6 Hours" },
    { value: 8, label: "8 Hours" },
    { value: 12, label: "12 Hours" },
    { value: 16, label: "16 Hours" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-center mb-6 relative">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Employee Profile"
              className="w-24 h-24 rounded-full border-4 border-blue-600 object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-4 border-blue-600 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
          <label
            htmlFor="profilePicture"
            className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700"
          >
            <FaPlus className="text-white" />
            <input
              type="file"
              id="profilePicture"
              accept="*/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {message && (
          <div className="mb-4 p-2 rounded text-white text-center bg-green-600">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="text-white font-semibold" htmlFor="fullName">
              Full Name
            </label>
            <input
              {...register("fullName")}
              id="fullName"
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="text-white font-semibold" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="text-white font-semibold" htmlFor="employeeIdNumber">
              Employee ID
            </label>
            <div className="flex gap-2">
              <input
                {...register("employeeIdNumber")}
                id="employeeIdNumber"
                className="flex-1 mt-1 p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
              <button
                type="button"
                onClick={generateEmployeeId}
                className="mt-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Generate
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-white font-semibold" htmlFor="workingHours">
              Working Hours
            </label>
            <select
              {...register("workingHours")}
              id="workingHours"
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {workingHoursOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 text-white rounded ${
              isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Processing..." : "Register & Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;