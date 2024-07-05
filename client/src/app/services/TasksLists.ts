export interface ApiResponse<T>{
  message?:string;
  data: T;
}

export class TaskLists{
    public id: number;
    public title: string;
    public type: string;
    public description: string;
    public dateCreated: string;
    public dueDate: string;
    public done: boolean;
    public important: boolean;
    
    
        
    /*public TaskLists(id: number, title: string, type: string, description: string, date: string) {
      this.id = id;
      this.title = title;
      this.type = type;
      this.description = description;
      this.date = date;
    }*/
    public constructor(id: number,title: string, type: string, description: string, date: string,dueDate:string,done:boolean,important:boolean) {
      this.id = id;
      this.title = title;
      this.type = type;
      this.description = description;
      this.dateCreated = date;
      this.dueDate = dueDate;
      this.done = done;
      this.important = important;
    }
    /*
    public get getTitle(){
      return this.title;
    }
    public get getType(){
      return this.type;
    }
    public get getDescription(){
      return this.description;
    }
    public get getDate(){
      return this.date;
    }
    public get getId(){
      return this.id;
    }*/
}