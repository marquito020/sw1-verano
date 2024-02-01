import { Auth, RegisterElements } from "./auth.interface";
import { User, UserElements } from "./user.interface";

export interface NewOrganizer extends Auth {
  name: string;
  webSite: string;
}

export interface Organizer {
  id?: number;
  webSite: string;
  userId?: number;
  user: User;
}

interface OrganizerElements extends UserElements {
  webSite: HTMLInputElement;
}

export interface OrganizerCustomForm extends HTMLFormElement {
  readonly elements: OrganizerElements;
}
