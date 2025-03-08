'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SignInSchemaValidation, SignInSchemaType } from '@/Backend/Schema/Sigin.Schema';

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchemaValidation),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: SignInSchemaType) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Sign-in error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogin = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    setError('');
    try {
      const result = await signIn(provider, { redirect: false });
      if (result?.ok) {
        router.push('/dashboard');
      } else {
        setError(`Failed to sign in with ${provider}. Please try again.`);
      }
    } catch (err) {
      console.error(`OAuth error (${provider}):`, err);
      setError('An error occurred during OAuth sign-in.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl text-white text-center mb-8">Sign In</h1>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-gray-300 text-sm">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              required
              placeholder="Enter your email"
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-gray-300 text-sm">Password</label>
            <input
              id="password"
              type="password"
              {...register('password')}
              required
              placeholder="Enter your password"
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={isLoading}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-600 transition-colors"
          >
            {isLoading ? 'Signing In...' : 'Sign In with Email'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-900 px-2 text-gray-500 text-sm">OR</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => socialLogin('google')}
            disabled={isLoading}
            className="w-full p-3 bg-gray-800 text-white rounded hover:bg-blue-600 disabled:bg-gray-600 transition-colors"
          >
            Sign In with Google
          </button>
          <button
            onClick={() => socialLogin('github')}
            disabled={isLoading}
            className="w-full p-3 bg-gray-800 text-white rounded hover:bg-gray-900 disabled:bg-gray-600 transition-colors"
          >
            Sign In with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}