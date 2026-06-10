import { Component, computed, inject, signal } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { MEDIA_TYPE_LABELS, STATUS_LABELS } from '../../models/media.utils';
import {
  MediaFiltersComponent,
  MediaFilters,
} from '../../components/media-filters/media-filters.component';
import { MediaFormComponent } from '../../components/media-form/media-form.component';

@Component({
  selector: 'app-media-grid',
  standalone: true,
  imports: [MediaFormComponent, MediaFiltersComponent],
  templateUrl: './media-grid.component.html',
  styleUrl: './media-grid.component.scss',
})
export class MediaGridComponent {
  private mediaService = inject(MediaService);

  medias = this.mediaService.medias$;
  editingId: number | null = null;
  showForm = false;
  typeLabels = MEDIA_TYPE_LABELS;
  statusLabels = STATUS_LABELS;

  filters = signal<MediaFilters>({
    title: '',
    creator: '',
    type: '',
    status: '',
    rating: null,
  });

  count = computed(() => this.filteredMedias().length);

  filteredMedias = computed(() => {
    const f = this.filters();
    return this.medias().filter(
      (media) =>
        (!f.title || media.title.toLowerCase().includes(f.title.toLowerCase())) &&
        (!f.creator || media.creator.toLowerCase().includes(f.creator.toLowerCase())) &&
        (!f.type || media.type === f.type) &&
        (!f.status || media.status === f.status) &&
        (!f.rating || (media.rating ?? 0) >= f.rating),
    );
  });

  edit(id: number) {
    this.editingId = id;
  }

  delete(id: number) {
    if (confirm('Supprimer ce média ?')) {
      this.mediaService.delete(id);
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  clearEdit() {
    this.editingId = null;
  }
}
