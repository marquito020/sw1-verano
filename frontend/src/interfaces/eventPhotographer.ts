import { IEvent } from "./event.interface";

export interface PhotographerEvent {
  id: number;
  eventId: number;
  photographerId: number;
  event: IEvent;
}
