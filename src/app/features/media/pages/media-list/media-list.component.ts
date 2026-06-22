import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MediaService } from '../../services/media.service';
import { MediaFormDialogComponent } from '../../components/media-form-dialog/media-form-dialog.component';
import { MEDIA_TYPE_LABELS, STATUS_LABELS } from '../../models/media.utils';
import {
  MediaFilters,
  MediaFiltersComponent,
} from '../../components/media-filters/media-filters.component';

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [MediaFiltersComponent],
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss'],
})
export class MediaListComponent {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  mediaService = inject(MediaService);
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

  count = computed(() => this.filteredMedias().length);

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
}
