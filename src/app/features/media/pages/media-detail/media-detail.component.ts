import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MediaService } from '../../services/media.service';
import { MediaFormDialogComponent } from '../../components/media-form-dialog/media-form-dialog.component';
import { MEDIA_TYPE_LABELS, STATUS_LABELS } from '../../models/media.utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './media-detail.component.html',
  styleUrls: ['./media-detail.component.scss'],
})
export class MediaDetailComponent {
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private mediaService = inject(MediaService);

  typeLabels = MEDIA_TYPE_LABELS;
  statusLabels = STATUS_LABELS;

  private id = Number(this.route.snapshot.paramMap.get('id'));
  media = computed(() => this.mediaService.getById(this.id));

  edit() {
    this.dialog.open(MediaFormDialogComponent, {
      data: { mediaId: this.id },
      width: '600px',
    });
  }

  delete() {
    const current = this.media();
    if (current && confirm('Supprimer ce média ?')) {
      this.mediaService.delete(current.id);
    }
  }
}
