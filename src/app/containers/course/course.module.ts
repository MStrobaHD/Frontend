import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course/course.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CoursePanelComponent } from './course-panel/course-panel.component';
import { VideoContentComponent } from './course-panel/video-content/video-content.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CourseListResolver } from 'src/app/core/resolvers/education/course/course.resolver';
import { CourseService } from 'src/app/core/services/education/course-service/course.service';
import { CardService } from 'src/app/core/services/education/card-service/card.service';
import { LessonComponent } from './course-panel/lesson/lesson.component';
import { CourseEditionPanelComponent } from './course-panel/course-edition-panel/course-edition-panel.component';
import { LessonEditComponent } from './course-panel/course-edition-panel/lesson-edit/lesson-edit.component';
import { ExamEditComponent } from './course-panel/course-edition-panel/exam-edit/exam-edit.component';
import { UploadComponent } from './course-panel/course-edition-panel/upload/upload.component';
import { ExamComponent } from './exam-panel/exam/exam.component';
import { ExamDragDropComponent } from './exam-panel/exam-drag-drop/exam-drag-drop.component';
// import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddServerAssetComponent } from './course-panel/course-edition-panel/add-server-asset/add-server-asset.component';
import { LessonService } from 'src/app/core/services/education/lesson-service/lesson.service';
import { ServerAssetComponent } from './course-panel/course-edition-panel/server-asset/server-asset.component';
import { UploadModule } from '../upload/upload.module';
import { ExamPanelComponent } from './exam-panel/exam-panel.component';
import { ExamResolver } from 'src/app/core/resolvers/education/course/exam.resolver';
import { QuestionService } from 'src/app/core/services/education/question-service/question.service';

import { CountdownModule } from 'ngx-countdown';
import { CourseEnlistedComponent } from './course/course-enlisted/course-enlisted.component';
import { CourseRecommendedComponent } from './course/course-recommended/course-recommended.component';
import { CourseCreatedComponent } from './course/course-created/course-created.component';
import { CourseEnroledListResolver } from 'src/app/core/resolvers/education/course/course-enroled.resolver';
import { ExamWriteAnswerComponent } from './exam-panel/exam-write-answer/exam-write-answer.component';
import { ExamMatchItemComponent } from './exam-panel/exam-match-item/exam-match-item.component';
import { ExamPropertiesResolver } from 'src/app/core/resolvers/education/exam/exam-properties.resolver';
import { LessonPanelResolver } from 'src/app/core/resolvers/education/lesson/lesson-panel.resolver';
import { EducationMaterialComponent } from './education-material/education-material.component';
import { UserAddedComponent } from './education-material/user-added/user-added.component';
import { FlashcardPanelComponent } from './flashcard-panel/flashcard-panel.component';
import { FlashcardStudyingComponent } from './flashcard-panel/flashcard-studying/flashcard-studying.component';
import { FlashcardService } from 'src/app/core/services/education/flashcard-service/flashcard.service';
import { FlashcardSetResolver, FlashcardListSetResolver } from 'src/app/core/resolvers/education/flashcard/flashcard.resolver';
import { FlashcardListResolver } from 'src/app/core/resolvers/education/flashcard/flascard-list.resolver';
import { FlashcardAddComponent } from './flashcard-panel/flashcard-add/flashcard-add.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropResolver } from 'src/app/core/resolvers/education/exam/dragdrop-exam.resolver';
import { PreventUnfinishedExam } from 'src/app/core/guards/prevent-unfinished-exam.guard';
import { PreventDialogComponent } from './exam-panel/exam/prevent-dialog/prevent-dialog';
// import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
// import { MatFileUploadModule } from 'angular-material-fileupload';
import {VgCoreModule} from 'videogular2/compiled/core';
import {VgControlsModule} from 'videogular2/compiled/controls';
import {VgOverlayPlayModule} from 'videogular2/compiled/overlay-play';
import {VgBufferingModule} from 'videogular2/compiled/buffering';
import { LoadingIndicatorComponent } from 'src/app/shared/layout/loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [
    CourseComponent,
    CoursePanelComponent,
    VideoContentComponent,
    LessonComponent,
    CourseEditionPanelComponent,
    LessonEditComponent,
    ExamEditComponent,
    UploadComponent,
    ExamComponent,
    ExamDragDropComponent,
    AddServerAssetComponent,
    ServerAssetComponent,
    ExamPanelComponent,
    CourseEnlistedComponent,
    CourseRecommendedComponent,
    CourseCreatedComponent,
    ExamWriteAnswerComponent,
    ExamMatchItemComponent,
    EducationMaterialComponent,
    UserAddedComponent,
    FlashcardPanelComponent,
    FlashcardStudyingComponent,
    FlashcardAddComponent,
    PreventDialogComponent,
    LoadingIndicatorComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    UploadModule,
    CountdownModule,
    DragDropModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  entryComponents: [PreventDialogComponent],
  providers: [
    CourseListResolver,
    CourseEnroledListResolver,
    ExamPropertiesResolver,
    ExamResolver,
    QuestionService,
    CourseService,
    CardService,
    LessonService,
    LessonPanelResolver,
    FlashcardService,
    FlashcardSetResolver,
    FlashcardListResolver,
    FlashcardListSetResolver,
    DragDropResolver,
    PreventUnfinishedExam
  ]
})
export class CourseModule {}
