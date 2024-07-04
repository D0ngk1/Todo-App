export interface ApiResponse <T>{
    message?:string;
    data: T;
}
export interface ITask {
    id: number;
    title: string;
    type: string;
    description: string;
    dateCreated: string;
}