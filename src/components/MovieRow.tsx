import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import type { Movie } from '../types/movie';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieSelect: (movieId: number) => void;
}

export default function MovieRow({ title, movies, onMovieSelect }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-2 py-4">
      <h2 className="text-2xl font-bold text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {title}
      </h2>
      <div className="group/row relative">
        <div className="absolute top-0 bottom-0 left-0 z-40 flex items-center">
          <button
            onClick={() => scroll('left')}
            className="bg-black/30 p-2 rounded-full text-white opacity-0 group-hover/row:opacity-100 hover:bg-black/50 transition-all duration-200 -ml-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>
        
        <div
          ref={rowRef}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none w-[200px]">
              <MovieCard 
                movie={movie}
                onMoreInfo={onMovieSelect}
              />
            </div>
          ))}
        </div>

        <div className="absolute top-0 bottom-0 right-0 z-40 flex items-center">
          <button
            onClick={() => scroll('right')}
            className="bg-black/30 p-2 rounded-full text-white opacity-0 group-hover/row:opacity-100 hover:bg-black/50 transition-all duration-200 -mr-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}