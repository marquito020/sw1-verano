import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { IEvent } from "../interfaces/event.interface";
import {
  addEvent,
  deleteEvent,
  eventsUrl,
  getAllEvents,
  getAllEventsOrganizer,
  getEvent,
  updateEvent,
} from "../services/event.service";

const useAllEvents = () => {
  const { data, isLoading, error } = useSWR<IEvent[]>(eventsUrl, getAllEvents);

  return { events: data, isLoading, error };
};

const useAddEvent = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    IEvent,
    string,
    string,
    IEvent
  >(eventsUrl, addEvent);

  return { addEvent: trigger, isMutating, error };
};

const useGetEvent = (id: number) => {
  const { data, isLoading, error } = useSWR<IEvent>(
    `${eventsUrl}/${id}`,
    getEvent
  );

  return { eventFound: data, isLoading, error };
};

const useUpdateEvent = (id: number) => {
  const { trigger, isMutating, error } = useSWRMutation<
    IEvent,
    string,
    string,
    Partial<IEvent>
  >(`${eventsUrl}/${id}`, updateEvent);

  return { updateEvent: trigger, isMutating, error };
};

const useDeleteEvent = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    IEvent,
    string,
    string,
    number
  >(eventsUrl, deleteEvent);

  return { deleteEvent: trigger, isMutating, error };
};

const useAllEventsOrganizer = (id: number) => {
  const { data, isLoading, error, mutate } = useSWR<IEvent[]>(
    `${eventsUrl}/organizer/${id}`,
    getAllEventsOrganizer
  );

  return { events: data, isLoading, error, mutate };
};

export {
  useAllEvents,
  useAddEvent,
  useGetEvent,
  useUpdateEvent,
  useDeleteEvent,
  useAllEventsOrganizer
};
