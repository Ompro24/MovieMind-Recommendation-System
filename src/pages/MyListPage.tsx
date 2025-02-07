import React from 'react';
import MovieGrid from '../components/MovieGrid';
import { useMyList } from '../hooks/useMyList';
import { BookmarkX } from 'lucide-react';

export default function MyListPage() {
  const { movies, isLoading, removeFromList } = useMyList();

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-4">My List</h1>
        {movies.length === 0 ? (
          <EmptyState />
        ) : (
          <MovieGrid 
            title="" 
            movies={movies}
            onRemove={removeFromList}
            showRemoveButton
          />
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <BookmarkX className="h-16 w-16 text-gray-500 mb-4" />
      <h2 className="text-xl font-semibold text-gray-300 mb-2">Your list is empty</h2>
      <p className="text-gray-500">Start adding movies to your list to watch them later</p>
    </div>
  );
}