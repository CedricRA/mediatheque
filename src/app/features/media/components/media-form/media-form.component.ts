import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MediaService } from '../../services/media.service';
import { MEDIA_TYPE_LABELS, STATUS_LABELS } from '../../models/media.utils';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '../../../../shared/components/rating/rating.component';

@Component({
  selector: 'app-media-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RatingComponent],
  templateUrl: './media-form.component.html',
  styleUrls: ['./media-form.component.scss']
})
export class MediaFormComponent {

  @Input() mediaId?: number;
  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private mediaService = inject(MediaService);

  typeLabels = MEDIA_TYPE_LABELS;
  statusLabels = STATUS_LABELS;

  form = this.fb.nonNullable.group({
    title: '',
    type: 'book',
    creator: '',
    status: 'planned',
    rating: null as number | null,
    synopsis: '',
    coverUrl: '',
    releaseDate: '',
    genres: '',
    duration: null as string | null,
    comment: '',
  });

  ngOnInit() {
    if (this.mediaId) {
      const media = this.mediaService.getById(this.mediaId);
      if (media) {
        this.form.patchValue({
          title: media.title,
          type: media.type,
          creator: media.creator,
          status: media.status,
          rating: media.rating ?? null,
          synopsis: media.synopsis ?? '',
          coverUrl: media.coverUrl ?? '',
          releaseDate: media.releaseDate ?? '',
          genres: media.genres?.join(', ') ?? '',
          duration: media.duration ?? null,
          comment: media.comment ?? '',
        });
      }
    }
  }

  save() {
    const value = this.form.value;

    const payload = {
      title: value.title ?? '',
      type: (value.type ?? 'book') as any,
      creator: value.creator ?? '',
      status: (value.status ?? 'planned') as any,
      rating: value.rating ?? undefined,
      synopsis: value.synopsis || undefined,
      coverUrl: value.coverUrl || undefined,
      releaseDate: value.releaseDate || undefined,
      genres: value.genres ? value.genres.split(',').map(g => g.trim()).filter(Boolean) : undefined,
      duration: value.duration ?? undefined,
      comment: value.comment || undefined,
    };

    if (this.mediaId) {
      this.mediaService.update({ ...payload, id: this.mediaId } as any);
    } else {
      this.mediaService.add(payload as any);
    }

    this.saved.emit();

    this.form.reset({
      title: '',
      type: 'book',
      creator: '',
      status: 'planned',
      rating: null,
      synopsis: '',
      coverUrl: '',
      releaseDate: '',
      genres: '',
      duration: null,
      comment: '',
    });
  }
}
