import React, { useState } from 'react';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Movie } from '../types/movie';

interface HeroProps {
  movie?: Movie;
  movies?: Movie[];
  onMoreInfo?: (movieId: number) => void;
}

export default function Hero({ movies = [], onMoreInfo }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMovie = movies[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  if (!currentMovie) return null;

  return (
    <div className="relative h-[95vh] w-full group">
      {/* Movie Background */}
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
          alt={currentMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 rounded-full text-white 
          opacity-0 group-hover:opacity-100 hover:bg-black/50 transition-all duration-200 z-20"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 rounded-full text-white 
          opacity-0 group-hover:opacity-100 hover:bg-black/50 transition-all duration-200 z-20"
      >
        <ChevronRight className="h-8 w-8" />
      </button>
      
      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
            {currentMovie.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 line-clamp-3">
            {currentMovie.overview}
          </p>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-white/90 transition-colors">
              <Play className="h-5 w-5 fill-black" />
              Play
            </button>
            <button 
              onClick={() => onMoreInfo?.(currentMovie.id)}
              className="flex items-center gap-2 bg-gray-500/30 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-500/40 transition-colors backdrop-blur-sm"
            >
              <Info className="h-5 w-5" />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}