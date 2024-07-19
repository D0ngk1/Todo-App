import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { distinctUntilChanged, filter, Subscription } from 'rxjs';
import { TaskService } from '../services/task.service';
import { TaskLists } from '../services/TasksLists';
import { TopNavService } from '../services/top-nav.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  data: TaskLists[] = [];
  routerSubscription: Subscription;
  outputSearch: string = "";
  constructor(
    public taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private topNav: TopNavService
  ) {
    /*this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getContentsByTitle();
      });*/
  }
  ngOnInit(): void {
    this.topNav.searchInputMessage.pipe(distinctUntilChanged()).subscribe(m => {
      this.outputSearch = m;
      this.getContentsByTitle();
    })
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
        this.router.navigate(['/create/' + this.taskService.type]);
      },
      error: (err) => {
        console.log('Error fetching data by type', err);
      }
    });
  }

  getContentsByTitle(): void {
    let uidd = sessionStorage.getItem('userId');
    const uid:number =  +uidd;
    this.taskService.getAllTaskListsByUserAndTitle(uid,this.outputSearch).subscribe({
      next: (response) => {
        this.data = response;
      },
      error: (err) => {
        console.error('Error fetching data by type', err);
      }
    });
  }
}
