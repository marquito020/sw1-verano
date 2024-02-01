import { Invitation } from "./invitation.interface.js";

type PhotographersIdType = {
  photographerId: number;
};

export interface IEvent {
  id?: number;
  title: string;
  description: string;
  dateTime: Date;
  location: string;
  qr?: String;
  organizerId?: number;
  photographers: PhotographersIdType[];
  invitations: Invitation[];
}
