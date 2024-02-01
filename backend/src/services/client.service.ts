import { PrismaClient } from "@prisma/client";
import { FileArray, UploadedFile } from "express-fileupload";
import fs from "fs-extra";

import { Client } from "../interfaces/client.interface.js";

import { encrypt } from "../utils/bcrypt.utils.js";
import { uploadImage } from "../utils/uploadImage.utils.js";
import { Invitation } from "../interfaces/invitation.interface.js";

const prisma = new PrismaClient();

type fileUploadType = FileArray | undefined | null;

const getAllClients = async () => {
  const allClients = await prisma.client.findMany({
    include: { user: true },
    orderBy: { id: "desc" },
  });
  return allClients;
};

const addClient = async (client: Client, files: fileUploadType) => {
  const existUser = await prisma.user.findUnique({
    where: { email: client.user.email },
  });

  if (existUser || !files || !files.image) return null;

  const { tempFilePath } = files.image as UploadedFile;
  const imageCloudinary = await uploadImage(tempFilePath, false);
  const imageSecureUrl = imageCloudinary.secure_url;
  const imagePublicId = imageCloudinary.public_id;
  await fs.unlink(tempFilePath); // deleted image of storage (uploads)

  const passwordHash = await encrypt(client.user.password);
  const newClient = await prisma.user.create({
    data: {
      name: client.user.name,
      email: client.user.email,
      password: passwordHash,
      imageSecureUrl,
      imagePublicId,
      rolId: 4,
      client: { create: {} },
    },
    include: { client: true },
  });

  const invitations = await prisma.invitation.findMany({
    where: { email: newClient.email },
  });
  const newEventsClient = invitations.map((invitation: any) => ({
    eventId: invitation.eventId,
    clientId: newClient.client!.id,
  }));

  // relaciona al cliente con sus eventos en los que fue invitado
  await prisma.eventClient.createMany({
    data: newEventsClient,
  });

  return newClient;
};

const getClient = async (id: number) => {
  const client = await prisma.client.findUnique({
    where: { id },
    include: { user: true },
  });
  return client;
};

const updateClient = async (
  id: number,
  client: Client,
  files: fileUploadType
) => {
  const existClient = await prisma.client.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!existClient) return null;

  let imagePublicId = "";
  let imageSecureUrl = "";

  if (files?.image) {
    const { tempFilePath } = files.image as UploadedFile;
    const imageCloudinary = await uploadImage(tempFilePath, false);
    imageSecureUrl = imageCloudinary.secure_url;
    imagePublicId = imageCloudinary.public_id;
    await fs.unlink(tempFilePath); // deleted image of storage (uploads)
  }

  const updatedClient = await prisma.client.update({
    where: { id },
    data: {
      user: {
        update: {
          name: client.user.name,
          email: client.user.email,
          phone: client.user.phone,
          address: client.user.address,
          imageSecureUrl:
            imageSecureUrl != ""
              ? imageSecureUrl
              : existClient.user.imageSecureUrl,
          imagePublicId:
            imagePublicId != ""
              ? imagePublicId
              : existClient.user.imagePublicId,
        },
      },
    },
    include: { user: true },
  });

  return updatedClient;
};

const deleteClient = async (id: number) => {
  const existClient = await prisma.client.findUnique({ where: { id } });
  if (!existClient) return null;

  const clientFound = await prisma.client.delete({ where: { id } });
  await prisma.user.delete({
    where: { id: clientFound.userId },
  });

  return clientFound;
};

export default {
  getAllClients,
  addClient,
  getClient,
  updateClient,
  deleteClient,
};
