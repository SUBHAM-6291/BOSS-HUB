"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ManagerSchemaValidation } from "@/Backend/Schema/Manager.Schema";
import { saveManagersData } from "@/Backend/tools/auth";
import { FaPlus } from "react-icons/fa";

interface Managerstype {
    name: string;
    email: string;
    employeeUID: string;
    department: "Manager" | "CTO" | "Senior Engineer (8-10 years)" | "Engineering Manager";
    profilePicture?: File;
}

const Manager = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Managerstype>({
        resolver: zodResolver(ManagerSchemaValidation),
        defaultValues: {
            name: "",
            email: "",
            employeeUID: "",
            department: "Engineering Manager",
        },
    });

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/");
        } else {
            setValue("name", session.user?.name || "");
            setValue("email", session.user?.email || "");
            setProfileImage(session.user?.image || "/images/download.jpeg");
        }
    }, [session, status, router, setValue]);

    const generateEmployeeUID = () => {
        const newId = `EMP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        setValue("employeeUID", newId);
    };

    useEffect(() => {
        generateEmployeeUID();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setMessage("Profile picture must be less than 5MB");
                return;
            }
            setProfileImage(URL.createObjectURL(file));
            setSelectedFile(file);
        }
    };

    const onSubmit = async (data: Managerstype) => {
        setIsSubmitting(true);
        setMessage(null);
        try {
            const formData = { 
                ...data, 
                profilePicture: selectedFile 
            };
            const response = await saveManagersData(formData);
            setMessage(response.message);
            setTimeout(() => router.push("/managers-dashboard"), 1000);
        } catch (error: any) {
            setMessage(error.message || "An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                {status === "loading" && (
                    <div className="text-center text-white mb-4">Loading...</div>
                )}
                <div className="relative flex justify-center mb-6">
                    <img
                        src={profileImage || "/images/default-profile.jpg"}
                        alt="Profile"
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
                            disabled={isSubmitting}
                        />
                    </label>
                </div>

                {message && (
                    <div
                        className={`mb-4 p-2 rounded text-center text-white ${
                            message.includes("error") || message.includes("5MB") ? "bg-red-600" : "bg-green-600"
                        }`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="text-white font-semibold" htmlFor="name">
                            Name
                        </label>
                        <input
                            {...register("name")}
                            id="name"
                            className="w-full mt-1 p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isSubmitting}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
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
                            disabled={isSubmitting}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="text-white font-semibold" htmlFor="employeeUID">
                            Employee UID
                        </label>
                        <div className="flex gap-2">
                            <input
                                {...register("employeeUID")}
                                id="employeeUID"
                                className="flex-1 mt-1 p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled
                            />
                            <button
                                type="button"
                                onClick={generateEmployeeUID}
                                className="mt-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400"
                                disabled={isSubmitting}
                            >
                                Generate
                            </button>
                        </div>
                        {errors.employeeUID && <p className="mt-1 text-sm text-red-400">{errors.employeeUID.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="text-white font-semibold" htmlFor="department">
                            Department
                        </label>
                        <select
                            {...register("department")}
                            id="department"
                            className="w-full mt-1 p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isSubmitting}
                        >
                            <option value="Engineering Manager">Engineering Manager</option>
                            <option value="CTO">CTO</option>
                            <option value="Senior Engineer (8-10 years)">Senior Engineer (8-10 years)</option>
                            <option value="Manager">Manager</option>
                        </select>
                        {errors.department && <p className="mt-1 text-sm text-red-400">{errors.department.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Manager;