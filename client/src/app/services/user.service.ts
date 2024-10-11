import { EventEmitter, Injectable } from '@angular/core';
import { LoginResponse, UserRegister } from '../model/User';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CurrentUserServiceService } from './current-user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl + "users/";
  messageEvent: EventEmitter<string>;

  constructor(public http:HttpClient, public router:Router,public currentUser: CurrentUserServiceService) { }


  delete(id:number){
    return this.http.delete(`${this.apiUrl}delete/${id}`).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.log('Error fetching data by type', err);
      }
    });
  }
  save(username: string) {
    let user = this.currentUser.getValueUser();
    user.username = username;
    //console.log(user);
    return this.http.put(`${this.apiUrl}edit/${user.userId}`, user).subscribe({
      next: (response) => {
        const updatedUser = response as UserRegister;
        this.currentUser.setUser(updatedUser);
      },
      error: (err) => {
        alert("Login error");
      }
    });
  }


    /*
    this.currentUser.getCurrentUser().pipe(
      map(currentUser => {
        if (!currentUser) {
          throw new Error('No user found');
        }
        currentUser.user.username = username;
        user = currentUser;
        return currentUser.user;
      }),
      switchMap(updatedUser => {
        
      })
    ).subscribe({
      next: response => {
        console.log('User updated successfully', response);
        this.currentUser.setCurrentUser(user); // Ensure this line updates the user
      },
      error: error => {
        console.error('Error updating user', error);
        alert('Failed to update user');
      },
      complete: () => {
        console.log('Update operation completed');
      }
    });*/
}
