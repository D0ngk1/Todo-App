import { Component,OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {  TaskLists } from '../services/TasksLists';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
  //item: TaskLists[]=[];
  data: TaskLists[]=[];
  constructor(
    public taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    ){
      this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Reload component data when navigation ends
        this.getContentsByType();
      });
    }
  
  viewNotes(id:number){
    this.taskService.showDetails=true;
    this.taskService.noteId=id;
  }

  delete(id:number){
    this.taskService.deleteById(id).subscribe({
      next: (response) => {
        this.router.navigate(['/create/'+this.taskService.type]);
      },error:(err) =>{
        console.log('Error fetching data by type', err);
      }
    })
  }
  ngOnInit(): void { 
    this.getContentsByType();
  }
  
  getContentsByType(): void{
    this.taskService.type="TASK";
    this.taskService.displayByType2(this.taskService.type).subscribe({
      next:(response) => {
        this.data = response;
      },error:(err) => {
        console.error('Error fetching data by type', err);
      }
    });
  }
}
