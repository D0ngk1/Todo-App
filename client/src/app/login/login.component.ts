import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserServiceService } from '../services/current-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
 
  loginObj: any={
    "username" : "",
    "password" : ""
  };
  loginAuto: any={
    "username" : "daryl",
    "password" : "123"
  };

  constructor(private http: HttpClient,private router: Router, private currentUserSer: CurrentUserServiceService){

  }
  ngOnInit(): void {

    this.currentUserSer.setCurrentUser(this.loginAuto);
  }

  onLogin(){
    this.currentUserSer.setCurrentUser(this.loginObj);
  }
  register(){
    this.router.navigateByUrl('/register');
  }

}

