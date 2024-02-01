import { Auth, RegisterElements } from "./auth.interface";
import { User } from "./user.interface";

export enum PhotographerType {
  person = "person",
  studio = "studio",
}

export interface NewPhotographer extends Auth {
  name: string;
  type: PhotographerType;
  rate: number;
}

export interface Photographer {
  id?: number;
  type: PhotographerType;
  specialty?: string;
  portfolio?: string;
  experince?: number;
  rate: number;
  userId?: number;
  user: User;
}

interface RegisterPhotographerElements extends RegisterElements {
  type: HTMLOptionElement;
  rate: HTMLInputElement;
  phone: HTMLInputElement;
  address: HTMLInputElement;
  experince: HTMLInputElement;
  specialty: HTMLInputElement;
  portfolio: HTMLInputElement;
}

export interface PhotographerCustomForm extends HTMLFormElement {
  readonly elements: RegisterPhotographerElements;
}
