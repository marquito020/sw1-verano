import { baseUrl } from "../constants/routes";
export const eventClientUrl =  baseUrl + "api/event-client";

const getEventsClient = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export { getEventsClient };
