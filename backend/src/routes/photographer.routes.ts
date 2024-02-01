import { Router } from "express";
import fileUpload from "express-fileupload";

import PhotographerController from "../controllers/photographer.controller.js";

const router = Router();

router.get("/photographers", PhotographerController.getAllPhotographers);

router.post(
  "/photographers",
  fileUpload({ useTempFiles: true, tempFileDir: "./src/uploads/" }),
  PhotographerController.addPhotographer
);

router.get("/photographers/:id", PhotographerController.getPhotographer);

router.put(
  "/photographers/:id",
  fileUpload({ useTempFiles: true, tempFileDir: "./src/uploads/" }),
  PhotographerController.updatePhotographer
);

router.delete("/photographers/:id", PhotographerController.deletePhotographer);

export default router;
