import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JudgeRoutingModule } from './judge-routing.module';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { JudgePanelComponent } from './judge-panel/judge-panel.component';
import { AlgorithmListComponent } from './judge-panel/algorithm-list/algorithm-list.component';
import { AlgorithmAddComponent } from './judge-panel/algorithm-add/algorithm-add.component';
import { AlgorithmFileUploadComponent } from './judge-panel/algorithm-file-upload/algorithm-file-upload.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JudgePanelResolver } from 'src/app/core/resolvers/judge/judge-panel/judge-panel.resolver';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  declarations: [
    CodeEditorComponent,
    JudgePanelComponent,
    AlgorithmListComponent,
    AlgorithmAddComponent,
    AlgorithmFileUploadComponent
  ],
  imports: [CommonModule, 
            JudgeRoutingModule,
            MaterialModule,
            SharedModule,
            ReactiveFormsModule,
            FormsModule,
            MonacoEditorModule],

            providers: [JudgePanelResolver,]
})
export class JudgeModule {}
