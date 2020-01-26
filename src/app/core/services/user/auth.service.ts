import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegisterModel } from '../../models/auth/register.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from '../../models/auth/login.model';
import { UserModel } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';
  baseUrlNoAuth = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  decodedId: number;

  constructor(private http: HttpClient) {}

  login(loginModel: LoginModel) {
    return this.http.post(this.baseUrl + 'login', loginModel).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          // localStorage.setItem('role', user.role);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          localStorage.setItem('userID', this.decodedToken.nameid);
          localStorage.setItem('role', this.decodedToken.role);
          // this.decodedId = this.decodedToken.nameid;
          console.log(this.decodedToken);
        }
      })
    );
  }
  register(registerModel: RegisterModel) {
     return this.http.post(this.baseUrl + 'register', registerModel);
   }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  isAdmin() {
    const role = localStorage.getItem('role');
    return role;
  }

  getUserData(userId: number) {
    return this.http.get<UserModel>(this.baseUrlNoAuth + 'user/' + userId);
  }
}