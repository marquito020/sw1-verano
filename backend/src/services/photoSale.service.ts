import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

import { v2 as cloudinary } from "cloudinary";
import { configCloudinary } from "../config/cloudinary.js";

import {
  NewSalePhoto,
  PhotoSale,
  StatePhotoSale,
  TypePhotoSale,
} from "../interfaces/photoSale.interface.js";
import { transport } from "../config/nodemailer.js";
import { htmlTemplate } from "../utils/htmlTemplate.utils.js";

cloudinary.config(configCloudinary);

const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";

//apiVersion  == ultima version de la api (porque estoy utilizado typescript)
const stripe = new Stripe(STRIPE_API_KEY, { apiVersion: "2022-11-15" });

const prisma = new PrismaClient();

type AttachmentsType = { filename: string; path: string };

const createPhotoSale = async (data: NewSalePhoto[], idPayStripe: string) => {
  if (data.length == 0 || !idPayStripe) return null;

  const client = await prisma.client.findUnique({
    where: { id: data[0].clientId },
    include: { user: { select: { id: true, email: true } } },
  });

  if (!client) return null;

  let amount = 0.0;
  const dataPhotoSale: PhotoSale[] = [];
  const attachments: AttachmentsType[] = []; //para el email

  // 10% = 0.1
  for (const element of data) {
    const total = Number(
      (element.photoPrice + element.photoPrice * 0.1).toFixed(2)
    );
    dataPhotoSale.push({
      clientId: element.clientId,
      photoId: element.photoId,
      total,
      methodOfPayment: "Stripe",
      type: "digital" as TypePhotoSale,
      state: "paid" as StatePhotoSale,
      dateTime: new Date(),
    });
    amount += total;

    attachments.push({
      filename: `image ${element.photoId}`,
      path: `${element.photoImageSecureUrl}`,
    });
  }

  // en amount se debe muliplicar * 100 porque stripe maneja centavos de USD
  // ejemplo: 10$ = 10 * 100 = 1000      (monto minimo de pago 1$)
  // del amount que se envia, stripe cobra un 3.5% del dinero como comision
  await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "USD",
    description: `Compra de fotos, realizada por el cliente con ID: ${data[0].clientId}`,
    payment_method: idPayStripe,
    confirm: true,
  });

  const newSalePhotos = await prisma.photoSale.createMany({
    data: dataPhotoSale,
  });

  const dataTemplate = {
    total: amount,
    fecha: `${new Date().toLocaleString()}`,
    type: "digital",
    methodOfPayment: "Stripe",
  };
  const info = await transport.sendMail({
    from: '"Marco David Toledo 🌀" <marcotoledo@midominio.com>',
    to: `${client.user.email}`,
    subject: `La compra fue realizada exitosamente`,
    html: htmlTemplate(dataTemplate),
    attachments,
  });

  return newSalePhotos;
};

const getAllClientPhotoSales = async (clientId: number) => {
  const allClientPhotos = await prisma.photoSale.findMany({
    where: { clientId },
    include: { photo: { include: { photographer: true } } },
  });

  return allClientPhotos;
};

export default { createPhotoSale, getAllClientPhotoSales };

// const removeWatermarkTransformation = [
//   { effect: "replace_color:white", gravity: "center" },
// ];

// const photos: Photo[] = []
// Agregar la transformación a la URL
// const transformedUrl = imageUrl.replace(
//   "/upload/",
//   `/upload/${cloudinary.v2.url_transformation(removeWatermarkTransformation)}/`
// );
