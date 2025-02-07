import React, { useState } from 'react';
import { questions } from '../data/questions';
import { Movie } from '../types/movie';
import { ArrowRight, Loader2, RefreshCcw, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Answer {
  questionId: string;
  option: typeof questions[number]['options'][number];
}

interface RecommendationFeedback {
  movieId: number;
  liked: boolean;
  timestamp: number;
}

export default function RecommendationWizard() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<{ [key: number]: boolean }>({});

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = async (option: typeof questions[number]['options'][number]) => {
    const newAnswers = [...answers, { questionId: currentQuestion.id, option }];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      await getRecommendations(newAnswers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const getRecommendations = async (finalAnswers: Answer[]) => {
    setLoading(true);
    try {
      // Build base query parameters
      const moodAnswer = finalAnswers.find(a => a.questionId === 'mood');
      const eraAnswer = finalAnswers.find(a => a.questionId === 'era');
      const qualityAnswer = finalAnswers.find(a => a.questionId === 'quality');
      const lengthAnswer = finalAnswers.find(a => a.questionId === 'length');
      const languageAnswer = finalAnswers.find(a => a.questionId === 'language');

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

      // Add runtime filter
      if (lengthAnswer?.option.runtime) {
        const { min, max } = lengthAnswer.option.runtime;
        if (min) url += `&with_runtime.gte=${min}`;
        if (max) url += `&with_runtime.lte=${max}`;
      }

      // Add language filter
      if (languageAnswer?.option.language) {
        url += `&with_original_language=${languageAnswer.option.language}`;
      } else if (languageAnswer?.option.excludeLanguage) {
        url += `&without_original_language=${languageAnswer.option.excludeLanguage}`;
      }

      // Add sorting and limit
      url += '&sort_by=popularity.desc&page=1';

      const response = await fetch(url);
      const data = await response.json();
      
      // Get top 5 recommendations
      const recommendations = data.results.slice(0, 5);
      setRecommendedMovies(recommendations);

      // If we have recommendations, get similar movies for the first one
      if (recommendations.length > 0) {
        const similarResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${recommendations[0].id}/similar?api_key=ed72779018f43bc5fe12ed3f428cab98`
        );
        const similarData = await similarResponse.json();
        setSimilarMovies(similarData.results.slice(0, 5));
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = (movieId: number, liked: boolean) => {
    // Store feedback in localStorage
    const feedback: RecommendationFeedback = {
      movieId,
      liked,
      timestamp: Date.now(),
    };

    const storedFeedback = JSON.parse(localStorage.getItem('movieFeedback') || '[]');
    localStorage.setItem('movieFeedback', JSON.stringify([...storedFeedback, feedback]));

    // Update UI to show feedback was given
    setFeedbackGiven(prev => ({ ...prev, [movieId]: true }));
  };

  const resetWizard = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setRecommendedMovies([]);
    setSimilarMovies([]);
    setFeedbackGiven({});
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-red-600" />
          <p className="text-lg text-gray-300">Finding the perfect movies for you...</p>
        </div>
      </div>
    );
  }

  if (recommendedMovies.length > 0) {
    return (
      <div className="space-y-8">
        {/* Primary Recommendations */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Your Personalized Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedMovies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-xl font-bold mb-2">{movie.title}</h4>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{movie.overview}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {!feedbackGiven[movie.id] ? (
                        <>
                          <button
                            onClick={() => handleFeedback(movie.id, true)}
                            className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                          >
                            <ThumbsUp className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleFeedback(movie.id, false)}
                            className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                          >
                            <ThumbsDown className="h-5 w-5" />
                          </button>
                        </>
                      ) : (
                        <span className="text-sm text-gray-400">Thanks for your feedback!</span>
                      )}
                    </div>
                    <span className="text-yellow-400">{movie.vote_average.toFixed(1)} ★</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Similar Movies You Might Like</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarMovies.map((movie) => (
                <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-xl font-bold mb-2">{movie.title}</h4>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{movie.overview}</p>
                    <div className="flex justify-end">
                      <span className="text-yellow-400">{movie.vote_average.toFixed(1)} ★</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={resetWizard}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
          >
            <RefreshCcw className="h-5 w-5" />
            Get New Recommendations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
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