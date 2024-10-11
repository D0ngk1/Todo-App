import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isSideOpen = new BehaviorSubject('');
  public sidebar = this.isSideOpen.asObservable();

  
  setSidebar(data:any){
    this.isSideOpen.next(data);
  }
  constructor() { }
}
