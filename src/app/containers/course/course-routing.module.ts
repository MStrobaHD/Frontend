import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CoursePanelComponent } from './course-panel/course-panel.component';
import { CourseListResolver } from 'src/app/core/resolvers/education/course/course.resolver';
import { CourseEditionPanelComponent } from './course-panel/course-edition-panel/course-edition-panel.component';
import { ExamComponent } from './exam-panel/exam/exam.component';
import { ExamDragDropComponent } from './exam-panel/exam-drag-drop/exam-drag-drop.component';
import { ExamPanelComponent } from './exam-panel/exam-panel.component';
import { ExamResolver } from 'src/app/core/resolvers/education/course/exam.resolver';
import { CourseEnroledListResolver } from 'src/app/core/resolvers/education/course/course-enroled.resolver';
import { ExamMatchItemComponent } from './exam-panel/exam-match-item/exam-match-item.component';
import { ExamPropertiesResolver } from 'src/app/core/resolvers/education/exam/exam-properties.resolver';
import { LessonPanelResolver } from 'src/app/core/resolvers/education/lesson/lesson-panel.resolver';


const routes: Routes = [
  {
    runGuardsAndResolvers: 'always',
    path: '',
    component: CourseComponent,
    resolve: {courses: CourseListResolver,
              enroledCourses: CourseEnroledListResolver}
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'course_panel/:courseId',
    component: CoursePanelComponent,
    resolve: {exam: ExamResolver,
      lessonList: LessonPanelResolver},
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'course_edition_panel/:courseId',
    component: CourseEditionPanelComponent
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'exam/:id',
    component: ExamComponent,
    resolve: {exam: ExamResolver,
              examProperties: ExamPropertiesResolver},
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'exampanel/:courseId',
    component: ExamPanelComponent
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'dragdrop',
    component: ExamDragDropComponent
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'match_item',
    component: ExamMatchItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
