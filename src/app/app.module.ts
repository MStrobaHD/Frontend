import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthModule } from './containers/auth/auth.module';
import { LoginComponent } from './containers/auth/login/login.component';
import { RegisterComponent } from './containers/auth/register/register.component';
import { AppRoutingModule } from './app-routing.module';
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
import { BadgesComponent } from './containers/user/user/badges/badges.component';
import { AddBadgeComponent } from './containers/user/user/add-badge/add-badge.component';
import { ImagePreviewOverlayComponent } from './shared/layout/image-preview-overlay/image-preview-overlay.component';
import { TileMenuComponent } from './shared/layout/tile-menu/tile-menu.component';
import { ThemeService } from './core/services/shared/theme.service';
import { StatisticsComponent } from './containers/statistics/statistics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatisticsService } from './core/services/user/statistics/statistics.service';
import { MaterialModule } from './shared/modules/material.module';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RoleMatcherDirective,
    UserComponent,
    InformationComponent,
    ResultComponent,
    ExamResultComponent,
    AlgorithmResultComponent,
    PriviligesManagementComponent,
    AlgorithmResultDetailsComponent,
    BadgesComponent,
    AddBadgeComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgxChartsModule,
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
  providers: [
    AlertifyService,
    ErrorInterceptorProvider,
    AuthService,
    AuthGuardService,
    VerdictService,
    VerdictDetailsResolver,
    ThemeService,
    StatisticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
