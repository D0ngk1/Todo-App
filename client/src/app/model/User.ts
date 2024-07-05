export interface Authority {
    roleId: number;
    authority: string;
  }
  
export interface UserRegister {
    userId: string;
    username: string;
    authorities: Authority[];
    enabled: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
  }
  
export interface LoginResponse {
    user: UserRegister;
    jwt: string;
}
export interface TL {
    id: number,
    title: string,
    type: string,
    description: string,
    dateCreated: string,
    done: boolean,
    important:boolean,
    dueDate:string
}

export interface CreateTaskLists {
    user: UserRegister,
    id: number,
    title: string,
    type: string,
    description: string,
    dateCreated: string,
    done: boolean,
    important:boolean,
    dueDate:string
  };