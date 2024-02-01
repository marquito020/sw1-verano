import { PrismaClient } from "@prisma/client";

import { IEvent } from "../interfaces/event.interface.js";
import { transport } from "../config/nodemailer.js";

import { generateQR } from "../utils/qr.utils.js";
import { findClientsOfTheEvent } from "../utils/findClients.utils.js";
import { htmlTemplateEvent } from "../utils/htmlTemplate.utils.js";

import "dotenv/config";

const prisma = new PrismaClient();

const getAllEvents = async () => {
  const allEvents = await prisma.event.findMany({
    orderBy: { id: "desc" },
  });
  return allEvents;
};

const addEvent = async (dataEvent: IEvent) => {
  const organizerFound = await prisma.organizer.findUnique({
    where: { id: dataEvent.organizerId },
  });
  if (!organizerFound) return null;

  const clientsFound = await findClientsOfTheEvent(dataEvent.invitations);
  const qrUrl = await generateQR(dataEvent);

  const newEvent = await prisma.event.create({
    data: {
      title: dataEvent.title,
      description: dataEvent.description,
      organizerId: organizerFound.id,
      location: dataEvent.location,
      dateTime: dataEvent.dateTime,
      qr: qrUrl,
      eventPhotographer: { createMany: { data: dataEvent.photographers } },
      invitation: { createMany: { data: dataEvent.invitations } },
      eventClient: { createMany: { data: clientsFound } },
    },
  });

  const toEmails = dataEvent.invitations.map((invitation) => invitation.email);

  const APIFront = process.env.API_FRONT || "";

  const urlFront = `${APIFront}/private/invitation/${newEvent.id}`;

  // toEmails: ["example@gmail.com", "example2@gmail.com"]
  const info = await transport.sendMail({
    from: '"Marco David Toledo 🌀" <marcotoledo@midominio.com>',
    to: toEmails,
    subject: `Felcidades has sido invitado al evento: ${dataEvent.title}`,
    html: htmlTemplateEvent({
      title: newEvent.title,
      description: newEvent.description,
      dateTime: newEvent.dateTime,
      location: newEvent.location,
      qr: newEvent.qr,
    }, urlFront),
    attachments: [{ filename: `QR-${newEvent.title}`, path: `${newEvent.qr}` }],
  });

  console.log(info.messageId);

  return newEvent;
};

const getEvent = async (id: number) => {
  const event = await prisma.event.findUnique({
    where: { id },
    include: { photos: true },
  });
  if (!event) return null;

  return event;
};

const updateEvent = async (id: number, dataEvent: Partial<IEvent>) => {
  const existEvent = await prisma.event.findUnique({ where: { id } });
  if (!existEvent) return null;

  const updatedEvent = await prisma.event.update({
    where: { id },
    data: {
      title: dataEvent.title,
      description: dataEvent.description,
      dateTime: dataEvent.dateTime,
      location: dataEvent.location,
    },
  });

  return updatedEvent;
};

const deleteEvent = async (id: number) => {
  const existEvent = await prisma.event.findUnique({ where: { id } });
  if (!existEvent) return null;

  const deletedEvent = await prisma.event.delete({ where: { id } });
  return deletedEvent;
};

/// Obtiene todos los eventos (con sus fotos) del organizador
const getAllEventsOrganizer = async (organizerId: number) => {
  const allEvents = await prisma.event.findMany({
    where: { organizerId },
    // include: { photos: true },
  });

  return allEvents;
};

export default {
  getAllEvents,
  addEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  getAllEventsOrganizer,
};

// const htmlData = `
//   <div>
//     <h2>Informacion del evento</h2>
//     <p><strong>Titulo:</strong> ${data.title}</p>
//     <p><strong>Descripcion:</strong> ${data.description}</p>
//     <p><strong>Ubicacion:</strong> ${data.location}</p>
//     <p><strong>Fecha y Hora:</strong> ${data.dateTime}</p>
//   </div>
// `;

// const vCardData = `BEGIN:VCARD
// VERSION:3.0
// N:${data.title};;;
// FN:${data.title}
// EMAIL:${data.location}
// TEL:${data.description}
// END:VCARD`;
