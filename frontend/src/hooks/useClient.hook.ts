import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { Client } from "../interfaces/client.interface";
import {
  addClient,
  clientsUrl,
  deleteClient,
  getAllClients,
  getClient,
  updateClient,
} from "../services/client.service";
import { NewUser } from "../interfaces/user.interface";

const useAllClients = () => {
  const { data, isLoading, error } = useSWR<Client[]>(
    clientsUrl,
    getAllClients
  );

  return { clients: data, isLoading, error };
};

const useAddClient = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    Client,
    string,
    string,
    FormData
  >(clientsUrl, addClient);

  return { addClient: trigger, isMutating, error };
};

const useGetClient = (id: number) => {
  const { data, isLoading, error } = useSWR<Client>(
    `${clientsUrl}/${id}`,
    getClient
  );

  return { clientFound: data, isLoading, error };
};


const useUpdateClient = (id: number) => {
  const { trigger, isMutating, error } = useSWRMutation<
    Client,
    string,
    string,
    FormData
  >(`${clientsUrl}/${id}`, updateClient);

  return { updateClient: trigger, isMutating, error };
};

const useDeleteClient = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    Client,
    string,
    string,
    number
  >(clientsUrl, deleteClient);

  return { deleteClient: trigger, isMutating, error };
};

export {
  useAllClients,
  useAddClient,
  useGetClient,
  useUpdateClient,
  useDeleteClient,
};
