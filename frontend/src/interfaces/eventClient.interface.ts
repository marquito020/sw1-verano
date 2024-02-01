import { Client } from "./client.interface";
import { IEvent } from "./event.interface";

export interface EventClient {
  id: number;
  clientId: number;
  eventId: number;
  event: IEvent;
  client: Client;
}
