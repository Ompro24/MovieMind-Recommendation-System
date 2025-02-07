import React, { useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';
import { Loader2 } from 'lucide-react';

interface Genre {
  id: number;
  name: string;
}

export default function GenreExplorer() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=ed72779018f43bc5fe12ed3f428cab98'
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (!selectedGenre) return;

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=ed72779018f43bc5fe12ed3f428cab98&with_genres=${selectedGenre.id}&sort_by=popularity.desc`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByGenre();
  }, [selectedGenre]);

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre);
    setSelectedMovie(null);
    setSimilarMovies([]);
  };

  const handleMovieSelect = async (movieId: number) => {
    setSelectedMovie(movieId);
    
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=ed72779018f43bc5fe12ed3f428cab98`
      );
      const data = await response.json();
      setSimilarMovies(data.results.slice(0, 6));
    } catch (error) {
      console.error('Error fetching similar movies:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Genre Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreSelect(genre)}
            className={`p-3 rounded-lg text-center transition-colors ${
              selectedGenre?.id === genre.id
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin text-red-600" />
        </div>
      ) : selectedGenre ? (
        <div>
          <h2 className="text-2xl font-bold mb-6">Popular {selectedGenre.name} Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onMoreInfo={handleMovieSelect}
              />
            ))}
          </div>

          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {similarMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMoreInfo={handleMovieSelect}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-12">
          Select a genre to explore movies
        </div>
      )}

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetails
          movieId={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}