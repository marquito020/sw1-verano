import { Request, Response } from "express";
import EventClientService from "../services/eventClient.service.js";

const getEventsClient = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    // console.log("client id ", clientId);
    const eventsClient = await EventClientService.getEventsClient(
      parseInt(clientId)
    );

    if (!eventsClient)
      return res.status(400).json({ message: "Usted no es un cliente" });

    return res.status(200).json(eventsClient);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default { getEventsClient };
