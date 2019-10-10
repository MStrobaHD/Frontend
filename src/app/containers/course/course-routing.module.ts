import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CoursePanelComponent } from './course-panel/course-panel.component';
import { CourseListResolver } from 'src/app/core/resolvers/education/course/course.resolver';
import { CourseEditionPanelComponent } from './course-panel/course-edition-panel/course-edition-panel.component';
import { ExamComponent } from './exam-panel/exam/exam.component';
import { ExamDragDropComponent } from './exam-panel/exam-drag-drop/exam-drag-drop.component';


const routes: Routes = [
  {
    runGuardsAndResolvers: 'always',
    path: '',
    component: CourseComponent,
    resolve: {courses: CourseListResolver}
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'course_panel',
    component: CoursePanelComponent
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'course_edition_panel',
    component: CourseEditionPanelComponent
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'exam',
    component: ExamComponent
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'dragdrop',
    component: ExamDragDropComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
