import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserServiceService } from '../services/current-user.service';
import { environment } from '../../environments/environment';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  user: string | null = null;
  @Output() messageEvent = new EventEmitter <string>();
  constructor(
    private router: Router,
    private userService: CurrentUserServiceService,
    private sidebarService: SidebarService
  ) 
  {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user ? user.username : null;
      //console.log(user);
    });
  }
  isSidebarOpen = false;
  assetPath = environment.assetPath;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarService.setSidebar(this.isSidebarOpen);
  }
}
