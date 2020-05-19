import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegisterModel } from 'src/app/core/models/auth/register.model';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerModel: RegisterModel;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: [''],
      email: ['']
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(this.registerModel).subscribe(
        () => {
          this.alertifyService.success('Konto zostało utworzone');
          this.router.navigate(['/login']);
        },
        error => {
          this.alertifyService.error('Nie udało utworzyć konta');
        }
      );
    }
  }
}
