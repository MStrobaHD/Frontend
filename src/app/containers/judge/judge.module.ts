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
import { AlgorithmTaskService } from 'src/app/core/services/judge/algorithm-task-service/algorithm-task.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CodeEditorService } from 'src/app/core/services/judge/code-editor-service/code-editor.service';
import { CodeEditorResolver } from 'src/app/core/resolvers/judge/judge-panel/code-editor.resolver';
import { MetricsDialogComponent } from './code-editor/metrics-dialog/metrics-dialog';
import { FctrlxAngularFileReader } from 'fctrlx-angular-file-reader';
import { NgxGraphModule} from '@swimlane/ngx-graph';
import { DiagramDialog } from './code-editor/diagram-dialog.ts/diagram-dialog';

@NgModule({
  declarations: [
    CodeEditorComponent,
    JudgePanelComponent,
    AlgorithmListComponent,
    AlgorithmAddComponent,
    AlgorithmFileUploadComponent,
    MetricsDialogComponent,
    DiagramDialog
  ],
  imports: [
    CommonModule,
    JudgeRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MonacoEditorModule,
    NgbModule,
    FctrlxAngularFileReader,
    NgxGraphModule
  ],

  entryComponents: [CodeEditorComponent, MetricsDialogComponent, DiagramDialog],
  providers: [JudgePanelResolver, CodeEditorResolver, AlgorithmTaskService, CodeEditorService]
})
export class JudgeModule {}
