import { Component } from '@angular/core';

@Component({
  selector: 'app-root', //target HTML TAGS, ex. index.html <app-root></app-root>
  templateUrl: './app.component.html', //target HTML files that represents the view for this component
  styleUrl: './app.component.css' //target CSS files for this component
})
export class AppComponent {
  title = 'todo-app';

}
