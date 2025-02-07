import React from 'react';
import MovieCard from './MovieCard';
import type { Movie } from '../types/movie';

interface MovieGridProps {
  title: string;
  movies: Movie[];
}

export default function MovieGrid({ title, movies }: MovieGridProps) {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}