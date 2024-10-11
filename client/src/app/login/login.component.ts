import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserServiceService } from '../services/current-user.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
 
  loginObj: any={
    "username" : "",
    "password" : ""
  };
  /*loginAuto: any={
    "username" : "da",
    "password" : "123"
  };*/

  constructor(private http: HttpClient,private router: Router, private currentUserSer: CurrentUserServiceService){
    //this.currentUserSer.setCurrentUser(this.loginAuto);
  }
  /*ngOnInit(): void {

    //this.currentUserSer.setCurrentUser(this.loginAuto);
  }*/

  onLogin(){
    this.currentUserSer.setCurrentUser(this.loginObj);
  }
  register(){
    this.router.navigate(['/authentication/register']);
  }

}

