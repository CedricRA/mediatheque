export type MediaType = 'book' | 'movie' | 'series' | 'album' | 'manga';

export interface Media {
  id: number;
  title: string;
  type: MediaType;
  creator: string; // auteur, réalisateur, artiste
  status: 'planned' | 'consumed';
  rating?: number; // 0-5
}

export interface MediaDetails extends Media {
  synopsis?: string;
  coverUrl?: string;
  releaseDate?: string;
  genres?: string[];
  duration?: string;
  comment?: string;
  createdAt?: string;
}