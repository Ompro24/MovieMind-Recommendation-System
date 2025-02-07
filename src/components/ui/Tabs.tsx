import React from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ value, onValueChange, children, className = '' }: TabsProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return (
    <div className={`flex gap-2 bg-gray-800 p-1 rounded-lg ${className}`}>
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onValueChange?: (value: string) => void;
}

export function TabsTrigger({ value, children, className = '', onValueChange }: TabsTriggerProps) {
  const handleClick = () => {
    onValueChange?.(value);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium
        transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
        focus:ring-offset-gray-800 ${
          value === value
            ? 'bg-red-600 text-white'
            : 'text-gray-400 hover:text-white hover:bg-gray-700'
        } ${className}`}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className = '' }: TabsContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}