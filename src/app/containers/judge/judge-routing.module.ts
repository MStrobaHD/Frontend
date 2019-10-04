import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JudgePanelComponent } from './judge-panel/judge-panel.component';
import { JudgePanelResolver } from 'src/app/core/resolvers/judge/judge-panel/judge-panel.resolver';
import { CodeEditorComponent } from './code-editor/code-editor.component';


const routes: Routes = [
  {
    runGuardsAndResolvers: 'always',
    path: '',
    component: JudgePanelComponent,
    resolve: {courses: JudgePanelResolver}
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'editor/:id',
    component: CodeEditorComponent
  },
  // {
  //   runGuardsAndResolvers: 'always',
  //   path: 'course_panel',
  //   component: CoursePanelComponent
  // },
  // {
  //   runGuardsAndResolvers: 'always',
  //   path: 'course_edition_panel',
  //   component: CourseEditionPanelComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JudgeRoutingModule { }
