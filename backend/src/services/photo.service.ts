import { PrismaClient } from "@prisma/client";
import fs from "fs-extra";
import sharp from "sharp";
import { Message, MulticastMessage } from "firebase-admin/messaging";

import { NewPhoto, Photo } from "../interfaces/photo.interface.js";
import { FileArray, UploadedFile } from "express-fileupload";
import { uploadImage } from "../utils/uploadImage.utils.js";
import { thereIsFaceMatches } from "../utils/faceMatches.js";

import { firebaseMessaging } from "../config/firebase.js";

const prisma = new PrismaClient();

type fileUploadType = FileArray | undefined | null;

const getAllPhotos = async () => {
  const allPhotos = await prisma.photo.findMany({
    include: { photographer: true, event: true },
  });
  return allPhotos;
};

const addPhoto = async (dataPhoto: NewPhoto, files: fileUploadType) => {
  const photographerFound = await prisma.photographer.findUnique({
    where: { id: dataPhoto.photographerId },
  });
  if (!photographerFound) return null;

  let secureUrl = "";
  let secureUrlCopy = "";

  if (files?.image) {
    // imagen original
    const { tempFilePath } = files.image as UploadedFile;
    const imageCloudinary = await uploadImage(tempFilePath, true);

    secureUrl = imageCloudinary.secure_url;

    // bajar la calidad de la imagen original
    const originalImage = sharp(tempFilePath);
    const lowQualityImageBuffer = await originalImage
      .resize(400)
      .jpeg({ quality: 40 })
      .toBuffer();

    // alamacena la imagen de baja calidad
    const pathImageCopy = `${tempFilePath}copy`;
    await fs.writeFile(pathImageCopy, lowQualityImageBuffer);

    const lowQualityImageCloudinary = await uploadImage(pathImageCopy, true);
    secureUrlCopy = lowQualityImageCloudinary.secure_url;

    // delete images of the storage
    await Promise.all([fs.unlink(tempFilePath), fs.unlink(pathImageCopy)]);
  } else {
    return null;
  }

  const newPhoto = await prisma.photo.create({
    data: {
      imageUrl: secureUrl,
      imageUrlCopy: secureUrlCopy,
      price: dataPhoto.price,
      isPublic: dataPhoto.isPublic,
      photographerId: dataPhoto.photographerId,
      eventId: dataPhoto.eventId,
    },
  });

  // se debe notificar a los clientes que reconocio la foto
  const clients = await prisma.eventClient.findMany({
    where: { eventId: dataPhoto.eventId },
    include: { client: { include: { user: true } } },
  });

  const tokensMovil: string[] = [];
  await Promise.all(
    clients.map(async (element) => {
      const user = element.client.user;

      const thereIsCoicidence = await thereIsFaceMatches(
        user.imageSecureUrl,
        newPhoto.imageUrl
      );

      if (thereIsCoicidence && user.tokenMovil) {
        console.log("User found: ", user);
        tokensMovil.push(user.tokenMovil);
      }
    })
  );

  const eventClient = await prisma.eventClient.findFirst({
    where: { eventId: dataPhoto.eventId },
  });

  // TODO: Enviar las notificaciones
  const requestMessages: Message[] = tokensMovil.map((token) => {
    const requestMessage: Message = {
      token,
      notification: {
        title: `Nueva foto agregada al evento`,
        body: `Su rostro aparece en esta foto del evento que participo`,
      },
      data: {
        eventClient: `{
          "id": "${eventClient!.id}",
          "clientId": "${eventClient?.clientId}",
          "eventId": "${eventClient?.eventId}"
        }`,
      },
      android: { priority: "high" },
    };
    return requestMessage;
  });

  console.log("enviando mensajes");
  const msg = await firebaseMessaging.sendEach(requestMessages);
  console.log(msg);

  return newPhoto;
};

const getPhoto = async (id: number) => {
  const photoFound = await prisma.photo.findUnique({
    where: { id },
    include: { photographer: true, event: true },
  });
  return photoFound;
};

const updatePhoto = async (id: number, dataPhoto: Photo) => {
  const existPhoto = await prisma.photo.findUnique({ where: { id } });
  if (!existPhoto) return null;

  const updatedPhoto = await prisma.photo.update({
    where: { id },
    data: {
      imageUrl: dataPhoto.imageUrl,
      imageUrlCopy: dataPhoto.imageUrlCopy,
      price: dataPhoto.price,
      isPublic: dataPhoto.isPublic,
      eventId: dataPhoto.eventId,
    },
  });

  return updatedPhoto;
};

const deletePhoto = async (id: number) => {
  const existPhoto = await prisma.photo.findUnique({ where: { id } });
  if (!existPhoto) return null;

  const deletedPhoto = await prisma.photo.delete({ where: { id } });
  return deletedPhoto;
};

const getAllPhotosPhotographer = async (photographerId: number) => {
  const allPhotos = await prisma.photo.findMany({
    where: { photographerId },
    include: { event: true },
    orderBy: { id: "desc" },
  });
  return allPhotos;
};

export default {
  getAllPhotos,
  addPhoto,
  getPhoto,
  updatePhoto,
  deletePhoto,
  getAllPhotosPhotographer,
};
