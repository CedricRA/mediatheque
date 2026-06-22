import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MediaService } from '../../services/media.service';
import { MEDIA_TYPE_LABELS, STATUS_LABELS } from '../../models/media.utils';
import {
  MediaFiltersComponent,
  MediaFilters,
} from '../../components/media-filters/media-filters.component';
import { MediaFormDialogComponent } from '../../components/media-form-dialog/media-form-dialog.component';

@Component({
  selector: 'app-media-grid',
  standalone: true,
  imports: [MediaFiltersComponent],
  templateUrl: './media-grid.component.html',
  styleUrl: './media-grid.component.scss',
})
export class MediaGridComponent {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private mediaService = inject(MediaService);

  medias = this.mediaService.medias$;
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

  goToDetail(id: number) {
    this.router.navigate(['/media', id]);
  }

  openAddDialog() {
    this.dialog.open(MediaFormDialogComponent, {
      data: {},
      width: '600px',
    });
  }

  edit(id: number) {
    this.dialog.open(MediaFormDialogComponent, {
      data: { mediaId: id },
      width: '600px',
    });
  }

  delete(id: number) {
    if (confirm('Supprimer ce média ?')) {
      this.mediaService.delete(id);
    }
  }
}
