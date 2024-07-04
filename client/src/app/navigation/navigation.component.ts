import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  user = "Daryl Guzman"
  constructor(
    private router: Router,
    private taskService: TaskService) 
  {}
  @Output() messageEvent = new EventEmitter <string> ();

  task() {
    this.taskService.type="TASK";
    this.router.navigate(['/task']);
  }
  list() {
    this.taskService.type="LIST";
    this.router.navigate(['/list']);
  }
}
