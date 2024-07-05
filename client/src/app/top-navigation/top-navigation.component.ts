import { Component } from '@angular/core';
import { CurrentUserServiceService } from '../services/current-user.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.css'
})
export class TopNavigationComponent {
  constructor(public currentUserService: CurrentUserServiceService){

  }
  logout(){
    this.currentUserService.logout();
  }
}
