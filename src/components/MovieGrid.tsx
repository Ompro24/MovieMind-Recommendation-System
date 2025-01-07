import React from 'react';
import MovieCard from './MovieCard';
import type { Movie } from '../types/movie';

interface MovieGridProps {
  title: string;
  movies: Movie[];
  onRemove?: (movieId: number) => void;
  showRemoveButton?: boolean;
}

export default function MovieGrid({ title, movies, onRemove, showRemoveButton }: MovieGridProps) {
  return (
    <section className="py-8 w-full">
      {title && <h2 className="text-2xl font-bold text-white mb-6 px-4 sm:px-6 lg:px-8">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4 sm:px-6 lg:px-8">
        {movies.map((movie) => (
          <div key={movie.id} className="w-full">
            <MovieCard 
              movie={movie} 
              onRemove={onRemove}
              showRemoveButton={showRemoveButton}
            />
          </div>
        ))}
      </div>
    </section>
  );
}