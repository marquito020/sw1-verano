import { PrismaClient } from "@prisma/client";

import { Invitation } from "../interfaces/invitation.interface.js";

const prisma = new PrismaClient();

const findClientsOfTheEvent = async (invitations: Invitation[]) => {
  // si algun email de las invitaciones pertenece a algun usuario-cliente,
  //  este se debera adicicionar a "EventClient"

  // [ {id: 1}, {id: 2} ]
  const clientsFound = await prisma.client.findMany({
    where: { user: { OR: invitations } },
    select: { id: true },
  });

  // [ {clientId: 1}, {cliendId: 2} ]
  const eventsClients = clientsFound.map((client: { id: any; }) => ({
    clientId: client.id,
  }));

  return eventsClients;
};

export { findClientsOfTheEvent };
