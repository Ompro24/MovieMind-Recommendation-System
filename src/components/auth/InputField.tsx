import React, { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

export default function InputField({ icon, ...props }: InputFieldProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        {...props}
        className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md
          leading-5 bg-gray-700 text-white placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
          transition-colors"
      />
    </div>
  );
}