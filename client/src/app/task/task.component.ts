import { Component, OnInit, OnDestroy, numberAttribute } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TaskLists } from '../services/TasksLists';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnDestroy {
  data: TaskLists[] = [];
  routerSubscription: Subscription;

  constructor(
    public taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getContentsByType();
      });
  }
  /*
  ngOnInit(): void {
    this.getContentsByType();
  }*/

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  viewNotes(id: number) {
    this.taskService.showDetails = true;
    this.taskService.noteId = id;
  }

  delete(id: number) {
    this.taskService.deleteById(id).subscribe({
      next: (response) => {
        this.router.navigate(['/create/' + this.taskService.type]);
      },
      error: (err) => {
        console.log('Error fetching data by type', err);
      }
    });
  }

  getContentsByType(): void {
    this.taskService.type = "TASK";
    let uidd = sessionStorage.getItem('userId');
    const uid:number =  +uidd;
    this.taskService.displayByType2(this.taskService.type,uid).subscribe({
      next: (response) => {
        this.data = response;
      },
      error: (err) => {
        console.error('Error fetching data by type', err);
      }
    });
  }
}
