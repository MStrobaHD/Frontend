import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AuthModule } from "./containers/auth/auth.module";
import { LoginComponent } from "./containers/auth/login/login.component";
import { RegisterComponent } from "./containers/auth/register/register.component";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { SharedModule } from './shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from './shared/layout/loading-indicator/loading-indicator.component';
import { RoleMatcherDirective } from './core/directives/role-matcher.directive';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider } from './core/interceptors/error.interceptor';
import { AlertifyService } from './core/services/shared/alertify/alertify.service';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { FloatingButtonComponent } from './shared/layout/floating-button/floating-button.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './core/services/user/auth.service';
import { UserComponent } from './containers/user/user/user.component';
import { InformationComponent } from './containers/user/user/information/information.component';
import { ResultComponent } from './containers/user/user/result/result.component';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { ExamResultComponent } from './containers/user/user/result/exam-result/exam-result.component';
import { AlgorithmResultComponent } from './containers/user/user/result/algorithm-result/algorithm-result.component';
import { PriviligesManagementComponent } from './containers/user/user/priviliges-management/priviliges-management.component';
import { AlgorithmResultDetailsComponent } from './containers/user/user/result/algorithm-result/algorithm-result-details/algorithm-result-details.component';
import { VerdictService } from './core/services/judge/verdict-service/verdict.service';
import { VerdictDetailsResolver } from './core/resolvers/judge/verdict-details/verdict-details.resolver';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoadingIndicatorComponent,
    RoleMatcherDirective,
    FloatingButtonComponent,
    UserComponent,
    InformationComponent,
    ResultComponent,
    ExamResultComponent,
    AlgorithmResultComponent,
    PriviligesManagementComponent,
    AlgorithmResultDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MonacoEditorModule.forRoot(),
    JwtModule.forRoot({
      config: {
        // tslint:disable-next-line:object-literal-shorthand
        tokenGetter: tokenGetter,
        whitelistedDomains: ['https://localhost:44345'],
        blacklistedRoutes: ['https://localhost:44345/api/auth']
      }
  }),
    // Container modules
    AuthModule,
    // Shared modules
    SharedModule
  ],
  providers: [AlertifyService,
     ErrorInterceptorProvider,
      AuthService,
       AuthGuardService,
      VerdictService,VerdictDetailsResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
