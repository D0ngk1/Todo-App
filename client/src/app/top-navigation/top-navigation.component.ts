import { Component, EventEmitter, Output } from '@angular/core';
import { CurrentUserServiceService } from '../services/current-user.service';
import { TopNavService } from '../services/top-nav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrl: './top-navigation.component.css'
})
export class TopNavigationComponent {
  constructor(public currentUserService: CurrentUserServiceService,
              public topNav: TopNavService,
              public router: Router
  ){}

  input : string ="";
  search(){
    if(this.router.url !== '/search'){
      this.topNav.setSearchInput(this.input);
      this.router.navigateByUrl('/search');
    }else{
      this.topNav.setSearchInput(this.input);
    }
  }
  logout(){
    this.currentUserService.logout();
  }
  profile(){
    this.topNav.showProfile=true;
  }
}
