import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MEDIA_TYPE_LABELS, STATUS_LABELS } from '../../models/media.utils';

export interface MediaFilters {
  title: string;
  creator: string;
  type: string;
  status: string;
  rating: number | null;
}

@Component({
  selector: 'app-media-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './media-filters.component.html',
  styleUrls: ['./media-filters.component.scss'],
})
export class MediaFiltersComponent {
  @Output() filtersChange = new EventEmitter<MediaFilters>();

  private fb = new FormBuilder();

  typeLabels = MEDIA_TYPE_LABELS;
  statusLabels = STATUS_LABELS;

  form = this.fb.group({
    title: [''],
    creator: [''],
    type: [''],
    status: [''],
    rating: [null as number | null],
  });

  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      this.filtersChange.emit(value as MediaFilters);
    });
  }

  reset() {
    this.form.reset({
      title: '',
      creator: '',
      type: '',
      status: '',
      rating: null,
    });
  }
}
