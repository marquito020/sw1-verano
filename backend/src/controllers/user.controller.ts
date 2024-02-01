import { Request, Response } from "express";
import UserService from "../services/user.service.js";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await UserService.getAllUsers();
    return res.status(200).json(allUsers);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await UserService.addUser({ name, email, password });
    if (!newUser)
      return res.status(400).json({ message: "The email already exist" });

    return res.status(201).json(newUser);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUser(parseInt(id));
    if (!user) return res.status(400).json({ message: "user not exist" });

    return res.status(200).json(user);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserService.updateUser(parseInt(id), req.body);

    if (!updatedUser)
      return res.status(400).json({ message: "user not exist" });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserService.deleteUser(parseInt(id));

    if (!deletedUser)
      return res.status(400).json({ message: "user not exist" });

    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

export default { getAllUsers, addUser, getUser, updateUser, deleteUser };
