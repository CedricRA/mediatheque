import { Injectable, signal, computed } from '@angular/core';
import { Media } from '../models/media.model';

const STORAGE_KEY = 'media-library';

@Injectable({ providedIn: 'root' })
export class MediaService {
  private medias = signal<Media[]>(this.loadFromStorage());

  private nextId = 1;

  constructor() {
    const medias = this.medias();
    if (medias.length) {
      this.nextId = Math.max(...medias.map((m) => m.id)) + 1;
    }
  }

  medias$ = computed(() => this.medias());

  add(media: Omit<Media, 'id'>) {
    this.medias.update((list) => {
      const updated = [...list, { ...media, id: this.nextId++ }];
      this.saveToStorage(updated);
      return updated;
    });
  }

  update(updatedMedia: Media) {
    this.medias.update((list) => {
      const updated = list.map((m) => (m.id === updatedMedia.id ? updatedMedia : m));
      this.saveToStorage(updated);
      return updated;
    });
  }

  delete(id: number) {
    this.medias.update((list) => {
      const updated = list.filter((m) => m.id !== id);
      this.saveToStorage(updated);
      return updated;
    });
  }

  getById(id: number) {
    return this.medias().find((m) => m.id === id);
  }

  private loadFromStorage(): Media[] {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return [];

    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  private saveToStorage(data: Media[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}
