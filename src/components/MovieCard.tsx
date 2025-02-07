import React from 'react';
import { Info, X } from 'lucide-react';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onRemove?: (movieId: number) => void;
  showRemoveButton?: boolean;
  onMoreInfo?: (movieId: number) => void;
}

export default function MovieCard({ movie, onRemove, showRemoveButton, onMoreInfo }: MovieCardProps) {
  return (
    <div className="relative group">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-md w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-sm font-bold text-white mb-2 line-clamp-1">{movie.title}</h3>
          <div className="flex items-center justify-between">
            {showRemoveButton ? (
              <button 
                onClick={() => onRemove?.(movie.id)}
                className="p-1.5 bg-red-600/80 rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            ) : (
              <button 
                onClick={() => onMoreInfo?.(movie.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 rounded-md hover:bg-white/30 transition-colors text-xs font-medium text-white"
              >
                <Info className="h-3.5 w-3.5" />
                More Info
              </button>
            )}
            <span className="text-xs text-yellow-400 font-medium">{movie.vote_average.toFixed(1)} Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
}