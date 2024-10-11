import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegister } from '../model/User';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './../login/login.component.css'
})
export class RegisterComponent {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient,private router: Router){

  }
  users : UserRegister = {} as UserRegister;
  loginObj: any={
    "username" : "",
    "password" : ""
  };
  onRegister(){
    this.http.post(this.apiUrl+'auth/register',this.loginObj).subscribe({
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
  
  onBack(){
    this.router.navigate(['/authentication/login']);
  }
}

