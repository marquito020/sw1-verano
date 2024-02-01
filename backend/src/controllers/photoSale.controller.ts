import { Request, Response } from "express";
import Stripe from "stripe";

import PhotoSaleService from "../services/photoSale.service.js";

const createPhotoSale = async (req: Request, res: Response) => {
  try {
    const { idPayStripe, dataPhotoSale } = req.body;
    // console.log(req.body)
    // return res.status(200).json(req.body);
    const newSalePhotos = await PhotoSaleService.createPhotoSale(
      dataPhotoSale,
      idPayStripe
    );

    if (!newSalePhotos)
      return res.status(400).json({
        message: "No envio nada para comprar o usted no es un cliente",
      });

    return res.status(201).json(newSalePhotos);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeCardError) {
      return res.status(400).json({ message: error.message });
    }

    console.log("OCURRIO UN ERROR", error);
    return res.status(500).json(error);
  }
};

const getAllClientPhotoSales = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    const allClientPhotoSales = await PhotoSaleService.getAllClientPhotoSales(
      parseInt(clientId)
    );

    return res.status(200).json(allClientPhotoSales);
  } catch (error) {
    console.log("OCURRIO UN ERROR", error);
    return res.status(500).json(error);
  }
};

export default { createPhotoSale, getAllClientPhotoSales };
