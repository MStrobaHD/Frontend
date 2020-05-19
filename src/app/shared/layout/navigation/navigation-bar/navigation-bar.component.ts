import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/core/services/shared/theme.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  isDarkTheme: Observable<boolean>;
  username: string;
  @Output() sidenavToggle = new EventEmitter<void>();
  constructor(private router: Router,
              private alertifyService: AlertifyService,
              private authService: AuthService,
              private themeService: ThemeService) { }

              ngOnInit() {
                this.isDarkTheme = this.themeService.isDarkTheme;
                this.username = localStorage.getItem('login');
              }
            

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
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}
