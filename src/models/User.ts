export enum UserRoles {
  Standard,
  Admin,
}


// **** Types **** //
export interface IUser {
  user_id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  hasResetdefaultPassword?: boolean,
  userType?: UserRoles;
}

export interface ISessionUser {
  id: number;
  email: string;
  name: string;
  role: IUser['userType'];
}