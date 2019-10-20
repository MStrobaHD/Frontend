
import { Routes } from '@angular/router';
import { LoginComponent } from './containers/auth/login/login.component';
import { RegisterComponent } from './containers/auth/register/register.component';




export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {
    path: 'home',
    loadChildren: () => import('./containers/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./containers/course/course.module').then(mod => mod.CourseModule)
  },
  {
    path: 'algorithms',
    loadChildren: () => import('./containers/judge/judge.module').then(mod => mod.JudgeModule)
  },

];
