import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {}
  ngOnInit(): void {
  }
  isLogged() {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}