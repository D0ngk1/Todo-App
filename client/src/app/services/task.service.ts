import { Injectable } from '@angular/core';
import { TaskLists, TaskListsDTO } from './TasksLists';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, ITask } from '../model/Tasks';
import { Router } from '@angular/router';
import { CreateTaskLists } from '../model/User';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl = "https://todo-app-production-598c.up.railway.app/api/content/";
  private data: TaskLists[]=[];
  //private selectedData: TaskLists[]=[];
  private filteredData: TaskLists[]=[];
  showDialog=false;
  showDetails=false;
  noteId:any;
  type = "TASK";
  uid = sessionStorage.getItem('users');

  constructor (private http: HttpClient){

    
    //console.log(current.toUpperCase());
  }
  setType(type: string) {
    this.type = type;
  }

  addTask(item: TaskLists) : void {
    this.data.push(item);
  }
  read(): TaskLists[] {
    return this.data;
  }
  viewNotes (id:number): TaskLists | null{
   // this.selectedData = this.selectedData.
    //this.selectedData = this.filteredData.find((item) => item.id === id);
   // this.selectedData = this.filteredData.filter((item)=> item.id === id);
   // return this.selectedData
   const task = this.filteredData.find((item) => item.id === id);
   return task ? task : null;
    
  }
  filterItemsByType(type: string): TaskLists[] {
    this.filteredData = this.data.filter((item) => item.type === type);
    return this.filteredData;
  }

  //***************  POST API contents
  createTaskList(task: CreateTaskLists): Observable <ApiResponse<TaskLists>> {
    return this.http.post<ApiResponse<TaskLists>>(`${this.apiUrl}json`,task);
  }

  //***************  Fetch all tasklists Contents
  getAllTaskLists(type: string): Observable<ApiResponse<TaskListsDTO[]>>{
    return this.http.get<ApiResponse<TaskListsDTO[]>>(`${this.apiUrl}type/`);
  }
  //***************  Fetch all tasklists Contents by user and importance
  getAllTaskListsByUser(uid: number): Observable<TaskListsDTO[]>{
    return this.http.get<TaskListsDTO[]>(`${this.apiUrl}sql/important/uid/${uid}`);
  }
    //***************  Fetch all tasklists Contents by user and title search
  getAllTaskListsByUserAndTitle(uid: number, title: string): Observable<TaskLists[]>{
    return this.http.get<TaskLists[]>(`${this.apiUrl}sql/search/uid/${uid}/${title}`);
  }
   //***************  Fetch all tasklists Contents by user and dueDate
   getAllTaskListsByUserAndDueDate(uid: number): Observable<TaskListsDTO[]>{
    return this.http.get<TaskListsDTO[]>(`${this.apiUrl}sql/today/uid/${uid}`);
  }
  //***************  Fetch all tasklists Contents by user and dueDate not null
  getAllTaskListsByUserAndPlans(uid: number): Observable<TaskListsDTO[]>{
    return this.http.get<TaskListsDTO[]>(`${this.apiUrl}sql/plans/uid/${uid}`);
  }
  //***************  Fetch API Contents by types
  displayByType2(type: string,uid:number): Observable<TaskListsDTO[]>{
    return this.http.get<TaskListsDTO[]>(`${this.apiUrl}type/${type}/${uid}`);
  }

  //*************** Fetch API Contents by id
  getById(id: number): Observable<TaskListsDTO[]>{
    return this.http.get<TaskListsDTO[]>(`${this.apiUrl}sql/${id}`);
  }
  
  //*************** Delete Contents by id
  deleteById(id:number):Observable<TaskLists>{
    return this.http.delete<TaskLists>(`${this.apiUrl}sql/${id}`);
  }
  //*************** Update Contents by id
  updateById(id:number,task: TaskLists):Observable<TaskLists>{
    return this.http.put<TaskLists>(`${this.apiUrl}sql/${id}`,task);
  }

}
