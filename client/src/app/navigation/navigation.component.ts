import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { CurrentUserServiceService } from '../services/current-user.service';

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
    private userService: CurrentUserServiceService
  ) 
  {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user ? user.username : null;
      //console.log(user);
    });
  }
}
