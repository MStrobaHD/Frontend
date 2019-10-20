import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/user/auth.service';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginModel } from 'src/app/core/models/auth/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();

  loginForm: FormGroup;
  loginModel: LoginModel;

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password:  ['', Validators.required],
        role: ['student', Validators.required]
      });
  }
  login() {
    if (this.loginForm.valid) {
      this.loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(this.loginModel).subscribe(
        () => {
          this.alertify.success('Zostałeś zalogowany');
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          this.alertify.error('Logowanie nieudane');
        }
      );
    }
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
}
