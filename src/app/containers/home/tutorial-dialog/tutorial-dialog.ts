import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  styleUrls: ['tutorial-dialog.scss'],
  selector: 'app-tutorial-dialog',
  templateUrl: 'tutorial-dialog.html'
})
export class TutorialDialogComponent {
  message = 'Czy jesteś pewny swojego rozwiązania ? ';
  confirmButtonText = 'Tak';
  cancelButtonText = 'Nie';

  constructor(
    public dialogRef: MatDialogRef<TutorialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
export interface ConfirmDialogModel {
  message: string;
  buttonYes: string;
  buttonNo: string;
}
