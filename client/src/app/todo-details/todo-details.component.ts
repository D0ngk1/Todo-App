import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { TaskLists, TaskListsDTO } from '../services/TasksLists';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css'
})
export class TodoDetailsComponent {
  selectedDataDTO: TaskListsDTO[] = [];
  title="";
  description= "";
  id :number;
  isDone = false;
  isImportant = false;
  dateCreated= "";
  dueDate ="";


  constructor(
    public ts: TaskService,public router: Router
  ){
    // this.selectedData = this.ts.viewNotes(ts.noteId);
  }
  save(){
    let item: TaskLists = {
      id: this.id,
      title: this.title,
      type: this.ts.type,
      description: this.description,
      dateCreated: this.dateCreated,
      done: this.isDone,
      important: this.isImportant,
      dueDate: this.dueDate
    };    
    this.ts.updateById(this.ts.noteId,item).subscribe({
      next:(response)=> {
        let current = this.router.url;
        this.ts.showDetails=false;
        this.router.navigateByUrl(current);
      },error:(err) => {
            console.error('Error fetching data by type', err);
          }
    });
  }
  ngOnInit(): void{
        //Get id
        this.ts.getById(this.ts.noteId).subscribe({
          next:(response)=>{
            this.selectedDataDTO = response;
            if (this.selectedDataDTO) {
              
              this.title = this.selectedDataDTO[0].title;
              this.dateCreated = this.selectedDataDTO[0].dateCreated;
              this.description = this.selectedDataDTO[0].description;
              this.id = this.selectedDataDTO[0].id;
              this.isDone = this.selectedDataDTO[0].isDone;
              this.isImportant = this.selectedDataDTO[0].isImportant;
              this.dueDate = this.selectedDataDTO[0].dueDate;
            }
            console.log("This is done : "+ this.isDone);
            
          },error:(err) => {
            console.error('Error fetching data by type', err);
          }
        });

  }
}

