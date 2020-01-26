import { Routes } from '@angular/router';
import { LoginComponent } from './containers/auth/login/login.component';
import { RegisterComponent } from './containers/auth/register/register.component';
import { UserComponent } from './containers/user/user/user.component';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { AlgorithmResultDetailsComponent } from './containers/user/user/result/algorithm-result/algorithm-result-details/algorithm-result-details.component';
import { VerdictDetailsResolver } from './core/resolvers/judge/verdict-details/verdict-details.resolver';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuardService] },
  {
    path: 'algorithm_result_details/:id',
    component: AlgorithmResultDetailsComponent,
    canActivate: [AuthGuardService],
    resolve: {verdict: VerdictDetailsResolver}
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./containers/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./containers/course/course.module').then(mod => mod.CourseModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'algorithms',
    loadChildren: () =>
      import('./containers/judge/judge.module').then(mod => mod.JudgeModule),
    canActivate: [AuthGuardService]
  }
];
