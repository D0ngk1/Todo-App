import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TaskComponent } from './task/task.component';
import { CreateFormComponent } from './modals/create-form/create-form.component';
import { Routes,RouterModule } from '@angular/router';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path: '',redirectTo:'task',pathMatch:'full'},
  { path: 'task', component: TaskComponent },
  {path: 'create/TASK',redirectTo:'task',pathMatch:'full'},
  {path: 'create/LIST',redirectTo:'list',pathMatch:'full'},
  { path: 'list', component: ListComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TaskComponent,
    ListComponent,
    CreateFormComponent,
    TodoDetailsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
