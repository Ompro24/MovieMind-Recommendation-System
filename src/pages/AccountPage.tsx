import React from 'react';
import AuthForm from '../components/auth/AuthForm';

export default function AccountPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <AuthForm />
      </div>
    </div>
  );
}