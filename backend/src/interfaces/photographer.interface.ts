import { User } from "./user.interface.js";

enum PhotographerType {
  person = "person",
  studio = "studio",
}

export interface Photographer {
  id?: number;
  type: PhotographerType;
  rate: number;
  specialty?: string;
  portfolio?: string;
  experince?: number;
  userId?: number;
  user: User;
}

// export interface Photographer extends User {
//   id?: number;
//   type?: PhotographerType;
//   specialty?: string;
//   portfolio?: string;
//   experince?: number;
//   rate: number;
//   userId?: number;
// }
