import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegisterModel } from '../../models/auth/register.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from '../../models/auth/login.model';
import { UserModel } from '../../models/user/user.model';
import { CloudAssetModel } from '../../models/user/cloud-asset.model';
import { UserListModel } from '../../models/user/userlist.model';
import { BadgeModel, BadgeAddModel } from '../../models/user/badge.model';

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
          localStorage.setItem('login',this.decodedToken.unique_name); 
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
  getUsers() {
    return this.http.get<UserListModel[]>(this.baseUrlNoAuth + 'user/');
  }
  getUserAddedMaterials(userId: number) {
    return this.http.get<CloudAssetModel[]>(this.baseUrlNoAuth + 'standarduser/addedbyuser/' + userId);
  }
  updateUserData(userId: number, user: any){
    return this.http.put(this.baseUrlNoAuth + 'standardUser/' + userId, user);
  }
  updateUserRole(user: UserModel){
    return this.http.put(this.baseUrlNoAuth + 'standardUser/role/', user);
  }
  updateUserGroupRole(user: UserModel[]){
    return this.http.put(this.baseUrlNoAuth + 'standardUser/grouprole/', user);
  }
  addBadge(badge: BadgeAddModel) {
    return this.http.post<BadgeAddModel[]>(this.baseUrlNoAuth + 'user/addBadge/', badge);
  }
  deleteBadge(badgeId: number){
    return this.http.delete(this.baseUrlNoAuth + 'user/deleteBadge/' + badgeId);
  }
  getAllBadges() {
    return this.http.get<BadgeModel[]>(this.baseUrlNoAuth + 'user/allBadges/');
  }
  getUserBadges(userId: number) {
    return this.http.get<BadgeModel[]>(this.baseUrlNoAuth + 'user/userBadges/' + userId);
  }
}