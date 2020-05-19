import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JudgePanelComponent } from '../judge/judge-panel/judge-panel.component';
import { JudgePanelResolver } from 'src/app/core/resolvers/judge/judge-panel/judge-panel.resolver';
import { CodeEditorComponent } from '../judge/code-editor/code-editor.component';
import { CodeEditorResolver } from 'src/app/core/resolvers/judge/judge-panel/code-editor.resolver';
import { GroupPanelComponent } from './group-panel/group-panel.component';
import { TeacherPanelComponent } from './group-panel/teacher-panel/teacher-panel.component';

const routes: Routes = [
  {
    runGuardsAndResolvers: 'always',
    path: '',
    component: GroupPanelComponent
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'teacher_panel/:groupId/:groupName',
    component: TeacherPanelComponent
  }

  // {
  //   runGuardsAndResolvers: 'always',
  //   path: '',
  //   component: JudgePanelComponent,
  //   resolve: { courses: JudgePanelResolver }
  // },
  // {
  //   runGuardsAndResolvers: 'always',
  //   path: 'editor/:id',
  //   component: CodeEditorComponent,
  //   resolve: { algorithmTask: CodeEditorResolver }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule {}
