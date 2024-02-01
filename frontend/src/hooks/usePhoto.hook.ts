import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import {
  addPhoto,
  deletePhoto,
  getAllPhotos,
  getAllPhotosPhotographer,
  getPhoto,
  photosUrl,
  updatePhoto,
} from "../services/photo.service";
import { NewPhoto, Photo } from "../interfaces/photo.interface";

const useAllPhotos = () => {
  const { data, isLoading, error } = useSWR<Photo[]>(photosUrl, getAllPhotos);

  return { photos: data, isLoading, error };
};

const useAddPhoto = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    Photo,
    string,
    string,
    FormData
  >(photosUrl, addPhoto);

  return { addPhoto: trigger, isMutating, error };
};

const useGetPhoto = (id: number) => {
  const { data, isLoading, error } = useSWR<Photo>(
    `${photosUrl}/${id}`,
    getPhoto
  );

  return { photoFound: data, isLoading, error };
};

const useUpdatePhoto = (id: number) => {
  const { trigger, isMutating, error } = useSWRMutation<
    Photo,
    string,
    string,
    Partial<Photo>
  >(`${photosUrl}/${id}`, updatePhoto);

  return { updatePhoto: trigger, isMutating, error };
};

const useDeletePhoto = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    Photo,
    string,
    string,
    number
  >(photosUrl, deletePhoto);

  return { deletePhoto: trigger, isMutating, error };
};

const useAllPhotosPhotographer = (photographerId: number) => {
  const { data, isLoading, error } = useSWR<Photo[]>(
    `${photosUrl}/photographer/${photographerId}`,
    getAllPhotosPhotographer
  );

  return { photos: data, isLoading, error };
};

export {
  useAllPhotos,
  useAddPhoto,
  useGetPhoto,
  useUpdatePhoto,
  useDeletePhoto,
  useAllPhotosPhotographer,
};
