export type MediaType = 'book' | 'movie' | 'series' | 'album' | 'manga';

export interface Media {
  id: number;
  title: string;
  type: MediaType;
  creator: string; // auteur, réalisateur, artiste
  status: 'planned' | 'consumed';
  rating?: number; // 0-5
}