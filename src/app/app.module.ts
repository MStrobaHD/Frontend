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
import { CodeEditorComponent } from './containers/judge/code-editor/code-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CodeEditorComponent
  ],
  imports: [

    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),

    // Container modules
    AuthModule,
    // Shared modules
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
