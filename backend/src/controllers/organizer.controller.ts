import { Request, Response } from "express";
import OrganizerService from "../services/organizer.service.js";

const getAllOrganizers = async (req: Request, res: Response) => {
  try {
    const allOrganizers = await OrganizerService.getAllOrganizers();
    return res.status(200).json(allOrganizers);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const addOrganizer = async (req: Request, res: Response) => {
  try {
    const { name, email, password, webSite } = req.body;
    const newOrganizer = await OrganizerService.addOrganizer(
      {
        webSite,
        user: { name, email, password },
      },
      req.files
    );
    if (!newOrganizer)
      return res
        .status(400)
        .json({ message: "El email ya existe o  no envio una foto" });

    return res.status(201).json(newOrganizer);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const getOrganizer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const organizer = await OrganizerService.getOrganizer(parseInt(id));
    if (!organizer)
      return res.status(400).json({ message: "organizador no existe" });

    return res.status(200).json(organizer);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const updateOrganizer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, webSite } = req.body;
    const updatedOrganizer = await OrganizerService.updateOrganizer(
      parseInt(id),
      { webSite, user: { name, email, phone, address, password: "" } },
      req.files
    );
    if (!updatedOrganizer)
      return res.status(400).json({ message: "organizador no existe" });

    return res.status(200).json(updatedOrganizer);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const deleteOrganizer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedOrganizer = await OrganizerService.deleteOrganizer(
      parseInt(id)
    );
    if (!deletedOrganizer)
      return res.status(400).json({ message: "organizador no existe" });

    return res.status(200).json(deletedOrganizer);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

export default {
  getAllOrganizers,
  addOrganizer,
  getOrganizer,
  updateOrganizer,
  deleteOrganizer,
};
