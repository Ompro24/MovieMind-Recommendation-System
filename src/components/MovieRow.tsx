import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import type { Movie } from '../types/movie';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
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
      <h2 className="text-2xl font-bold text-white px-12">{title}</h2>
      <div className="group/row relative">
        <div className="absolute top-0 bottom-0 left-0 z-40 flex items-center">
          <button
            onClick={() => scroll('left')}
            className="h-full px-2 bg-black/30 hover:bg-black/50 transition-all duration-200 opacity-0 group-hover/row:opacity-100"
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </button>
        </div>
        
        <div
          ref={rowRef}
          className="flex space-x-2 overflow-x-scroll scrollbar-hide px-12 pb-4"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none w-[180px] first:pl-0">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        <div className="absolute top-0 bottom-0 right-0 z-40 flex items-center">
          <button
            onClick={() => scroll('right')}
            className="h-full px-2 bg-black/30 hover:bg-black/50 transition-all duration-200 opacity-0 group-hover/row:opacity-100"
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}