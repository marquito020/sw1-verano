import { Router } from "express";
import PhotoSaleController from "../controllers/photoSale.controller.js";

const router = Router();

// venta de las fotos
router.post("/photo-sale", PhotoSaleController.createPhotoSale);

router.get(
  "/photo-sale/client/:clientId",
  PhotoSaleController.getAllClientPhotoSales
);

export default router;
