import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import SearchBar from '../components/SearchBar';
import type { Movie } from '../types/movie';

interface HomePageProps {
  onMovieSelect: (movieId: number) => void;
}

export default function HomePage({ onMovieSelect }: HomePageProps) {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchMovies = async (endpoint: string) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      const trending = await fetchMovies(
        'https://api.themoviedb.org/3/trending/movie/week?api_key=ed72779018f43bc5fe12ed3f428cab98'
      );
      const action = await fetchMovies(
        'https://api.themoviedb.org/3/discover/movie?api_key=ed72779018f43bc5fe12ed3f428cab98&with_genres=28'
      );
      const comedy = await fetchMovies(
        'https://api.themoviedb.org/3/discover/movie?api_key=ed72779018f43bc5fe12ed3f428cab98&with_genres=35'
      );
      const drama = await fetchMovies(
        'https://api.themoviedb.org/3/discover/movie?api_key=ed72779018f43bc5fe12ed3f428cab98&with_genres=18'
      );

      setTrendingMovies(trending);
      setActionMovies(action);
      setComedyMovies(comedy);
      setDramaMovies(drama);
    };

    loadMovies();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const results = await fetchMovies(
      `https://api.themoviedb.org/3/search/movie?api_key=ed72779018f43bc5fe12ed3f428cab98&query=${encodeURIComponent(query)}`
    );
    setSearchResults(results);
  };

  return (
    <div className="relative">
      <Hero movies={trendingMovies.slice(0, 5)} onMoreInfo={onMovieSelect} />
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-gray-900/90 pt-20 pb-6">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="relative z-20 -mt-32">
        {isSearching ? (
          <MovieRow 
            title="Search Results" 
            movies={searchResults}
            onMovieSelect={onMovieSelect}
          />
        ) : (
          <>
            <MovieRow 
              title="Trending Now" 
              movies={trendingMovies}
              onMovieSelect={onMovieSelect}
            />
            <MovieRow 
              title="Action Movies" 
              movies={actionMovies}
              onMovieSelect={onMovieSelect}
            />
            <MovieRow 
              title="Comedy Hits" 
              movies={comedyMovies}
              onMovieSelect={onMovieSelect}
            />
            <MovieRow 
              title="Drama" 
              movies={dramaMovies}
              onMovieSelect={onMovieSelect}
            />
          </>
        )}
      </div>
    </div>
  );
}