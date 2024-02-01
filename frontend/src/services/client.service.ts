import { baseUrl } from "../constants/routes";
import { Client } from "../interfaces/client.interface";

export const clientsUrl = baseUrl + "api/clients";

const getAllClients = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const addClient = async (url: string, { arg }: { arg: FormData }) => {
  const response = await fetch(url, {
    method: "POST",
    body: arg,
  });
  const data = await response.json();
  return data;
};

const getClient = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const updateClient = async (url: string, { arg }: { arg: FormData }) => {
  const response = await fetch(url, {
    method: "PUT",
    body: arg,
  });
  const data = await response.json();
  return data;
};

const deleteClient = async (url: string, { arg }: { arg: number }) => {
  const response = await fetch(`${url}/${arg}`, { method: "DELETE" });
  const data = await response.json();
  return data;
};

export { getAllClients, addClient, getClient, updateClient, deleteClient };
