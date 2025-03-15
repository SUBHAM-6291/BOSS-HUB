"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmployeeSchemaType,
  EmployeeSchemaValidation,
} from "@/Backend/Schema/Employe.Schema";
import { saveEmployeeData } from "@/Backend/tools/auth";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EmployeeSchemaType>({
    resolver: zodResolver(EmployeeSchemaValidation),
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

  const onSubmit = async (data: EmployeeSchemaType) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const employeeData = {
        ...data,
        employeeId: generateEmployeeId(),
      };
      await saveEmployeeData(employeeData);
      router.push("/employee-dashboard");
    } catch (error) {
      console.error("Failed to save employee data:", error);
      setErrorMessage("Failed to save employee data. Please try again.");
      router.push("/employee-dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageError = () => {
    setProfileImage("/images/default-employee.jpg");
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
        <div className="flex justify-center mb-6">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Employee Profile"
              className="w-24 h-24 rounded-full border-4 border-blue-600 object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-4 border-blue-600 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">Loading...</span>
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="mb-4 p-2 bg-red-600 text-white rounded">
            {errorMessage}
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
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p>
            )}
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
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
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
            {errors.employeeIdNumber && (
              <p className="mt-1 text-sm text-red-400">{errors.employeeIdNumber.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-white font-semibold" htmlFor="workingHours">
              Working Hours
            </label>
            <select
              {...register("workingHours", { valueAsNumber: true })}
              id="workingHours"
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {workingHoursOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.workingHours && (
              <p className="mt-1 text-sm text-red-400">{errors.workingHours.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 text-white rounded ${
              isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;