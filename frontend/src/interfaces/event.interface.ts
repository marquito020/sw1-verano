import { Invitation } from "./invitation.interface";
import { Photo } from "./photo.interface";

export type PhotographersIdType = {
  photographerId: number;
};

export interface IEvent {
  id?: number;
  title: string;
  description: string;
  dateTime: Date;
  location: string;
  qr?: string;
  organizerId?: number;
  photographers: PhotographersIdType[];
  invitations: Invitation[];
  photos?: Photo[]
}

interface EventsElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  description: HTMLTextAreaElement;
  location: HTMLInputElement;
  dateTime: HTMLInputElement;
  photographers: HTMLSelectElement;
}

export interface EventCustomForm extends HTMLFormElement {
  readonly elements: EventsElements;
}
