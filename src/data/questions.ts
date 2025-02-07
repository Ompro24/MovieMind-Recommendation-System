export const questions = [
  {
    id: 'mood',
    text: "What's your current mood?",
    options: [
      { label: 'Excited', value: 'excited', genreIds: [28, 12] }, // Action, Adventure
      { label: 'Happy', value: 'happy', genreIds: [35, 10751] }, // Comedy, Family
      { label: 'Romantic', value: 'romantic', genreIds: [10749] }, // Romance
      { label: 'Thoughtful', value: 'thoughtful', genreIds: [18, 9648] }, // Drama, Mystery
      { label: 'Thrilled', value: 'thrilled', genreIds: [27, 53] }, // Horror, Thriller
      { label: 'Inspired', value: 'inspired', genreIds: [99, 36] }, // Documentary, History
    ],
  },
  {
    id: 'era',
    text: 'Which era of movies do you prefer?',
    options: [
      { label: 'Classic (1970-1990)', value: 'classic', yearRange: [1970, 1990] },
      { label: 'Modern (1991-2010)', value: 'modern', yearRange: [1991, 2010] },
      { label: 'Contemporary (2011-now)', value: 'contemporary', yearRange: [2011, 2024] },
      { label: 'Any', value: 'any' },
    ],
  },
  {
    id: 'quality',
    text: 'How highly rated should the movie be?',
    options: [
      { label: 'Critically Acclaimed (8+)', value: 'high', rating: 8 },
      { label: 'Well Received (7+)', value: 'medium', rating: 7 },
      { label: 'Any Rating', value: 'any' },
    ],
  },
  {
    id: 'length',
    text: 'Preferred movie length?',
    options: [
      { label: 'Short (< 90 mins)', value: 'short', runtime: { max: 90 } },
      { label: 'Medium (90-120 mins)', value: 'medium', runtime: { min: 90, max: 120 } },
      { label: 'Long (> 120 mins)', value: 'long', runtime: { min: 120 } },
      { label: 'Any Length', value: 'any' },
    ],
  },
  {
    id: 'language',
    text: 'Preferred language?',
    options: [
      { label: 'English', value: 'en', language: 'en' },
      { label: 'Any Language', value: 'any' },
      { label: 'Foreign Films', value: 'foreign', excludeLanguage: 'en' },
    ],
  },
];