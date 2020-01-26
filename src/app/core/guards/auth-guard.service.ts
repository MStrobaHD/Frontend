import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/user/auth.service';
import { AlertifyService } from '../services/shared/alertify/alertify.service';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService,
              public router: Router,
              public alertifyService: AlertifyService) {}
  canActivate(): boolean {
    if (!this.auth.loggedIn()) {
      this.router.navigate(['login']);
      this.alertifyService.error('Musisz być zalogowany');

      return false;
    }
    return true;
  }
}
