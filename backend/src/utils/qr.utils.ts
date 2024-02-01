import QRCode from "qrcode";
import { IEvent } from "../interfaces/event.interface.js";

const generateQR = async (dataEvent: IEvent) => {
  const dateAndTime = new Date(dataEvent.dateTime).toLocaleString("es", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Nota: algunos lectores de qr no reconocen caracteres con tilde
  const planeText = `Titulo: ${dataEvent.title}\n
  Descripcion: ${dataEvent.description}\n
  Fecha: ${dateAndTime}\n
  Ubicacion: ${dataEvent.location}`;

  const qrUrl = await QRCode.toDataURL(planeText);

  return qrUrl;
};

export { generateQR };
