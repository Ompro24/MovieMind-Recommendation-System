import React, { useState } from 'react';
import { Mail, Lock, User, Loader } from 'lucide-react';
import InputField from './InputField';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Add signup logic here
      console.log('Signup:', { name, email, password });
    } catch (err) {
      setError('Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        icon={<User className="h-5 w-5" />}
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <InputField
        icon={<Mail className="h-5 w-5" />}
        type="email"
        placeholder="Email"
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

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 text-white py-3 rounded-md font-semibold
          hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500
          focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50
          disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <Loader className="h-5 w-5 animate-spin mx-auto" />
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
}