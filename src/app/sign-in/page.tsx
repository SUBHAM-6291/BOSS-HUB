'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SignInSchemaValidation, SignInSchemaType } from '@/Backend/Schema/Sigin.Schema';
import { signInWithCredentials, signInWithOAuth } from '@/Backend/tools/auth';

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchemaValidation),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: SignInSchemaType) => {
    setError(''); setIsLoading(true);
    try {
      await signInWithCredentials(data.email, data.password);
      router.push('/dashboard');
    } catch {
      setError('Sign-in failed. Try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogin = async (provider: 'google' | 'github') => {
     setIsLoading(true);
    try {
      await signInWithOAuth(provider);
      router.push('/dashboard');
    } catch {
      setError('pls wait we will redirect you');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-sm bg-gray-900 rounded-xl shadow-lg shadow-purple-500/20 p-6">
        <h1 className="text-2xl font-bold text-center text-purple-400 mb-6">Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input {...register('email')} type="email" placeholder="Enter your email" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600" disabled={isLoading} />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <input {...register('password')} type="password" placeholder="Enter your password" className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600" disabled={isLoading} />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={isLoading} className="w-full p-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 disabled:bg-purple-800">
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        {error && <p className="mt-3 text-center text-sm text-green-500">{error}</p>}
        <div className="mt-6 text-center text-gray-400">
          <p>Or sign in with</p>
          <div className="mt-4 flex justify-center gap-4">
            <button onClick={() => socialLogin('google')} disabled={isLoading} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 disabled:bg-gray-600">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.04.69-2.36 1.09-3.71 1.09-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4.01 20.29 7.77 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.77 1 4.01 3.71 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
            <button onClick={() => socialLogin('github')} disabled={isLoading} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 disabled:bg-gray-600">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4-042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}