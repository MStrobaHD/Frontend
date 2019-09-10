import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CoursePanelComponent } from './course-panel/course-panel.component';
import { CourseListResolver } from 'src/app/core/resolvers/education/course/course.resolver';
import { CourseEditionPanelComponent } from './course-panel/course-edition-panel/course-edition-panel.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
