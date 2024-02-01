import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { NewOrganizer, Organizer } from "../interfaces/organizer.interface";
import {
  addOrganizer,
  deleteOrganizer,
  getAllOrganizers,
  getOrganizer,
  organizersUrl,
  updateOrganizer,
} from "../services/organizer.service";

const useAllOrganizers = () => {
  const { data, isLoading, error } = useSWR<Organizer[]>(
    organizersUrl,
    getAllOrganizers
  );

  return { organizers: data, isLoading, error };
};

const useAddOrganizer = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    Organizer,
    string,
    string,
    FormData
  >(organizersUrl, addOrganizer);

  return { addOrganizer: trigger, isMutating, error };
};

const useGetOrganizer = (id: number) => {
  const { data, isLoading, error } = useSWR<Organizer>(
    `${organizersUrl}/${id}`,
    getOrganizer
  );

  return { organizerFound: data, isLoading, error };
};

// TODO: modificarlo
const useUpdateOrganizer = (id: number) => {
  const { trigger, isMutating, error } = useSWRMutation<
    Organizer,
    string,
    string,
    FormData
  >(`${organizersUrl}/${id}`, updateOrganizer);

  return { updateOrganizer: trigger, isMutating, error };
};

const useDeleteOrganizer = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    Organizer,
    string,
    string,
    number
  >(organizersUrl, deleteOrganizer);

  return { deleteOrganizer: trigger, isMutating, error };
};

export {
  useAllOrganizers,
  useAddOrganizer,
  useGetOrganizer,
  useUpdateOrganizer,
  useDeleteOrganizer,
};
