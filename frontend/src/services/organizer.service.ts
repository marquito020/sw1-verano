import { Organizer } from "../interfaces/organizer.interface";
import { baseUrl } from "../constants/routes";

export const organizersUrl =  baseUrl + "api/organizers";

const getAllOrganizers = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const addOrganizer = async (url: string, { arg }: { arg: FormData }) => {
  const response = await fetch(url, {
    method: "POST",
    body: arg,
  });
  const data = await response.json();
  return data;
};

const getOrganizer = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const updateOrganizer = async (url: string, { arg }: { arg: FormData }) => {
  const response = await fetch(url, {
    method: "PUT",
    body: arg,
  });
  const data = await response.json();
  return data;
};

const deleteOrganizer = async (url: string, { arg }: { arg: number }) => {
  const response = await fetch(`${url}/${arg}`, { method: "DELETE" });
  const data = await response.json();
  return data;
};

export {
  getAllOrganizers,
  addOrganizer,
  getOrganizer,
  updateOrganizer,
  deleteOrganizer,
};
