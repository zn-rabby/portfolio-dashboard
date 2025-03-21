export interface IUser {
    _id:string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    isBlocked: boolean;
  }

  export interface Contact {
    _id: string;
    email: string;
    name: string;
    message: string;
  }