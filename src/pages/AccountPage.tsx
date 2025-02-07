import React from 'react';
import { LogOut, User, Film, Settings, Bell, Shield } from 'lucide-react';

interface AccountPageProps {
  user: { email: string } | null;
  onLogout: () => void;
}

export default function AccountPage({ user, onLogout }: AccountPageProps) {
  if (!user) return null;

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-lg p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-700 rounded-full">
                <User className="h-8 w-8 text-gray-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Account Settings</h1>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Profile Section */}
            <Section
              icon={<User className="h-6 w-6" />}
              title="Profile"
              description="Manage your personal information"
            >
              <div className="grid gap-4">
                <Input label="Display Name" placeholder="Enter your name" />
                <Input label="Email" value={user.email} disabled />
              </div>
            </Section>

            {/* Preferences Section */}
            <Section
              icon={<Film className="h-6 w-6" />}
              title="Movie Preferences"
              description="Customize your movie experience"
            >
              <div className="space-y-4">
                <Toggle label="Show mature content" />
                <Toggle label="Autoplay trailers" />
                <Toggle label="Email notifications for new releases" />
              </div>
            </Section>

            {/* Notifications Section */}
            <Section
              icon={<Bell className="h-6 w-6" />}
              title="Notifications"
              description="Control your notification settings"
            >
              <div className="space-y-4">
                <Toggle label="Recommendations" />
                <Toggle label="Watchlist updates" />
                <Toggle label="New releases" />
              </div>
            </Section>

            {/* Privacy Section */}
            <Section
              icon={<Shield className="h-6 w-6" />}
              title="Privacy & Security"
              description="Manage your security preferences"
            >
              <div className="space-y-4">
                <Toggle label="Make profile public" />
                <Toggle label="Share watch history" />
                <button
                  className="text-red-500 hover:text-red-400 transition-colors text-sm"
                >
                  Delete Account
                </button>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

function Section({ icon, title, description, children }: SectionProps) {
  return (
    <div className="border-t border-gray-700 pt-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 bg-gray-700 rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <div className="ml-14">
        {children}
      </div>
    </div>
  );
}

interface InputProps {
  label: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}

function Input({ label, value, placeholder, disabled }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white
          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500
          focus:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
}

interface ToggleProps {
  label: string;
}

function Toggle({ label }: ToggleProps) {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-300">{label}</span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
          ${enabled ? 'bg-red-600' : 'bg-gray-600'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
}