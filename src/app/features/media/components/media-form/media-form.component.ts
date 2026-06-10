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

  private fb = inject(FormBuilder);
  private mediaService = inject(MediaService);

  typeLabels = MEDIA_TYPE_LABELS;
  statusLabels = STATUS_LABELS;

  form = this.fb.nonNullable.group({
    title: '',
    type: 'book',
    creator: '',
    status: 'planned',
    rating: 0 as number | null
  });

  ngOnInit() {
    if (this.mediaId) {
      const media = this.mediaService.getById(this.mediaId);
      if (media) {
        this.form.patchValue({
          ...media,
          rating: media.rating ?? null
        });
      }
    }
  }

  save() {
    const value = this.form.value;

    if (this.mediaId) {
      this.mediaService.update({ ...value, id: this.mediaId } as any);
    } else {
      this.mediaService.add(value as any);
    }

    this.saved.emit();

    this.form.reset({
      title: '',
      type: 'book',
      creator: '',
      status: 'planned',
      rating: null
    });
  }
}
