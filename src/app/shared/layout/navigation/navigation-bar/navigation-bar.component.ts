import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  
  @Output() sidenavToggle = new EventEmitter<void>();
  constructor(private router: Router,
              private alertifyService: AlertifyService,
              private authService: AuthService) { }

  ngOnInit() {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
    console.log('in sidenav');
  }
  logout() {
    localStorage.removeItem('token');
    this.alertifyService.message('Zostałeś wylogowany');
    this.router.navigate(['/login']);
  }
  isLogged(){
    if(this.authService.loggedIn()){
      return true;
    } else {
      return false;
    }
  }
}
