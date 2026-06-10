import { Component, computed, inject, signal } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { MediaFormComponent } from '../../components/media-form/media-form.component';
import { MEDIA_TYPE_LABELS, STATUS_LABELS } from '../../models/media.utils';
import {
  MediaFilters,
  MediaFiltersComponent,
} from '../../components/media-filters/media-filters.component';

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [MediaFormComponent, MediaFiltersComponent],
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss'],
})
export class MediaListComponent {
  mediaService = inject(MediaService);
  medias = this.mediaService.medias$;
  typeLabels = MEDIA_TYPE_LABELS;
  statusLabels = STATUS_LABELS;
  editingId: number | null = null;
  showForm = false;
  filters = signal<MediaFilters>({
    title: '',
    creator: '',
    type: '',
    status: '',
    rating: null,
  });

  toggleForm() {
    this.showForm = !this.showForm;
  }

  edit(id: number) {
    this.editingId = id;
  }

  clearEdit() {
    this.editingId = null;
  }

  delete(id: number) {
    this.mediaService.delete(id);
  }

  filteredMedias = computed(() => {
    const f = this.filters();

    return this.medias().filter((media) => {
      return (
        (!f.title || media.title.toLowerCase().includes(f.title.toLowerCase())) &&
        (!f.creator || media.creator.toLowerCase().includes(f.creator.toLowerCase())) &&
        (!f.type || media.type === f.type) &&
        (!f.status || media.status === f.status) &&
        (!f.rating || (media.rating ?? 0) >= f.rating)
      );
    });
  });

  count = computed(() => this.filteredMedias().length);
}
