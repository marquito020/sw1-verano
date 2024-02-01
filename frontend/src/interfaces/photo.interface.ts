import { IEvent } from "./event.interface";
import { Photographer } from "./photographer.interface";

export interface NewPhoto {
  price: number;
  isPublic: boolean;
  image: File;
  photographerId: number;
  eventId: number;
}

export interface Photo extends NewPhoto {
  id: number;
  imageUrl?: string;
  imageUrlCopy?: string;
  photographer: Photographer;
  event: IEvent;
}

interface PhotoElements extends HTMLFormControlsCollection {
  price: HTMLInputElement;
  eventId: HTMLOptionElement;
  isPublic: HTMLInputElement;
  image: HTMLInputElement;
}

export interface PhotoCustomForm extends HTMLFormElement {
  readonly elements: PhotoElements;
}
