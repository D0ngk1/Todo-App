import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegister } from '../model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private http: HttpClient,private router: Router){

  }
  users : UserRegister = {} as UserRegister;
  loginObj: any={
    "username" : "",
    "password" : ""
  };
  onRegister(){
    this.http.post('https://todo-app-production-598c.up.railway.app/auth/register',this.loginObj).subscribe({
      next:(response) => {
        this.users = response as UserRegister;;
        console.log(this.users.userId);
        console.log(this.users.username);
        this.router.navigateByUrl('/login');
      },error:(err) => {
        alert("Registration error");
      }
    });
  }
}

