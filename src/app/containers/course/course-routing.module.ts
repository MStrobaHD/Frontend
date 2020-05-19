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
import { EducationMaterialComponent } from './education-material/education-material.component';
import { FlashcardStudyingComponent } from './flashcard-panel/flashcard-studying/flashcard-studying.component';
import { FlashcardPanelComponent } from './flashcard-panel/flashcard-panel.component';
import { FlashcardSetResolver, FlashcardListSetResolver } from 'src/app/core/resolvers/education/flashcard/flashcard.resolver';
import { FlashcardListResolver } from 'src/app/core/resolvers/education/flashcard/flascard-list.resolver';
import { FlashcardAddComponent } from './flashcard-panel/flashcard-add/flashcard-add.component';
import { DragDropResolver } from 'src/app/core/resolvers/education/exam/dragdrop-exam.resolver';
import { PreventUnfinishedExam } from 'src/app/core/guards/prevent-unfinished-exam.guard';


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
    path: 'dragdrop/:id',
    component: ExamDragDropComponent,
    resolve: {exam: DragDropResolver,
      examProperties: ExamPropertiesResolver}
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'match_item',
    component: ExamMatchItemComponent
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'education-material',
    component: EducationMaterialComponent
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'card-add/:cardId',
    component: FlashcardAddComponent,
    resolve: {cards: FlashcardListSetResolver}
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'test_router/:kartId',
    component: FlashcardStudyingComponent,
    resolve: {cards: FlashcardListResolver}
  },
  {
    runGuardsAndResolvers: 'always',
    path: 'flashcard-panel/:courseId',
    component: FlashcardPanelComponent,
    resolve: {sets: FlashcardSetResolver
              }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
