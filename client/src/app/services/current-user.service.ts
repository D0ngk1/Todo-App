import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse, UserRegister } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserServiceService {
  private currentUsers = new BehaviorSubject<UserRegister | null | undefined>(undefined);
  
  constructor(private http: HttpClient, private router: Router) { }
  
  public firstLogin = true;

  setCurrentUser(loginObj: any) {
    sessionStorage.clear();
    this.http.post('https://todo-app-production-598c.up.railway.app/auth/login', loginObj).subscribe({
      next: (response) => {
        const loginResponse = response as LoginResponse;
        this.currentUsers.next(loginResponse.user);
        sessionStorage.setItem('users', loginResponse.user.username);
        sessionStorage.setItem('userId', loginResponse.user.userId);
        sessionStorage.setItem('loginToken', loginResponse.jwt);
        this.firstLogin = true;
        this.router.navigateByUrl('/task');
      },
      error: (err) => {
        alert("Login error");
      }
    });
  }

  setUser(user: UserRegister) {
    this.currentUsers.next(user);
  }
  
  getValueUser() {
    return this.currentUsers.value;
  }
  
  getCurrentUser() {
    return this.currentUsers.asObservable();
  }
  
  /*updateUsername(username: string) {
    const user = this.currentUsers.value;
    if (user && user.user.username !== username) {
      user.user.username = username;
      this.setUser(user);
      //sessionStorage.setItem('users', JSON.stringify(user));
    }
  }*/

  logout() {
    sessionStorage.removeItem('users');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('loginToken');
    this.currentUsers.next(null);
    this.router.navigateByUrl('/login');
  }
}