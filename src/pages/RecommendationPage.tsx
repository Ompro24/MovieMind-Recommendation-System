import React from 'react';
import RecommendationWizard from '../components/RecommendationWizard';

export default function RecommendationPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Movie Recommendations</h1>
        <p className="text-gray-300 mb-8">
          Answer a few questions and we'll find the perfect movie for you.
        </p>
        <RecommendationWizard />
      </div>
    </div>
  );
}