import React, { useState } from 'react';
import { Mail, Lock, Film, Play, Star, Sparkles, User } from 'lucide-react';
import InputField from '../components/auth/InputField';

interface LoginPageProps {
  onLogin: (email: string) => void;
  onGuestAccess: () => void;
}

export default function LoginPage({ onLogin, onGuestAccess }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all fields');
      return;
    }

    if (isLogin) {
      onLogin(email);
    } else {
      // Handle signup
      onLogin(email); // For now, just log them in
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/50 z-10" />
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Movie Theater"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 p-12 flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-white mb-8 drop-shadow-lg">
            Your Personal Movie Journey Begins Here
          </h1>
          <div className="space-y-8 text-gray-100">
            <Feature
              icon={<Play className="h-6 w-6 text-red-500" />}
              title="Endless Entertainment"
              description="Discover and explore thousands of movies across all genres"
            />
            <Feature
              icon={<Sparkles className="h-6 w-6 text-yellow-500" />}
              title="Smart Recommendations"
              description="Get personalized suggestions powered by advanced AI"
            />
            <Feature
              icon={<Star className="h-6 w-6 text-green-500" />}
              title="Track Your Favorites"
              description="Create your watchlist and never miss a great movie"
            />
          </div>
        </div>
      </div>

      {/* Login/Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-red-600 mb-6">
              <Film className="h-12 w-12" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">Welcome to MovieMind</h2>
            <p className="text-gray-300">
              {isLogin 
                ? "Sign in to access your personalized movie experience"
                : "Create an account to start your movie journey"
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-gray-800 rounded-lg p-8 shadow-xl">
            <div className="space-y-4">
              {!isLogin && (
                <InputField
                  icon={<User className="h-5 w-5" />}
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}

              <InputField
                icon={<Mail className="h-5 w-5" />}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <InputField
                icon={<Lock className="h-5 w-5" />}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md font-semibold
                hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500
                focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Or</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={onGuestAccess}
                className="w-full bg-gray-700 text-white py-3 rounded-md font-semibold
                  hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500
                  focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
              >
                Continue as Guest
              </button>

              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full text-gray-400 hover:text-white transition-colors text-sm"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex items-start gap-4 bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg">
      <div className="p-2 bg-gray-800 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-white text-lg mb-1">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
}