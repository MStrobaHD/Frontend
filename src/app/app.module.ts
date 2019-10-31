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
//import { MatFileUploadModule } from 'angular-material-fileupload';

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
    FloatingButtonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MonacoEditorModule.forRoot(),
    //MatFileUploadModule,
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
  providers: [AlertifyService, ErrorInterceptorProvider, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
