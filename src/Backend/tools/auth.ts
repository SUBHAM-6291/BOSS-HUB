import { signIn } from "next-auth/react";

export async function signInWithCredentials(email: string, password: string) {
  try {
    const result = await signIn("credentials", { redirect: false, email, password });
    if (result?.error) throw new Error(result.error);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function signInWithOAuth(provider: "google" | "github") {
  try {
    const result = await signIn(provider, { redirect: false });
    if (!result?.ok) throw new Error(`Failed to sign in with ${provider}`);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(data: { username: string; email: string; password: string }) {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).message);
    return res;
  } catch (error) {
    throw error;
  }
}

interface CeoTypesafetyTools {
  fullName: string;
  email: string;
  ceoIdNumber: string;
  profilePicture?: File;
  sessionImage?: string;
}

export async function saveCeoDetails(data: CeoTypesafetyTools) {
  const formData = new FormData();
  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("ceoIdNumber", data.ceoIdNumber);
  if (data.profilePicture) formData.append("profilePicture", data.profilePicture);
  if (data.sessionImage) formData.append("sessionImage", data.sessionImage);

  try {
    const response = await fetch("/api/auth/ceo", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error((await response.json()).message);
    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to save CEO details");
  }

}

export async function saveManagersData(data: {
  name: string;
  email: string;
  employeeUID: string;
  phoneNumber: number;
  department: string;
  createdAt?: Date;
  updatedAt?: Date;
}) {
  try {
    const res = await fetch("/api/auth/Managers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).message);
    return res;
  } catch (error) {
    throw error;
  }
}

interface EmployeeTypesafetyTools {
  fullName: string;
  email: string;
  employeeIdNumber: string;
  workingHours: number;
  profilePicture?: File;
  sessionImage?: string;
}

export async function saveEmployeeData(data: EmployeeTypesafetyTools) {
  const formData = new FormData();
  formData.append("employeeId", data.employeeIdNumber);
  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("workingHours", data.workingHours.toString());
  if (data.sessionImage) formData.append("sessionImage", data.sessionImage);
  if (data.profilePicture) formData.append("profilePicture", data.profilePicture);

  try {
    const response = await fetch("/api/auth/Employe", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error((await response.json()).message);
    return await response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to save employee data");
  }
}