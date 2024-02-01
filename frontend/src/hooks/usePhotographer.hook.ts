import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { Photographer } from "../interfaces/photographer.interface";
import {
  addPhotographer,
  deletePhotograpger,
  getAllPhotographers,
  getPhotographer,
  photographersUrl,
  updatePhotographer,
} from "../services/photographer.service";

const useAllPhotographers = () => {
  const { data, isLoading, error } = useSWR<Photographer[]>(
    photographersUrl,
    getAllPhotographers
  );

  return { photographers: data, isLoading, error };
};

const useAddPhotographer = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    Photographer,
    string,
    string,
    FormData
  >(photographersUrl, addPhotographer);

  return { addPhotographer: trigger, isMutating, error };
};

const useGetPhotographer = (id: number) => {
  const { data, isLoading, error } = useSWR<Photographer>(
    `${photographersUrl}/${id}`,
    getPhotographer
  );

  return { photographerFound: data, isLoading, error };
};

const useUpdatePhotographer = (id: number) => {
  const { trigger, isMutating, error } = useSWRMutation<
    Photographer,
    string,
    string,
    FormData
  >(`${photographersUrl}/${id}`, updatePhotographer);

  return { updatePhotographer: trigger, isMutating, error };
};

const useDeletePhotographer = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    Photographer,
    string,
    string,
    number
  >(photographersUrl, deletePhotograpger);

  return { deletePhotograpger: trigger, isMutating, error };
};

const useAllPhotographersMutation = () => {
  const { trigger, isMutating, error } = useSWRMutation<Photographer[]>(
    photographersUrl,
    getAllPhotographers
  );

  return { getAllPhotographers: trigger, isMutating, error };
};

export {
  useAllPhotographers,
  useAddPhotographer,
  useGetPhotographer,
  useUpdatePhotographer,
  useDeletePhotographer,
  useAllPhotographersMutation,
};
