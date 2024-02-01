import { Router } from "express";
import fileUpload from "express-fileupload";

import PhotoController from "../controllers/photo.controller.js";

const router = Router();

router.get("/photos", PhotoController.getAllPhotos);

router.post(
  "/photos",
  fileUpload({ useTempFiles: true, tempFileDir: "./src/uploads/" }),
  PhotoController.addPhoto
);

router.get("/photos/:id", PhotoController.getPhoto);

router.put(
  "/photos/:id",
  fileUpload({ useTempFiles: true, tempFileDir: "./src/uploads/" }),
  PhotoController.updatePhoto
);

router.delete("/photos/:id", PhotoController.deletePhoto);

router.get(
  "/photos/photographer/:photographerId",
  PhotoController.getAllPhotosPhotographer
);

export default router;
