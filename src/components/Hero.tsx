import React from 'react';
import { Play, Info } from 'lucide-react';
import type { Movie } from '../types/movie';

interface HeroProps {
  movie?: Movie;
}

export default function Hero({ movie }: HeroProps) {
  if (!movie) return null;

  return (
    <div className="relative h-[95vh] w-full">
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
            {movie.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 line-clamp-3">
            {movie.overview}
          </p>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-white/90 transition-colors">
              <Play className="h-5 w-5 fill-black" />
              Play
            </button>
            <button className="flex items-center gap-2 bg-gray-500/30 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-500/40 transition-colors backdrop-blur-sm">
              <Info className="h-5 w-5" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}