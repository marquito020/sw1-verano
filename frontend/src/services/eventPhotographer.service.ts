import { baseUrl } from "../constants/routes";

export const photographerEventUrl = baseUrl + "api/photographer-event";
export const eventPhotographerUrl =  baseUrl + "api/event-photographer";

const getEvents= async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const getPhotographers= async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export { getEvents, getPhotographers }