import { Component, ElementRef, HostListener } from '@angular/core';
import { CurrentUserServiceService } from '../services/current-user.service';

@Component({
  selector: 'app-dropdown-profile-menu',
  templateUrl: './dropdown-profile-menu.component.html',
  styleUrl: './dropdown-profile-menu.component.css'
})
export class DropdownProfileMenuComponent {
  isDropdownOpen = false;
  constructor(private eRef: ElementRef,
    private currentUserService: CurrentUserServiceService
  ) {}
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  @HostListener('document:click', ['$event'])
  DocumentClick(event: MouseEvent) {
    if (this.isDropdownOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
  logout(){
    this.currentUserService.logout();
  }
}
