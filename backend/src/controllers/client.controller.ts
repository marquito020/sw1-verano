import { Request, Response } from "express";
import ClientService from "../services/client.service.js";

const getAllClients = async (req: Request, res: Response) => {
  try {
    const allClients = await ClientService.getAllClients();
    return res.status(200).json(allClients);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const addClient = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const newClient = await ClientService.addClient(
      {
        user: { name, email, password },
      },
      req.files
    );
    if (!newClient)
      return res
        .status(400)
        .json({ message: "El email ya existe o no envio una foto" });

    return res.status(201).json(newClient);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const getClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await ClientService.getClient(parseInt(id));
    if (!client) return res.status(400).json({ message: "cliente no existe" });

    return res.status(200).json(client);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};


const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body
    const updatedClient = await ClientService.updateClient(
      parseInt(id),
      {
        user: { name, email, phone, address, password : "" },
      }, req.files
    );
    if (!updatedClient)
      return res.status(400).json({ message: "cliente no existe" });

    return res.status(200).json(updatedClient);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedClient = await ClientService.deleteClient(parseInt(id));
    if (!deletedClient)
      return res.status(400).json({ message: "cliente no existe" });

    return res.status(200).json(deletedClient);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

export default {
  getAllClients,
  addClient,
  getClient,
  updateClient,
  deleteClient,
};
