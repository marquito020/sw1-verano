import { PrismaClient } from "@prisma/client";
import { FileArray, UploadedFile } from "express-fileupload";
import fs from "fs-extra";

import { Organizer } from "../interfaces/organizer.interface.js";

import { uploadImage } from "../utils/uploadImage.utils.js";
import { encrypt } from "../utils/bcrypt.utils.js";

const prisma = new PrismaClient();

type fileUploadType = FileArray | undefined | null;

const getAllOrganizers = async () => {
  const allOrganizers = await prisma.organizer.findMany({
    include: { user: true },
    orderBy: { id: "desc" },
  });
  return allOrganizers;
};

const addOrganizer = async (organizer: Organizer, files: fileUploadType) => {
  const existUser = await prisma.user.findUnique({
    where: { email: organizer.user.email },
  });
  if (existUser || !files || !files.image) return null;

  const { tempFilePath } = files.image as UploadedFile;
  const imageCloudinary = await uploadImage(tempFilePath, false);
  const imageSecureUrl = imageCloudinary.secure_url;
  const imagePublicId = imageCloudinary.public_id;
  await fs.unlink(tempFilePath); // deleted image of storage (uploads)

  const passwordHash = await encrypt(organizer.user.password);
  const newOrganizer = prisma.user.create({
    data: {
      name: organizer.user.name,
      email: organizer.user.email,
      password: passwordHash,
      imageSecureUrl,
      imagePublicId,
      rolId: 2,
      organizer: { create: { webSite: organizer.webSite } },
    },
    include: { organizer: true },
  });

  return newOrganizer;
};

const getOrganizer = async (id: number) => {
  const organizer = await prisma.organizer.findUnique({
    where: { id },
    include: { user: true },
  });
  return organizer;
};

const updateOrganizer = async (
  id: number,
  organizer: Organizer,
  files: fileUploadType
) => {
  const existOrganizer = await prisma.organizer.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!existOrganizer) return null;

  let imagePublicId = "";
  let imageSecureUrl = "";

  if (files?.image) {
    const { tempFilePath } = files.image as UploadedFile;
    const imageCloudinary = await uploadImage(tempFilePath, false);
    imageSecureUrl = imageCloudinary.secure_url;
    imagePublicId = imageCloudinary.public_id;
    await fs.unlink(tempFilePath); // deleted image of storage (uploads)
  }

  const updatedOrganizer = await prisma.organizer.update({
    where: { id },
    data: {
      webSite: organizer.webSite,
      user: {
        update: {
          name: organizer.user.name,
          email: organizer.user.email,
          phone: organizer.user.phone,
          address: organizer.user.address,
          imageSecureUrl:
            imageSecureUrl != ""
              ? imageSecureUrl
              : existOrganizer.user.imageSecureUrl,
          imagePublicId:
            imagePublicId != ""
              ? imagePublicId
              : existOrganizer.user.imagePublicId,
        },
      },
    },
    include: { user: true },
  });

  return updatedOrganizer;
};

const deleteOrganizer = async (id: number) => {
  const existOrganizer = await prisma.organizer.findUnique({ where: { id } });
  if (!existOrganizer) return null;

  const organizerFound = await prisma.organizer.delete({ where: { id } });
  await prisma.user.delete({
    where: { id: organizerFound.userId },
  });

  return organizerFound;
};

export default {
  getAllOrganizers,
  addOrganizer,
  getOrganizer,
  updateOrganizer,
  deleteOrganizer,
};
