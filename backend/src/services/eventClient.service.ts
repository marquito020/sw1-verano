import { PrismaClient } from "@prisma/client";

import { thereIsFaceMatches } from "../utils/faceMatches.js";

const prisma = new PrismaClient();

const getEventsClient = async (clientId: number) => {
  const existClient = await prisma.client.findUnique({
    where: { id: clientId },
    include: { user: true },
  });
  if (!existClient) return [];

  const userImage = existClient.user.imageSecureUrl; // imagen de perfil del usuario

  const eventsClientFound = await prisma.eventClient.findMany({
    where: { clientId },
    include: { event: { include: { photos: true } } },
  });

  const eventsClient = await Promise.all(
    eventsClientFound.map(async (element: any) => {
      //
      const photos = await Promise.all(
        element.event.photos.map(async (photo: any) => {
          //si la foto es publica no se realiza la coicidencia facial
          if (photo.isPublic) {
            return photo;
          }

          // verifica si el rostro del usuario esta en la imagen
          const thereIsCoicidence = await thereIsFaceMatches(
            userImage,
            photo.imageUrl
          );

          return thereIsCoicidence ? photo : null;
        })
      );

      // como la variable photos devulve (Photo | null)[] debo elimar los
      // elementos que sean null
      const eventPhotos = photos.filter((element) => element !== null);

      // Es el formato de la data que voy a enviar como respuesta a mi frontend
      const data = {
        id: element.id,
        eventId: element.eventId,
        clientId: element.clientId,
        event: {
          id: element.event.id,
          title: element.event.title,
          photos: eventPhotos,
        },
      };

      return data;
    })
  );

  // console.log("Eventos y fotos: ", eventsClient);
  // console.log("Response", eventsClientFound);

  return eventsClient;
};

export default { getEventsClient };
