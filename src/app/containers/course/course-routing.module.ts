import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CoursePanelComponent } from './course-panel/course-panel.component';


const routes: Routes = [
  {
    path: '',
    component: CourseComponent
  },
  {
    path: 'course_panel',
    component: CoursePanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
