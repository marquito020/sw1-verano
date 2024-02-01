import { Photographer } from "../interfaces/photographer.interface";
import { baseUrl } from "../constants/routes";

export const photographersUrl = baseUrl + "api/photographers";

const getAllPhotographers = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const addPhotographer = async (url: string, { arg }: { arg: FormData }) => {
  const response = await fetch(url, {
    method: "POST",
    body: arg,
  });
  const data = await response.json();
  return data;
};

const getPhotographer = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const updatePhotographer = async (url: string, { arg }: { arg: FormData }) => {
  const response = await fetch(url, {
    method: "PUT",
    body: arg,
  });
  const data = await response.json();
  return data;
};

const deletePhotograpger = async (url: string, { arg }: { arg: number }) => {
  const response = await fetch(`${url}/${arg}`, { method: "DELETE" });
  const data = await response.json();
  return data;
};

export {
  getAllPhotographers,
  addPhotographer,
  getPhotographer,
  updatePhotographer,
  deletePhotograpger,
};
