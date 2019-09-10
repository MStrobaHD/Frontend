import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course/course.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CoursePanelComponent } from './course-panel/course-panel.component';
import { LessonListComponent } from './course-panel/lesson-list/lesson-list.component';
import { VideoContentComponent } from './course-panel/video-content/video-content.component';
import { DocumentContentComponent } from './course-panel/document-content/document-content.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CourseListResolver } from 'src/app/core/resolvers/education/course/course.resolver';
import { CourseService } from 'src/app/core/services/education/course-service/course.service';
import { LessonComponent } from './course-panel/lesson/lesson.component';
import { LessonAddComponent } from './course-panel/lesson-add/lesson-add.component';
import { CourseEditionPanelComponent } from './course-panel/course-edition-panel/course-edition-panel.component';
import { LessonEditComponent } from './course-panel/course-edition-panel/lesson-edit/lesson-edit.component';
import { ExamEditComponent } from './course-panel/course-edition-panel/exam-edit/exam-edit.component';
import { UploadComponent } from './course-panel/course-edition-panel/upload/upload.component';

@NgModule({
  declarations: [
    CourseComponent,
    CoursePanelComponent,
    LessonListComponent,
    VideoContentComponent,
    DocumentContentComponent,
    LessonComponent,
    LessonAddComponent,
    CourseEditionPanelComponent,
    LessonEditComponent,
    ExamEditComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [CourseListResolver, CourseService,]
})
export class CourseModule {}
