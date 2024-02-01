import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import {
  getEvents,
  photographerEventUrl,
} from "../services/eventPhotographer.service";
import { PhotographerEvent } from "../interfaces/eventPhotographer";

const useGetEvents = (photographerId: number) => {
  const { data, isLoading, error } = useSWR<PhotographerEvent[]>(
    `${photographerEventUrl}/${photographerId}`,
    getEvents
  );

  return { photographerEvent: data, isLoading, error };
};

export { useGetEvents };
