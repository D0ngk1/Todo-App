import { Component, OnInit, OnDestroy, numberAttribute } from '@angular/core';
import { TaskService } from '../services/task.service';
import { NavigationEnd, Router } from '@angular/router';
import { TaskLists, TaskListsDTO } from '../services/TasksLists';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CurrentUserServiceService } from '../services/current-user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnDestroy,OnInit {
  dataDTO: TaskListsDTO[] = [];
  routerSubscription: Subscription;

  constructor(
    public taskService: TaskService,
    private router: Router,
    private currentUserService: CurrentUserServiceService
  ) {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        console.log('NavigationEnd event detected Task Component');
        this.getContentsByType();
      });
  }

  
  ngOnInit(): void {
    if (this.currentUserService.firstLogin){
      console.log('First login detected');
      this.getContentsByType();
      this.currentUserService.firstLogin = false;
    }
  }

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
        console.log('Delete successful', response);
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
    if (!uidd) {
      console.error('No userId found in sessionStorage');
      return;
    }
    const uid:number =  +uidd;
    this.taskService.displayByType2(this.taskService.type,uid).subscribe({
      next: (response) => {
        this.dataDTO = response;
      },
      error: (err) => {
        console.error('Error fetching data by type', err);
      }
    });
  }
  
  importantButton(itemDTO: TaskListsDTO) {
   itemDTO.isImportant = !itemDTO.isImportant;
    let item: TaskLists = {
      id: itemDTO.id,
      title: itemDTO.title,
      type: itemDTO.type,
      description: itemDTO.description,
      dateCreated: itemDTO.dateCreated,
      done: itemDTO.isDone,
      important: itemDTO.isImportant,
      dueDate: itemDTO.dueDate
    };
    this.updateItem(item);   
    console.log(itemDTO.isImportant);
  }

  doneButton(itemDTO:TaskListsDTO){
    itemDTO.isDone = !itemDTO.isDone;
    let item: TaskLists = {
      id: itemDTO.id,
      title: itemDTO.title,
      type: itemDTO.type,
      description: itemDTO.description,
      dateCreated: itemDTO.dateCreated,
      done: itemDTO.isDone,
      important: itemDTO.isImportant,
      dueDate:itemDTO.dueDate
    }; 
    this.updateItem(item);
  }
  updateItem(item:TaskLists ){
    console.log(item);
    this.taskService.updateById(item.id,item).subscribe({
      next:(response)=> {
        this.router.navigate(['/create/'+this.taskService.type]);
      },error:(err) => {
            console.error('Error fetching data by type', err);
          }
    });
  }

}
