import { Component } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  isSidebarOpen = 'true';
  constructor(public sidebarService: SidebarService){
    this.sidebarService.sidebar.pipe(distinctUntilChanged()).subscribe(m => {
      this.isSidebarOpen = m;
    })
  }
  
}