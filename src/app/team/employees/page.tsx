"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { saveEmployeeData } from "@/Backend/tools/auth";

interface FormData {
  fullName: string;
  email: string;
  employeeIdNumber: string;
  workingHours: number;
}

const EmployeeRegistration: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined); // Fixed type
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      fullName: "",
      email: "",
      employeeIdNumber: "",
      workingHours: 6,
    },
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/");
    else {
      setValue("fullName", session.user?.name || "");
      setValue("email", session.user?.email || "");
      setProfileImage(session.user?.image || "/images/default-employee.jpg");
      setValue("employeeIdNumber", generateEmployeeId());
    }
  }, [status, session, router, setValue]);

  const generateEmployeeId = () => {
    const randomId = Math.floor(Math.random() * 10000000000) + 1000;
    return `Employee-UID-${randomId}`;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setMessage(null);
    try {
      const result = await saveEmployeeData({
        ...data,
        sessionImage: session?.user?.image,
        profilePicture: selectedFile,
      });
      setMessage(result.message);
      setTimeout(() => router.push("/employee-dashboard"), 1500);
    } catch (error: any) {
      setMessage(error.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="relative flex justify-center mb-6">
          <img
            src={profileImage || "/images/default-employee.jpg"}
            alt="Employee Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-600 object-cover"
          />
          <label
            htmlFor="profilePicture"
            className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700"
          >
            <FaPlus className="text-white" />
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {message && (
          <div
            className={`mb-4 p-2 rounded text-center text-white ${
              message.includes("error") ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-white font-semibold" htmlFor="fullName">
              Full Name
            </label>
            <input
              {...register("fullName")}
              id="fullName"
              className="mt-1 w-full rounded border border-gray-600 bg-gray-700 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-white font-semibold" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="mt-1 w-full rounded border border-gray-600 bg-gray-700 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              className="text-white font-semibold"
              htmlFor="employeeIdNumber"
            >
              Employee ID
            </label>
            <input
              {...register("employeeIdNumber")}
              id="employeeIdNumber"
              className="mt-1 w-full rounded border border-gray-600 bg-gray-700 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
          </div>
          <div>
            <label className="text-white font-semibold" htmlFor="workingHours">
              Working Hours
            </label>
            <select
              {...register("workingHours")}
              id="workingHours"
              className="mt-1 w-full rounded border border-gray-600 bg-gray-700 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className={`w-full rounded py-2 text-white ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Processing..." : "Register & Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegistration;
