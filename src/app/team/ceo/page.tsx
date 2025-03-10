"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CeoZodvalidation } from "@/Backend/Schema/Ceo.Schema";
import { SaveCeoDeatils } from "@/Backend/tools/auth";

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
      await SaveCeoDeatils(data);
      router.push("/ceo-dashboard");
    } catch (error) {
      console.error("Failed to save CEO details:", error);
      alert("Failed to save details. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src={session?.user?.image || "data:image/jpeg;base64,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"}
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
