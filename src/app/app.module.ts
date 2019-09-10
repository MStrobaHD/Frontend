import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AuthModule } from "./containers/auth/auth.module";
import { LoginComponent } from "./containers/auth/login/login.component";
import { RegisterComponent } from "./containers/auth/register/register.component";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./routes";
import { SharedModule } from "./shared/modules/shared.module";
import { CommonModule } from "@angular/common";
import { LoadingIndicatorComponent } from "./shared/layout/loading-indicator/loading-indicator.component";
import { RoleMatcherDirective } from "./core/directives/role-matcher.directive";
import { HttpClientModule } from "@angular/common/http";
import { ErrorInterceptorProvider } from "./core/interceptors/error.interceptor";
import { AlertifyService } from "./core/services/shared/alertify/alertify.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoadingIndicatorComponent,
    RoleMatcherDirective
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,

    // Container modules
    AuthModule,
    // Shared modules
    SharedModule
  ],
  providers: [AlertifyService, ErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
