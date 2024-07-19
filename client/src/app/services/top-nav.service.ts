import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopNavService {
  private searchInput = new BehaviorSubject('');
  public searchInputMessage = this.searchInput.asObservable();
  public showProfile = false;
  
  setSearchInput(data:any){
    this.searchInput.next(data);
  }

  //constructor() { }
}
