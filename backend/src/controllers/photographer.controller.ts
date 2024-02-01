import { Request, Response } from "express";
import PhotographerService from "../services/photographer.service.js";

const getAllPhotographers = async (req: Request, res: Response) => {
  try {
    const allPhotographers = await PhotographerService.getAllPhotographers();
    return res.status(200).json(allPhotographers);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const addPhotographer = async (req: Request, res: Response) => {
  try {
    const { name, email, password, rate, type } = req.body;
    const newPhotographer = await PhotographerService.addPhotographer(
      {
        rate: parseInt(rate),
        type,
        user: { name, email, password },
      },
      req.files
    );

    if (!newPhotographer)
      return res
        .status(400)
        .json({ message: "El email ya existe o  no envio una foto" });

    return res.status(201).json(newPhotographer);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const getPhotographer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const photographer = await PhotographerService.getPhotographer(
      parseInt(id)
    );

    if (!photographer)
      return res.status(400).json({ message: "Fotografo no existe" });

    return res.status(201).json(photographer);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const updatePhotographer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      address,
      phone,
      rate,
      type,
      experince,
      specialty,
      portfolio,
    } = req.body;
    const updatedPhotographer = await PhotographerService.updatePhotographer(
      parseInt(id),
      {
        rate: parseInt(rate),
        experince: parseInt(experince),
        portfolio,
        type,
        specialty,
        user: { name, email, password, address, phone },
      },
      req.files
    );

    if (!updatedPhotographer)
      return res.status(400).json({ message: "Fotografo no existe" });

    return res.status(200).json(updatedPhotographer);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const deletePhotographer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPhotographer = await PhotographerService.deletePhotographer(
      parseInt(id)
    );

    if (!deletedPhotographer)
      return res.status(400).json({ message: "Fotografo no existe" });

    return res.status(200).json(deletedPhotographer);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

export default {
  getAllPhotographers,
  addPhotographer,
  getPhotographer,
  updatePhotographer,
  deletePhotographer,
};
