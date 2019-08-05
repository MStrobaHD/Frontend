
import { Routes } from '@angular/router';
import { TestComponent } from './shared/layout/test/test.component';
import { LoginComponent } from './containers/auth/login/login.component';
import { RegisterComponent } from './containers/auth/register/register.component';




export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: TestComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {
    path: 'landing-page',
    loadChildren: () => import('./containers/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./containers/course/course.module').then(mod => mod.CourseModule)
  },

];
