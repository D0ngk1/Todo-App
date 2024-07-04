import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { TaskLists } from '../services/TasksLists';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css'
})
export class TodoDetailsComponent {
  selectedData: TaskLists[] = [];
  title="";
  date = "";
  description= "";
  id = "";


  constructor(
    public ts: TaskService,public router: Router
  ){
    // this.selectedData = this.ts.viewNotes(ts.noteId);
  }
  save(){
    this.selectedData[0].title = this.title;
    this.selectedData[0].description  = this.description;
    this.ts.updateById(this.ts.noteId,this.selectedData[0]).subscribe({
      next:(response)=> {
        this.router.navigate(['/create/'+this.ts.type]);
        this.ts.showDetails=false;
      },error:(err) => {
            console.error('Error fetching data by type', err);
          }
    });
  }
  ngOnInit(): void{
        //Get id
        this.ts.getById(this.ts.noteId).subscribe({
          next:(response)=>{
            this.selectedData = response;
            if (this.selectedData) {
              this.title = this.selectedData[0].title;
              this.date = this.selectedData[0].dateCreated;
              this.description = this.selectedData[0].description;
              this.id = ""+this.selectedData[0].id;
            }
            
          },error:(err) => {
            console.error('Error fetching data by type', err);
          }
        });

  }
}
