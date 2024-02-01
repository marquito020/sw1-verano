import { Request, Response } from "express";
import PhotoService from "../services/photo.service.js";

const getAllPhotos = async (req: Request, res: Response) => {
  try {
    const allPhotos = await PhotoService.getAllPhotos();
    return res.status(200).json(allPhotos);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const addPhoto = async (req: Request, res: Response) => {
  try {
    const { photographerId, eventId, price, isPublic } = req.body;
    const newPhoto = await PhotoService.addPhoto(
      {
        photographerId: parseInt(photographerId),
        eventId: parseInt(eventId),
        price: parseInt(price),
        isPublic: isPublic === "true",
      },
      req.files
    );

    if (!newPhoto)
      return res
        .status(400)
        .json({ message: "No envio una imagen o usted no es un fotografo" });

    return res.status(201).json(newPhoto);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const getPhoto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const photoFound = await PhotoService.getPhoto(parseInt(id));
    if (!photoFound)
      return res.status(400).json({ message: "Photo not exist" });

    return res.status(200).json(photoFound);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

// TODO: Falta hacer
const updatePhoto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedPhoto = await PhotoService.updatePhoto(parseInt(id), req.body);
    if (!updatedPhoto)
      return res.status(400).json({ message: "Photo not exist" });

    return res.status(200).json(updatedPhoto);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const deletePhoto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPhoto = await PhotoService.deletePhoto(parseInt(id));
    if (!deletedPhoto)
      return res.status(400).json({ message: "Photo not exist" });

    return res.status(200).json(deletedPhoto);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const getAllPhotosPhotographer = async (req: Request, res: Response) => {
  try {
    const { photographerId } = req.params;
    const allPhotosPhotographer = await PhotoService.getAllPhotosPhotographer(
      parseInt(`${photographerId}`)
    );

    return res.status(200).json(allPhotosPhotographer);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

export default {
  getAllPhotos,
  addPhoto,
  getPhoto,
  updatePhoto,
  deletePhoto,
  getAllPhotosPhotographer,
};
