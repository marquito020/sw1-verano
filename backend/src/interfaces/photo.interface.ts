import { IEvent } from "./event.interface.js";
import { Photographer } from "./photographer.interface.js";

// export interface ImageUser {
//   imageSecureUrl: string;
//   imagePublicId: string;
// }

// export interface PhotoUser {
//   _id?: string;
//   images: ImageUser[];
//   userId?: number;
// }

export interface NewPhoto {
  imageUrl?: string;
  imageUrlCopy?: string;
  price: number;
  isPublic: boolean;
  photographerId: number;
  eventId: number;
}

export interface Photo extends NewPhoto {
  id: number;
  photographer: Photographer;
  event: IEvent;
}
