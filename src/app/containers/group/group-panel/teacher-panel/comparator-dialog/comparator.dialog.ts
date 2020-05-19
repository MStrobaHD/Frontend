import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VerdictModel } from 'src/app/core/models/judge/verdict.model';
import { VerdictListModel } from 'src/app/core/models/judge/verdict/verdict.list.model';

@Component({
  styleUrls: ['comparator.dialog.scss'],
  selector: 'app-comparator-dialog',
  templateUrl: 'comparator.dialog.html'
})
export class ComparatorDialogComponent {
  editorOptions = {
    theme: 'vs',
    language: 'csharp',
    contextmenu: 'true',
    codelens: 'true',
    colorDecorators: 'true',
    formatOnType: 'true'
  };
  code = this.data.solutionList[0].solution;

  constructor(
    public dialogRef: MatDialogRef<ComparatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ComparatorData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  changeSolutionInEditor(solutionId: number) {
      this.data.solutionList.forEach(element => {
          if (element.Id === solutionId) {
              this.code = element.solution;
              console.log('channged');
          }
      });
  }
}
export class ComparatorData {
  solutionList: VerdictListModel[];
  actualSolution: VerdictListModel;
}
