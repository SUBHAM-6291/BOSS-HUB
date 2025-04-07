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
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchemaValidation),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: SignInSchemaType) => {
    setError(''); 
    setSuccessMessage('');
    setIsLoading(true);
    try {
      await signInWithCredentials(data.email, data.password);
      setSuccessMessage('Sign-in successful! Redirecting...');
      setTimeout(() => router.push('/dashboard'), 1000);
    } catch {
      setError('Sign-in failed. Try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogin = async (provider: 'google' | 'github') => {
    setError('');
    setSuccessMessage('');
    setIsLoading(true);
    try {
      await signInWithOAuth(provider);
      setSuccessMessage(`Signed in with ${provider}! Redirecting...`);
      setTimeout(() => router.push('/dashboard'), 1000);
    } catch {
      setError('Social sign-in failed. Please try again.');
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
            <input 
              {...register('email')} 
              type="email" 
              placeholder="Enter your email" 
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600" 
              disabled={isLoading} 
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <input 
              {...register('password')} 
              type="password" 
              placeholder="Enter your password" 
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600" 
              disabled={isLoading} 
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>
          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full p-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 disabled:bg-purple-800"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        {}
        {error && <p className="mt-3 text-center text-sm text-red-500">{error}</p>}
        {successMessage && <p className="mt-3 text-center text-sm text-green-500">{successMessage}</p>}

        <div className="mt-6 text-center text-gray-400">
          <p>Or sign in with</p>
          <div className="mt-4 flex justify-center gap-4">
            <button 
              onClick={() => socialLogin('google')} 
              disabled={isLoading} 
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 disabled:bg-gray-600"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.04.69-2.36 1.09-3.71 1.09-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4.01 20.29 7.77 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.77 1 4.01 3.71 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
            <button 
              onClick={() => socialLogin('github')} 
              disabled={isLoading} 
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 disabled:bg-gray-600"
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.602-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.088-.607.404-1.088.716-1.338-2.498-.232-5.126-1.247-5.126-5.546 0-1.226.43-2.228 1.135-3.013-.113-.232-.492-1.424.108-2.966 0 0 .935-.282 3.063 1.14A10.726 10.726 0 0112 6.613c.948.004 1.905.13 2.803.39 2.128-1.422 3.063-1.14 3.063-1.14.6 1.542.221 2.734.108 2.966.705.785 1.135 1.787 1.135 3.013 0 4.31-2.63 5.313-5.135 5.546.41.35.777 1.038.777 2.094 0 1.51-.013 2.727-.013 3.1 0 .265.18.577.688.478C19.135 20.17 22 16.42 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}