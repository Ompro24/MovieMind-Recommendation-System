import React, { useState } from 'react';
import RecommendationWizard from '../components/RecommendationWizard';
import GenreExplorer from '../components/GenreExplorer';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';
import AIRecommendations from '../components/AIRecommendations';
import { Brain, Sparkles, Gauge, ArrowLeft, Cpu } from 'lucide-react';

type RecommendationMethod = 'questionnaire' | 'personalized' | 'ai' | 'similarity' | null;

interface RecommendationPageProps {
  user: { email: string } | null;
}

export default function RecommendationPage({ user }: RecommendationPageProps) {
  const [selectedMethod, setSelectedMethod] = useState<RecommendationMethod>(null);

  const handleBack = () => {
    setSelectedMethod(null);
  };

  if (selectedMethod === 'questionnaire') {
    return (
      <div className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-4xl font-bold text-white">Movie Recommendations</h1>
          </div>
          <RecommendationWizard />
        </div>
      </div>
    );
  }

  if (selectedMethod === 'personalized') {
    return (
      <div className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-4xl font-bold text-white">Personalized Recommendations</h1>
          </div>
          <PersonalizedRecommendations />
        </div>
      </div>
    );
  }

  if (selectedMethod === 'ai') {
    return (
      <div className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-4xl font-bold text-white">AI-Powered Recommendations</h1>
          </div>
          <AIRecommendations />
        </div>
      </div>
    );
  }

  if (selectedMethod === 'similarity') {
    return (
      <div className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-4xl font-bold text-white">Genre Explorer</h1>
          </div>
          <GenreExplorer />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Movie Recommendations</h1>
        <p className="text-gray-300 mb-8">
          Choose how you'd like to discover your next favorite movie.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Questionnaire-based Recommendations */}
          <button
            onClick={() => setSelectedMethod('questionnaire')}
            className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-600/10 rounded-lg group-hover:bg-red-600/20 transition-colors">
                <Brain className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold">Personalized Quiz</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Answer a few questions about your preferences, and we'll find the perfect movies
              that match your taste.
            </p>
          </button>

          {/* Personalized Recommendations */}
          <button
            onClick={() => setSelectedMethod('personalized')}
            className={`bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors text-left group 
              ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!user}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-600/10 rounded-lg group-hover:bg-purple-600/20 transition-colors">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">
                {user ? 'Personalized For You' : 'Sign In Required'}
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              {user
                ? 'Get recommendations based on your watch history and saved movies.'
                : 'Sign in to get personalized recommendations based on your preferences.'}
            </p>
          </button>

          {/* AI-Powered Recommendations */}
          <button
            onClick={() => setSelectedMethod('ai')}
            className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-600/10 rounded-lg group-hover:bg-green-600/20 transition-colors">
                <Cpu className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">AI-Powered</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Advanced recommendations powered by machine learning that understands your taste
              in movies.
            </p>
          </button>

          {/* Genre & Similarity */}
          <button
            onClick={() => setSelectedMethod('similarity')}
            className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors text-left group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-600/10 rounded-lg group-hover:bg-blue-600/20 transition-colors">
                <Gauge className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Genre Explorer</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Discover movies based on genres you love and find similar titles to your
              favorites.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}