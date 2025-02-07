import React, { useState, useEffect } from 'react';
import { Star, X, Clock, Calendar, Tag, DollarSign } from 'lucide-react';
import type { MovieDetails, CastMember, Review } from '../types/movie';

interface MovieDetailsProps {
  movieId: number;
  onClose: () => void;
}

export default function MovieDetails({ movieId, onClose }: MovieDetailsProps) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userRating, setUserRating] = useState<number>(0);
  const [userReview, setUserReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieRes, creditsRes, reviewsRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=ed72779018f43bc5fe12ed3f428cab98`),
          fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=ed72779018f43bc5fe12ed3f428cab98`),
          fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=ed72779018f43bc5fe12ed3f428cab98`)
        ]);

        const [movieData, creditsData, reviewsData] = await Promise.all([
          movieRes.json(),
          creditsRes.json(),
          reviewsRes.json()
        ]);

        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 10));
        setReviews(reviewsData.results);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would typically make an API call to submit the review
    // For now, we'll just simulate it and add it to the local state
    const newReview: Review = {
      id: Date.now().toString(),
      author: 'You',
      content: userReview,
      created_at: new Date().toISOString(),
      rating: userRating
    };

    setReviews([newReview, ...reviews]);
    setUserReview('');
    setUserRating(0);
    setIsSubmitting(false);
  };

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="relative min-h-screen">
        {/* Header Image */}
        <div className="relative h-[40vh]">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-64 flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-lg shadow-xl"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-lg text-gray-400 mb-4 italic">{movie.tagline}</p>
              )}

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-300">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="h-5 w-5" />
                  <span>{movie.runtime} min</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
              </div>

              <p className="text-gray-300 mb-6">{movie.overview}</p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Status</h3>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Tag className="h-5 w-5" />
                    <span>{movie.status}</span>
                  </div>
                </div>
                {movie.budget > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Budget</h3>
                    <div className="flex items-center gap-2 text-gray-300">
                      <DollarSign className="h-5 w-5" />
                      <span>{movie.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                    </div>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Revenue</h3>
                    <div className="flex items-center gap-2 text-gray-300">
                      <DollarSign className="h-5 w-5" />
                      <span>{movie.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cast */}
          <section className="my-12">
            <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {cast.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="aspect-[2/3] mb-2">
                    <img
                      src={member.profile_path
                        ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                        : 'https://via.placeholder.com/185x278?text=No+Image'
                      }
                      alt={member.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <h4 className="font-medium text-white">{member.name}</h4>
                  <p className="text-sm text-gray-400">{member.character}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews Section */}
          <section className="my-12">
            <h2 className="text-2xl font-bold text-white mb-6">Reviews</h2>
            
            {/* Review Form */}
            <form onSubmit={handleSubmitReview} className="mb-8 bg-gray-800 rounded-lg p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      className={`p-1 ${userRating >= star ? 'text-yellow-400' : 'text-gray-600'}`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Review
                </label>
                <textarea
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Write your review..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !userReview.trim() || userRating === 0}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md font-medium
                  hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                  focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors"
              >
                Submit Review
              </button>
            </form>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-medium text-white">{review.author}</h4>
                      <p className="text-sm text-gray-400">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {review.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <span className="text-white">{review.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-300">{review.content}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}