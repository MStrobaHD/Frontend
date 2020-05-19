import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  styleUrls: ['confirm-dialog.scss'],
  selector: 'app-confirm-dialog',
  templateUrl: 'confirm-dialog.html'
})
export class ConfirmDialogComponent {
  message = 'Czy jesteś pewny swojego rozwiązania ? ';
  confirmButtonText = 'Tak';
  cancelButtonText = 'Nie';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
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
