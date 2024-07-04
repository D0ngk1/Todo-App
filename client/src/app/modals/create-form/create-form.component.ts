import { Component,OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskLists } from './../../services/TasksLists';
import { Router } from '@angular/router';
import { ITask } from '../../model/Tasks';
@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent implements OnInit{

  item: TaskLists[]=[];
  task: ITask[]=[];
  description="";
  type:string=this.taskService.type;
  user="";
  title="";
  //id :number;
  now = new Date();
    formattedDate = this.now.getFullYear() + '-' +
    String(this.now.getMonth() + 1).padStart(2, '0') + '-' +
    String(this.now.getDate()).padStart(2, '0') + '' +'T'+
    String(this.now.getHours()).padStart(2, '0') + ':' +
    String(this.now.getMinutes()).padStart(2, '0') + ':' +
    String(this.now.getSeconds()).padStart(2, '0') + '.' +
    String(this.now.getMilliseconds()).padStart(3, '0') + '000';
  

  //Constructor
  constructor(
    public taskService: TaskService,
    private router: Router
    ){}
  /****************** AddTask Without DB ********************
  add(){
    /*
    let addItem =new TaskLists(this.item.length+1,this.title, this.type, this.description, this.now);
    this.taskService.addTask(addItem);
    this.taskService.showDialog=false;
    this.router.navigate(['/'+this.type]);
  }*/

  //Create Task in DB
  add(){
    let addItem =new TaskLists(1,this.title, this.type, this.description, this.formattedDate);
    this.taskService.createTaskList(addItem).subscribe({
      next:(response)=>{
        this.taskService.showDialog=false;
        this.router.navigate(['/create/'+this.type]);
      }
    })
  }

  cancel() {
    this.taskService.showDialog=false;
  }

  ngOnInit(): void {
    //this.item = this.taskService.read();
  }
}
