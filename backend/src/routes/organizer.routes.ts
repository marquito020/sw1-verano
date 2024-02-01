import { Router } from "express";
import fileUpload from "express-fileupload";

import OrganizerController from "../controllers/organizer.controller.js";

const router = Router();

router.get("/organizers", OrganizerController.getAllOrganizers);

router.post(
  "/organizers",
  fileUpload({ useTempFiles: true, tempFileDir: "./src/uploads/" }),
  OrganizerController.addOrganizer
);

router.get("/organizers/:id", OrganizerController.getOrganizer);

router.put(
  "/organizers/:id",
  fileUpload({ useTempFiles: true, tempFileDir: "./src/uploads/" }),
  OrganizerController.updateOrganizer
);

router.delete("/organizers/:id", OrganizerController.deleteOrganizer);

export default router;
