import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MediaFormComponent } from '../media-form/media-form.component';

@Component({
  selector: 'app-media-form-dialog',
  standalone: true,
  imports: [MatDialogModule, MediaFormComponent],
  template: `
    <h2 mat-dialog-title>{{ data.mediaId ? 'Modifier le média' : 'Ajouter un média' }}</h2>

    <mat-dialog-content>
      <app-media-form
        [mediaId]="data.mediaId"
        (saved)="onSaved()"
        (cancel)="onCancel()"
      />
    </mat-dialog-content>
  `,
})
export class MediaFormDialogComponent {
  private dialogRef = inject(MatDialogRef<MediaFormDialogComponent>);
  data: { mediaId?: number } = inject(MAT_DIALOG_DATA);

  onSaved() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
