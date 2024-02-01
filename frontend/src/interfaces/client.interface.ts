import { NewUser, User } from "./user.interface";

export interface Client {
  id?: number;
  userId?: number;
  user: User;
}

