import { Component,OnDestroy,OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskLists } from './../../services/TasksLists';
import { Router } from '@angular/router';
import { ITask } from '../../model/Tasks';
import { CurrentUserServiceService } from '../../services/current-user.service';
import { map, take } from 'rxjs';
import { CreateTaskLists } from '../../model/User';
@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent implements OnInit{
  task: ITask[]=[];
  description="";
  type:string=this.taskService.type;
  title="";
  isImportant = false;
  dueDate = "";
  uid = sessionStorage.getItem('uid');
  now = new Date();
    formattedDate = this.now.getFullYear() + '-' +
    String(this.now.getMonth() + 1).padStart(2, '0') + '-' +
    String(this.now.getDate()).padStart(2, '0') + '' + 'T'+
    String(this.now.getHours()).padStart(2, '0') + ':' +
    String(this.now.getMinutes()).padStart(2, '0');
    //String(this.now.getMilliseconds()).padStart(3, '0') + '000';
  
    
  //Constructor
  constructor(
    public taskService: TaskService,
    private router: Router,
    private currentServiceUser: CurrentUserServiceService
    ){}
  /*ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
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
    this.currentServiceUser.getCurrentUser().pipe(
      take(1),
      map((currentUser) => {
        if (!currentUser) {
          alert('No user found');
          return;
        }
        let userId = currentUser.user.userId;
        let addItem: CreateTaskLists = {
          user: currentUser.user,
          id: 0,
          title: this.title,
          type: this.type,
          description: this.description,
          dateCreated: this.formattedDate,
          done: false,
          important:this.isImportant,
          dueDate:this.dueDate
        };
        this.taskService.createTaskList(addItem).subscribe({
          next: (response) => {
            this.taskService.showDialog = false;
            this.router.navigate(['/create/' + this.type]);
          },
          error: (err) => {
            console.error('Error creating task', err);
          }
        });
      })
    ).subscribe();
  }
  cancel() {
    this.taskService.showDialog=false;
  }

  ngOnInit(): void {
    //this.item = this.taskService.read();
  }
}