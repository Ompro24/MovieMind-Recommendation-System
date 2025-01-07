import React, { useState } from 'react';
import { questions } from '../data/questions';
import { Movie } from '../types/movie';
import { ArrowRight, Loader2, RefreshCcw } from 'lucide-react';

interface Answer {
  questionId: string;
  option: typeof questions[number]['options'][number];
}

export default function RecommendationWizard() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [recommendedMovie, setRecommendedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = async (option: typeof questions[number]['options'][number]) => {
    const newAnswers = [...answers, { questionId: currentQuestion.id, option }];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      await getRecommendation(newAnswers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const getRecommendation = async (finalAnswers: Answer[]) => {
    setLoading(true);
    try {
      // Build query parameters based on answers
      const moodAnswer = finalAnswers.find(a => a.questionId === 'mood');
      const eraAnswer = finalAnswers.find(a => a.questionId === 'era');
      const qualityAnswer = finalAnswers.find(a => a.questionId === 'quality');

      let url = 'https://api.themoviedb.org/3/discover/movie?api_key=ed72779018f43bc5fe12ed3f428cab98';

      // Add genre filter
      if (moodAnswer?.option.genreIds) {
        url += `&with_genres=${moodAnswer.option.genreIds.join(',')}`;
      }

      // Add year filter
      if (eraAnswer?.option.yearRange) {
        const [startYear, endYear] = eraAnswer.option.yearRange;
        url += `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
      }

      // Add rating filter
      if (qualityAnswer?.option.rating) {
        url += `&vote_average.gte=${qualityAnswer.option.rating}`;
      }

      // Add sorting and limit
      url += '&sort_by=popularity.desc&page=1';

      const response = await fetch(url);
      const data = await response.json();
      
      // Get a random movie from the first page of results
      const randomIndex = Math.floor(Math.random() * Math.min(data.results.length, 5));
      setRecommendedMovie(data.results[randomIndex]);
    } catch (error) {
      console.error('Error getting recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetWizard = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setRecommendedMovie(null);
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-red-600" />
          <p className="text-lg text-gray-300">Finding the perfect movie for you...</p>
        </div>
      </div>
    );
  }

  if (recommendedMovie) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${recommendedMovie.backdrop_path}`}
            alt={recommendedMovie.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2">{recommendedMovie.title}</h3>
            <p className="text-gray-300 mb-4">{recommendedMovie.overview}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={resetWizard}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                <RefreshCcw className="h-4 w-4" />
                Try Again
              </button>
              <div className="text-yellow-400">
                Rating: {recommendedMovie.vote_average.toFixed(1)}/10
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Find Your Perfect Movie</h2>
          <span className="text-gray-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full">
          <div
            className="h-full bg-red-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl mb-6">{currentQuestion.text}</h3>
        <div className="grid gap-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option)}
              className="flex items-center justify-between bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-colors"
            >
              <span>{option.label}</span>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}