import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtiene todos los eventos en que participo el fotografo
const getEvents = async (photographerId: number) => {
  const allEvents = await prisma.eventPhotographer.findMany({
    where: { photographerId },
    include: { event: true },
  });
  return allEvents;
};

// Obtiene todos los fotografos que participaron en ese evento
const getPhotographers = async (eventId: number) => {
  const allPhotographers = await prisma.eventPhotographer.findMany({
    where: { eventId },
    include: { photographer: true },
  });
  return allPhotographers;
};

export default { getEvents, getPhotographers };
