import { User } from "./user.interface.js";


export interface Organizer {
  id?: number;
  webSite?: string;
  userId?: number;
  user: User;
}

// export interface Organizer extends User {
//   id?: number;
//   webSite?: string;
// }