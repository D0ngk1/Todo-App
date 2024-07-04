import { Injectable } from '@angular/core';
import { TaskLists } from './TasksLists';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, ITask } from '../model/Tasks';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl = "http://localhost:8080/api/content/";
  private data: TaskLists[]=[];
  private selectedData: TaskLists[]=[];
  private filteredData: TaskLists[]=[];
  showDialog=false;
  showDetails=false;
  noteId:any;
  type = "TASK";

  constructor (private http: HttpClient, router: Router){

    
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
  createTaskList(task: TaskLists): Observable <ApiResponse<TaskLists>> {
    return this.http.post<ApiResponse<TaskLists>>(`${this.apiUrl}json`,task);
  }

  //***************  Fetch API Contents by types
  displayByType(type: string): Observable<ApiResponse<TaskLists[]>>{
    return this.http.get<ApiResponse<TaskLists[]>>(`${this.apiUrl}type/${type}`);
  }
  displayByType2(type: string): Observable<TaskLists[]>{
    return this.http.get<TaskLists[]>(`${this.apiUrl}type/${type}`);
  }

  //*************** Fetch API Contents by id
  getById2(id: number):Observable <ApiResponse<TaskLists>> {
    return this.http.get<ApiResponse<TaskLists>>(`${this.apiUrl}sql/${id}`);
  }
  getById(id: number): Observable<TaskLists[]>{
    return this.http.get<TaskLists[]>(`${this.apiUrl}sql/${id}`);
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
