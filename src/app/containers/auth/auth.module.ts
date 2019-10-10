import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';


// dsad
@NgModule({
  declarations: [ ],
  imports: [
    MaterialModule,
    FormsModule
  ]
})
export class AuthModule { }
