'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { signupSchema } from '@/Backend/Schema/Sigup.schema';
import { signInWithCredentials, signInWithOAuth, registerUser } from '@/Backend/tools/auth';

type FormData = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [isOAuthLoading, setIsOAuthLoading] = useState(false);
  const { 
    register, 
    handleSubmit, 
    setError,
    formState: { errors, isSubmitting } 
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { username: '', email: '', password: '' },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data);
      const signInResult = await signInWithCredentials(data.email, data.password);
      
      if (signInResult?.ok) {
        router.push('/dashboard');
      } else {
        setError('root', { 
          type: 'manual', 
          message: 'Account created but login failed. Please try signing in.' 
        });
      }
    } catch (error: any) {
      setError('root', { 
        type: 'manual', 
        message: error.message || 'Something went wrong. Please try again.' 
      });
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setIsOAuthLoading(true);
    try {
      await signInWithOAuth(provider);
      router.push('/dashboard');
    } catch (error: any) {
      setError('root', { 
        type: 'manual', 
        message: error.message || `welcome back pls chose nexttime sigin ${provider}.` 
      });
    } finally {
      setIsOAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 rounded-lg bg-gray-900">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Sign Up</h1>
        
        {}
        {errors.root && (
          <p className="mb-4 text-center text-sm text-red-400">{errors.root.message}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
            <input
              id="username"
              {...register('username')}
              className="w-full mt-1 p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              placeholder="Enter your username"
              disabled={isSubmitting}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full mt-1 p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="w-full mt-1 p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              placeholder="Enter your password"
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-md font-semibold disabled:bg-purple-400 text-white"
          >
            {isSubmitting ? 'Creating Your Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 space-y-4">
          <button
            onClick={() => handleOAuthSignIn('google')}
            className="w-full py-3 bg-white text-black rounded-md font-semibold hover:bg-gray-200 flex items-center justify-center gap-2"
            disabled={isSubmitting || isOAuthLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.04.69-2.36 1.09-3.71 1.09-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4.01 20.29 7.77 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.77 1 4.01 3.71 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {isOAuthLoading ? 'Connecting with Google...' : 'Sign Up with Google'}
          </button>
          <button
            onClick={() => handleOAuthSignIn('github')}
            className="w-full py-3 bg-gray-800 text-white rounded-md font-semibold hover:bg-gray-700 flex items-center justify-center gap-2"
            disabled={isSubmitting || isOAuthLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            {isOAuthLoading ? 'Connecting with GitHub...' : 'Sign Up with GitHub'}
          </button>
        </div>
      </div>
    </div>
  );
}