import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VerdictModel } from 'src/app/core/models/judge/verdict.model';
import { VerdictListModel } from 'src/app/core/models/judge/verdict/verdict.list.model';

@Component({
  styleUrls: ['solution-viewer.dialog.scss'],
  selector: 'app-solution-viewer-dialog',
  templateUrl: 'solution-viewer.dialog.html'
})
export class SolutionViewerDialogComponent {
  editorOptions = {
    theme: 'vs',
    language: 'csharp',
    contextmenu: 'true',
    readOnly: true,
    codelens: 'true',
    colorDecorators: 'true',
    formatOnType: 'true'
  };

  constructor(
    public dialogRef: MatDialogRef<SolutionViewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SolutionViewerData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
export class SolutionViewerData {
  actualSolution: VerdictListModel;
}
