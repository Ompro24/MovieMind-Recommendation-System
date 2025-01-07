export interface Genre {
  id: number;
  name: string;
}

export interface Question {
  id: string;
  text: string;
  options: {
    label: string;
    value: string;
    genreIds?: number[];
    yearRange?: [number, number];
    rating?: number;
  }[];
}