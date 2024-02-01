import { Router } from "express";
import fileUpload from "express-fileupload";

import ClientController from "../controllers/client.controller.js";

const router = Router();

router.get("/clients", ClientController.getAllClients);

router.post(
  "/clients",
  fileUpload({ useTempFiles: true, tempFileDir: "./src/uploads/" }),
  ClientController.addClient
);

router.get("/clients/:id", ClientController.getClient);

router.put(
  "/clients/:id",
  fileUpload({ useTempFiles: true, tempFileDir: "./src/uploads/" }),
  ClientController.updateClient
);

router.delete("/clients/:id", ClientController.deleteClient);

export default router;
