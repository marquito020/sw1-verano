import { baseUrl } from "../constants/routes";
import { IEvent } from "../interfaces/event.interface";

export const eventsUrl = baseUrl + "api/events";

const getAllEvents = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const addEvent = async (url: string, { arg }: { arg: IEvent }) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

const getEvent = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const updateEvent = async (url: string, { arg }: { arg: Partial<IEvent> }) => {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

const deleteEvent = async (url: string, { arg }: { arg: number }) => {
  const response = await fetch(`${url}/${arg}`, { method: "DELETE" });
  const data = await response.json();
  return data;
};

const getAllEventsOrganizer = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export {
  getAllEvents,
  addEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  getAllEventsOrganizer,
};
