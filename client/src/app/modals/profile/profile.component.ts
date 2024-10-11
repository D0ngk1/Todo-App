import { Component } from '@angular/core';
import { TopNavService } from '../../services/top-nav.service';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(public topNav: TopNavService,public userService: UserService){}
  assetPath = environment.assetPath;
  username = sessionStorage.getItem("users");
  password = "";
  save(){
    console.log(this.username);
    this.userService.save(this.username);
  }
  delete():void {
    let uidd = sessionStorage.getItem('userId');
    const uid:number =  +uidd;
    this.userService.delete(uid);
  }
}
