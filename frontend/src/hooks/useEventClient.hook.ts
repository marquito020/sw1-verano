import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { EventClient } from "../interfaces/eventClient.interface";

import {
  eventClientUrl,
  getEventsClient,
} from "../services/eventClient.service";

const useGetEventsClient = (clientId: number) => {
  const { data, isLoading, error } = useSWR<EventClient[]>(
    `${eventClientUrl}/${clientId}`,
    getEventsClient
  );

  return { eventsClient: data, isLoading, error };
};

export { useGetEventsClient };
