"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CeoZodvalidation } from "@/Backend/Schema/Ceo.Schema";
import { saveCeoDetails } from "@/Backend/tools/auth";
import { FaPlus } from "react-icons/fa";

interface FormData {
  fullName: string;
  email: string;
  ceoIdNumber: string;
}

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CeoZodvalidation),
    defaultValues: {
      fullName: "",
      email: "",
      ceoIdNumber: "",
    },
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
    } else {
      setValue("fullName", session.user?.name || "");
      setValue("email", session.user?.email || "");
      setValue("ceoIdNumber", generateCeoId());
      setProfileImage(session.user?.image || "/images/default-ceo.jpg");
    }
  }, [session, status, router, setValue]);

  const generateCeoId = () => {
    const randomId = Math.floor(Math.random() * 10000000000) + 1000;
    return `CEO-UID-${randomId}`;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      console.log("Submitting CEO data:", {
        fullName: data.fullName,
        email: data.email,
        ceoIdNumber: data.ceoIdNumber,
        profilePicture: selectedFile ? selectedFile.name : "No file",
        sessionImage: session?.user?.image || "No session image",
      });
      const result = await saveCeoDetails({
        ...data,
        profilePicture: selectedFile,
        sessionImage: session?.user?.image,
      });
      console.log("API response:", result);
      setMessage(result.message); // "Welcome back!" or "CEO registered successfully!"
      setTimeout(() => router.push("/ceo-dashboard"), 1500);
    } catch (error) {
      console.error("Unexpected error submitting CEO data:", error);
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="relative flex justify-center mb-6">
          <img
            src={profileImage || "/images/default-ceo.jpg"}
            alt="CEO Profile"
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
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="text-white font-semibold" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-white font-semibold" htmlFor="ceoIdNumber">
              CEO ID
            </label>
            <input
              {...register("ceoIdNumber")}
              id="ceoIdNumber"
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
            {errors.ceoIdNumber && (
              <p className="mt-1 text-sm text-red-400">{errors.ceoIdNumber.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 text-white rounded ${
              isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Processing..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;