import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

import {environment} from '../../environments/environment';
import {User} from '../models/user.model';

const BACKEND_URL = environment.apiUrl + '/users/';

@Injectable({providedIn: 'root'})
export class AuthService{
  private isAuthenticated = false;
  private token;
  private tokenTime;
  private username;
  private authStatusListener = new Subject<boolean>();
  private errormessage: string;
  constructor(private http: HttpClient, private router: Router){

  }
  getToken(){
    return this.token;
  }


  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getTokenTime() {
    return this.tokenTime;
  }

  getUserId() {
    return this.username;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(username: string, password: string) {
    const authData: User = {username, password};
    this.http.post(BACKEND_URL + 'register', authData).subscribe(
      () => {
        this.router.navigate(['/search']);
        console.log('success');
      },
      () => {
        this.authStatusListener.next(false);
        console.log('error');
      }
    );
  }

  login(username: string, password: string) {
    const authData: User = {username, password};
    // console.log(username, password, 'Basic ' + btoa(username + ':' + password), btoa(username + ':' + password));
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
    this.http.get<{token: string, username: string}>(BACKEND_URL + 'login',  {headers}).subscribe(
      response => {
        const token = response.token;
        this.token = token;
        this.username = response.username;
        // console.log(token);
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.saveAuthData(token, username);
          this.router.navigate(['/search']);
        }
      },
      () => {
        this.authStatusListener.next(false);
        console.log('failed login');
      }
    );
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.username = null;
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private saveAuthData(token: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', token);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}
