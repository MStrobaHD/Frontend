import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { JudgeRoutingModule } from "./judge-routing.module";
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { JudgePanelComponent } from './judge-panel/judge-panel.component';
import { AlgorithmListComponent } from './judge-panel/algorithm-list/algorithm-list.component';
import { AlgorithmAddComponent } from './judge-panel/algorithm-add/algorithm-add.component';
import { AlgorithmFileUploadComponent } from './judge-panel/algorithm-file-upload/algorithm-file-upload.component';

@NgModule({
  declarations: [
    CodeEditorComponent,
    JudgePanelComponent,
    AlgorithmListComponent,
    AlgorithmAddComponent,
    AlgorithmFileUploadComponent
  ],
  imports: [CommonModule, JudgeRoutingModule]
})
export class JudgeModule {}
