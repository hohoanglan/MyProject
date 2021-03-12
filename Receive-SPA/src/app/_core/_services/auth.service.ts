import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../_models/user-login';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  currentUser: User;
  decodedToken: any;
  constructor(private http: HttpClient) { }
    login(userlogin: UserLogin) {
      return this.http.post(this.baseUrl + 'auth/login/', userlogin).pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            // console.log(JSON.parse(localStorage.getItem('user')));
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.currentUser = user.user;
          }
        }),
      );
    }

    loggedIn() {
      const token = localStorage.getItem('token');
      return !this.jwtHelper.isTokenExpired(token);
    }
  }
