import { Auth } from "./auth.interface";
import { Rol } from "./rol.interface";

type PhotographerOrOrganizerOrClientUser = {
  id: number;
};

interface UserBase {
  id?: number;
  name: string;
  email: string;
}

export interface UserInfo extends UserBase {
  token: string;
  imageSecureUrl: string;
  photographer?: PhotographerOrOrganizerOrClientUser;
  organizer?: PhotographerOrOrganizerOrClientUser;
  client?: PhotographerOrOrganizerOrClientUser;
  rol: Rol;
}

export interface User extends UserBase {
  imageSecureUrl: string;
  imagePublicId: string;
  phone?: string;
  address?: string;
}

export interface NewUser extends Auth {
  name: string;
  phone?: string;
  address?: string;
}

export interface UserElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  phone: HTMLInputElement;
  address: HTMLInputElement;
}

export interface UserCustomForm extends HTMLFormElement {
  readonly elements: UserElements;
}
