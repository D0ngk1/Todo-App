import { Component,OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TaskLists } from '../services/TasksLists';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
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
  /*
  ngOnInit(): void {
    // Get the 'type' query parameter if it exists
    this.route.queryParams.subscribe(params => {
      const type = params['type'];
      if (type) {
        this.taskService.setType(type);
        console.log(this.taskService.type);
      }
      // Fetch and display tasks based on the type
      this.taskService.displayByType2(type || 'TASK').subscribe(response => {
        // Handle the response
        this.data =response;
      });
    });
  }*/
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
    this.taskService.type="LIST";
    this.taskService.displayByType2(this.taskService.type).subscribe({
      next:(response) => {
        this.data = response;
      },error:(err) => {
        console.error('Error fetching data by type', err);
      }
    });
  }
}
