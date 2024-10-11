import { Component, OnDestroy } from '@angular/core';
import { TaskService } from '../services/task.service';
import { TaskLists, TaskListsDTO } from '../services/TasksLists';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrl: './../task/task.component.css'
})
export class ImportantComponent implements OnDestroy{
  routerSubscription: Subscription;
  dataDTO: TaskListsDTO[] = [];
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
    this.taskService.getAllTaskListsByUser(uid).subscribe({
      next:(response) => {
        this.dataDTO = response;

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
         this.router.navigate(['/create/IMPORTANT']);
       },error:(err) => {
             console.error('Error fetching data by type', err);
           }
     });
   }
}