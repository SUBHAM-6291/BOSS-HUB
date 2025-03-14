"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CeoZodvalidation } from "@/Backend/Schema/Ceo.Schema";
import { saveCeoDetails } from "@/Backend/tools/auth";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CeoZodvalidation),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      UserId: "",
    },
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
    } else {
      setValue("name", session.user.name || "");
      setValue("email", session.user.email || "");
      setValue("username", session.user.username || "");
    }
  }, [session, status, router, setValue]);

  const generateUserId = () => {
    const randomId = Math.floor(Math.random() * 10000000000) + 1000;
    setValue("UserId", `UID-${randomId}`);
  };

  useEffect(() => {
    generateUserId();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const result = await saveCeoDetails(data);
      
      router.push("/ceo-dashboard");
    } catch (error) {
      console.error("Failed to save CEO details:", error);
      router.push("/ceo-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src={session?.user?.image || "/images/girl.jpg"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-600"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="text-white font-semibold" htmlFor="name">
              Name
            </label>
            <input
              {...register("name")}
              id="name"
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
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
            <label className="text-white font-semibold" htmlFor="username">
              Username
            </label>
            <input
              {...register("username")}
              id="username"
              className="w-full mt-1 p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-400">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-white font-semibold" htmlFor="userId">
              User ID
            </label>
            <div className="flex gap-2">
              <input
                {...register("UserId")}
                id="userId"
                className="flex-1 mt-1 p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
              <button
                type="button"
                onClick={generateUserId}
                className="mt-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Generate
              </button>
            </div>
            {errors.UserId && (
              <p className="mt-1 text-sm text-red-400">{errors.UserId.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;