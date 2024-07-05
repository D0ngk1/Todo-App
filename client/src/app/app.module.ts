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
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { LogginIncterceptorService } from './services/loggin-interceptor.service';
import { authGuard } from './authguard/auth.guard';
import { RegisterComponent } from './register/register.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { MainComponent } from './main/main.component';
import { ImportantComponent } from './important/important.component';

const routes: Routes = [
  {path: 'login',component:LoginComponent},
  {path: '',redirectTo:'login',pathMatch:'full'},
  {path: 'register',component:RegisterComponent},
  {path: 'create/TASK',redirectTo:'task',pathMatch:'full'},
  {path: 'create/LIST',redirectTo:'list',pathMatch:'full'},
  {
    path: '',
    component: MainComponent,
    canActivate:[authGuard],
    children: [
      { path: 'list', component: ListComponent },
      { path: 'task', component: TaskComponent },
      { path: 'important', component: ImportantComponent }
    ]
  }
];



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TaskComponent,
    ListComponent,
    CreateFormComponent,
    TodoDetailsComponent,
    LoginComponent,
    RegisterComponent,
    TopNavigationComponent,
    MainComponent,
    ImportantComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogginIncterceptorService,
      multi: true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
