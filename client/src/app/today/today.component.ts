import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { TaskService } from '../services/task.service';
import { TaskLists } from '../services/TasksLists';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrl: './today.component.css'
})
export class TodayComponent implements OnDestroy{
  routerSubscription: Subscription;
  data: TaskLists[] = [];
  constructor(
    public taskService: TaskService,
    private router: Router
  ){
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getContentsByUser();
      });
  }
  


  getContentsByUser():void{
    let uidd = sessionStorage.getItem('userId');
    const uid =  +uidd;
    this.taskService.getAllTaskListsByUserAndDueDate(uid).subscribe({
      next:(response) => {
        this.data = response;

      },
      error: (err) => {
        console.error('Error fetching data by type', err);
      }
    })
  }
  delete(id: number):void{
    this.taskService.deleteById(id).subscribe({
      next: (response) => {
        this.router.navigate(['/create/' + this.taskService.type]);
      },
      error: (err) => {
        console.log('Error fetching data by type', err);
      }
    });
  }
  viewNotes(id: number):void{
    this.taskService.showDetails = true;
    this.taskService.noteId = id;
  }
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
