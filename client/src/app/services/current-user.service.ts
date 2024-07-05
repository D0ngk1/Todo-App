import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserServiceService {
  private currentUsers = new BehaviorSubject< LoginResponse | null | undefined >(undefined);
  constructor(private http: HttpClient,private router: Router) { }


  setCurrentUser(loginObj:any){
    sessionStorage.clear();
    this.http.post('http://localhost:8080/auth/login',loginObj).subscribe({
      next:(response) => {
        const loginResponse = response as LoginResponse;
        this.currentUsers.next(loginResponse);
        sessionStorage.setItem('users',loginResponse.user.username);
        sessionStorage.setItem('userId',loginResponse.user.userId);
        sessionStorage.setItem('loginToken',loginResponse.jwt);
        this.router.navigateByUrl('/task');
      },error:(err) => {
        alert("Login error");
      }
    });
    
  }

  getCurrentUser(){
    return this.currentUsers.asObservable();
  }
  logout() {
    // Clear session storage
    sessionStorage.removeItem('users');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('loginToken');

    // Clear current user
    this.currentUsers.next(null);

    // Navigate to login page
    this.router.navigateByUrl('/login');
  }
}
