import React, { useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import { Loader2 } from 'lucide-react';
import MovieCard from './MovieCard';

export default function PersonalizedRecommendations() {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        // Get user's saved movies from localStorage
        const savedMovies = JSON.parse(localStorage.getItem('myList') || '[]');
        
        if (savedMovies.length === 0) {
          setRecommendations([]);
          setLoading(false);
          return;
        }

        // Get genres from saved movies
        const genres = savedMovies.flatMap((movie: Movie) => movie.genre_ids || []);
        const genreCounts = genres.reduce((acc: { [key: number]: number }, genre: number) => {
          acc[genre] = (acc[genre] || 0) + 1;
          return acc;
        }, {});

        // Sort genres by frequency
        const topGenres = Object.entries(genreCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([genre]) => genre)
          .join(',');

        // Get recommendations based on top genres
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=ed72779018f43bc5fe12ed3f428cab98&with_genres=${topGenres}&sort_by=popularity.desc`
        );
        const data = await response.json();
        
        // Filter out movies that are already in the user's list
        const savedMovieIds = new Set(savedMovies.map((m: Movie) => m.id));
        const newRecommendations = data.results.filter((movie: Movie) => !savedMovieIds.has(movie.id));
        
        setRecommendations(newRecommendations.slice(0, 12));
      } catch (error) {
        console.error('Error getting personalized recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    getRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-red-600" />
          <p className="text-lg text-gray-300">Analyzing your preferences...</p>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-300 mb-4">No recommendations available</h3>
        <p className="text-gray-400">
          Add some movies to your list to get personalized recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {recommendations.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMoreInfo={() => {}}
          />
        ))}
      </div>
    </div>
  );
}