import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupRoutingModule } from './gruop-routing.module';
import { GroupPanelComponent } from './group-panel/group-panel.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AssignedCourseComponent } from './group-panel/assigned-course/assigned-course.component';
import { AssignedTaskComponent } from './group-panel/assigned-task/assigned-task.component';
import { CompletedCourseComponent } from './group-panel/completed-course/completed-course.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MyGroupsComponent } from './group-panel/my-groups/my-groups.component';
import { TeacherPanelComponent } from './group-panel/teacher-panel/teacher-panel.component';
import { GroupSolutionListComponent } from './group-panel/teacher-panel/group-solution-list/group-solution-list.component';
import { GroupService } from 'src/app/core/services/education/group-service/group.service';
import { ComparatorDialogComponent } from './group-panel/teacher-panel/comparator-dialog/comparator.dialog';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { SolutionViewerDialogComponent } from './group-panel/teacher-panel/solution-viewer-dialog/solution-viewer.dialog';



@NgModule({
  declarations: [
  GroupPanelComponent,
  AssignedCourseComponent,
  AssignedTaskComponent,
  CompletedCourseComponent,
  MyGroupsComponent,
  TeacherPanelComponent,
  GroupSolutionListComponent,
  SolutionViewerDialogComponent,
  ComparatorDialogComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbRatingModule,
    MonacoEditorModule,
  ],

  entryComponents: [ComparatorDialogComponent, SolutionViewerDialogComponent],
  providers: [GroupService]
})
export class GroupModule {}
