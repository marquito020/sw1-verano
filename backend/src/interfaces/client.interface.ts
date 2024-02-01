import { User } from "./user.interface.js";

export interface Client {
  id? : number;
  userId?: number;
  user: User
}