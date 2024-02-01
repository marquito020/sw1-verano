import { Request, Response } from "express";
import AuthService from "../services/auth.service.js";

const isAlive = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "is OK" });
};

const registerNewUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await AuthService.registerNewUser({
      name,
      email,
      password,
    });

    if (!newUser)
      return res.status(400).json({ message: "Email already exist" });

    return res.status(201).json(newUser);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password, tokenMovil } = req.body;
    const user = await AuthService.login({ email, password }, tokenMovil);

    if (!user)
      return res.status(400).json({ message: "Email or Password incorrect" });

    return res.status(200).json(user);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

export default { isAlive, registerNewUser, login };

// Cargar los modelos necesarios
// Promise.all([
//   faceapi.nets.tinyFaceDetector.loadFromDisk("./models"),
//   faceapi.nets.faceLandmark68Net.loadFromDisk("./models"),
//   faceapi.nets.faceRecognitionNet.loadFromDisk("./models"),
// ]).then(detectFaces);

// AWS REKOGNITION
// const params = {
//   Image: {
//     Bytes: imageBytes,
//   },
//   Attributes: ["DEFAULT"],
// };

// const command = new DetectFacesCommand(params);
// const result = await rekognition.send(command);
// console.log("RESULTADOS: ", result);
// console.log("Rostros detectados:", result.FaceDetails);

// return res
//   .status(200)
//   .json({ message: "Is Alive", result: result.FaceDetails });
