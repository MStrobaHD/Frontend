import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MetricsModel } from 'src/app/core/models/judge/metrics.model';

@Component({
  styleUrls: ['metrics-dialog.scss'],
  selector: 'metrics-dialog',
  templateUrl: 'metrics-dialog.html'
})
export class MetricsDialog {
  constructor(
    public dialogRef: MatDialogRef<MetricsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
export interface DialogData {
  metrics: MetricsModel;
}
