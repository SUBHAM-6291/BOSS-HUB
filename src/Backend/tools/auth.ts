
import { signIn } from 'next-auth/react';


export async function signInWithCredentials(email: string, password: string) {
  try {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    
    if (result?.error) {
      throw new Error(result.error);
    }
    return result;
  } catch (error) {
    throw error;
  }
}

export async function signInWithOAuth(provider: 'google' | 'github') {
  try {
    const result = await signIn(provider, { redirect: false });
    
    if (!result?.ok) {
      throw new Error(`Failed to sign in with ${provider}`);
    }
    return result;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(data: { 
  username: string; 
  email: string; 
  password: string 
}) {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }
    
    return res;
  } catch (error) {
    throw error;
  }
}

export async function saveCeoDetails(data: {
  username: string;
  email: string;
  name: string;
  UserId: string;
}) {
  try {
    const ceoResponse = await fetch('/api/auth/ceo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!ceoResponse.ok) {
      const { message } = await ceoResponse.json();
      throw new Error(message);
    }
    
    return ceoResponse;
  } catch (error) {
    throw error;
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
    const response = await fetch('/api/auth/Managers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }
    
    return response;
  } catch (error) {
    throw error;
  }
}

interface EmployeeTypesafetyTools {
  fullName: string;
  email: string;
  employeeIdNumber: string;
 
  workingHours: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function saveEmployeeData(data: EmployeeTypesafetyTools) {
  try {
    const response = await fetch('/api/auth/Employe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }
    
    return response;
  } catch (error) {
    throw error;
  }
}