import { useState, useEffect } from 'react';
import type { Movie } from '../types/movie';

export function useMyList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMyList();
  }, []);

  const loadMyList = () => {
    const savedList = localStorage.getItem('myList');
    if (savedList) {
      setMovies(JSON.parse(savedList));
    }
    setIsLoading(false);
  };

  const addToList = (movie: Movie) => {
    setMovies((current) => {
      const newList = [...current, movie];
      localStorage.setItem('myList', JSON.stringify(newList));
      return newList;
    });
  };

  const removeFromList = (movieId: number) => {
    setMovies((current) => {
      const newList = current.filter((m) => m.id !== movieId);
      localStorage.setItem('myList', JSON.stringify(newList));
      return newList;
    });
  };

  const isInList = (movieId: number) => {
    return movies.some((m) => m.id === movieId);
  };

  return {
    movies,
    isLoading,
    addToList,
    removeFromList,
    isInList,
  };
}