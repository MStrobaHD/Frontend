import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';
  // jwtHelper = new JwtHelperService();
  decodedToken: any;
  decodedId: number;
  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('role', user.role);
          // this.decodedToken = this.jwtHelper.decodeToken(user.token);
          // this.decodedId = this.decodedToken.nameid;
          console.log(this.decodedToken);
        }
      })
    );
  }
  // register(user: User) {
  //   return this.http.post(this.baseUrl + 'register', user);
  // }

  loggedIn() {
    const token = localStorage.getItem('token');
    // return !this.jwtHelper.isTokenExpired(token);
  }
  isAdmin() {
    const role = localStorage.getItem('role');
    return role;
  }
}