import { NewPhoto, Photo } from "../interfaces/photo.interface";
import { baseUrl } from "../constants/routes";

export const photosUrl = baseUrl + "api/photos";

const getAllPhotos = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// se recibe un tipo Form Data y eso se lo envia
const addPhoto = async (url: string, { arg }: { arg: FormData }) => {
  const response = await fetch(url, {
    method: "POST",
    body: arg,
  });

  const data = await response.json();
  return data;
};

const getPhoto = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const updatePhoto = async (url: string, { arg }: { arg: Partial<Photo> }) => {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

const deletePhoto = async (url: string, { arg }: { arg: number }) => {
  const response = await fetch(`${url}/${arg}`, { method: "DELETE" });
  const data = await response.json();
  return data;
};

const getAllPhotosPhotographer = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export {
  getAllPhotos,
  addPhoto,
  getPhoto,
  updatePhoto,
  deletePhoto,
  getAllPhotosPhotographer,
};
