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


@NgModule({
  declarations: [CourseComponent, CoursePanelComponent, LessonListComponent, VideoContentComponent, DocumentContentComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class CourseModule { }
