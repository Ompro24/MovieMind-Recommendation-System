import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-gray-400">
          {isLogin
            ? 'Sign in to access your account'
            : 'Sign up to start watching'}
        </p>
      </div>

      {isLogin ? <LoginForm /> : <SignupForm />}

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  );
}