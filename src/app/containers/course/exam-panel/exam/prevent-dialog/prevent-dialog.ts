import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from 'src/app/containers/judge/code-editor/metrics-dialog/metrics-dialog';

@Component({
  selector: 'app-prevent-dialog',
  templateUrl: 'prevent-dialog.html'
})
export class PreventDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PreventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
