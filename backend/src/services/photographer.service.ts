import { PrismaClient } from "@prisma/client";
import { FileArray, UploadedFile } from "express-fileupload";
import fs from "fs-extra";

import { Photographer } from "../interfaces/photographer.interface.js";

import { encrypt } from "../utils/bcrypt.utils.js";
import { uploadImage } from "../utils/uploadImage.utils.js";

const prisma = new PrismaClient();

type fileUploadType = FileArray | undefined | null;

const getAllPhotographers = async () => {
  const allPhotographers = await prisma.photographer.findMany({
    include: { user: true },
    orderBy: { id: "desc" },
  });
  return allPhotographers;
};

const addPhotographer = async (
  photographer: Photographer,
  files: fileUploadType
) => {
  const existUser = await prisma.user.findUnique({
    where: { email: photographer.user.email },
  });
  if (existUser || !files || !files.image) return null;

  const { tempFilePath } = files.image as UploadedFile;
  const imageCloudinary = await uploadImage(tempFilePath, false);
  const imageSecureUrl = imageCloudinary.secure_url;
  const imagePublicId = imageCloudinary.public_id;
  await fs.unlink(tempFilePath); // deleted image of storage (uploads)

  const passwordHash = await encrypt(photographer.user.password);
  const newPhotographer = await prisma.user.create({
    data: {
      name: photographer.user.name,
      email: photographer.user.email,
      password: passwordHash,
      imageSecureUrl,
      imagePublicId,
      rolId: 3,
      photographer: {
        create: { rate: photographer.rate, type: photographer.type },
      },
    },
    include: { photographer: true },
  });

  return newPhotographer;
};

const getPhotographer = async (id: number) => {
  const photographer = await prisma.photographer.findUnique({
    where: { id },
    include: { user: true, eventPhotographer: true },
  });

  return photographer;
};

const updatePhotographer = async (
  id: number,
  phothographer: Photographer,
  files: fileUploadType
) => {
  const existPhotographer = await prisma.photographer.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!existPhotographer) return null;

  let imagePublicId = "";
  let imageSecureUrl = "";

  if (files?.image) {
    const { tempFilePath } = files.image as UploadedFile;
    const imageCloudinary = await uploadImage(tempFilePath, false);
    imageSecureUrl = imageCloudinary.secure_url;
    imagePublicId = imageCloudinary.public_id;
    await fs.unlink(tempFilePath); // deleted image of storage (uploads)
  }

  const updatedPhotographer = await prisma.photographer.update({
    where: { id },
    data: {
      portfolio: phothographer.portfolio,
      type: phothographer.type,
      experince: phothographer.experince,
      rate: phothographer.rate,
      specialty: phothographer.specialty,
      user: {
        update: {
          name: phothographer.user.name,
          email: phothographer.user.email,
          phone: phothographer.user.phone,
          address: phothographer.user.address,
          imageSecureUrl:
            imageSecureUrl != ""
              ? imageSecureUrl
              : existPhotographer.user.imageSecureUrl,
          imagePublicId:
            imagePublicId != ""
              ? imagePublicId
              : existPhotographer.user.imagePublicId,
        },
      },
    },
    include: { user: true },
  });

  return updatedPhotographer;
};

const deletePhotographer = async (id: number) => {
  const existPhotographer = await prisma.photographer.findUnique({
    where: { id },
  });
  if (!existPhotographer) return null;

  const deletedPhotographer = await prisma.photographer.delete({
    where: { id },
  });

  return deletedPhotographer;
};

export default {
  getAllPhotographers,
  addPhotographer,
  getPhotographer,
  updatePhotographer,
  deletePhotographer,
};
