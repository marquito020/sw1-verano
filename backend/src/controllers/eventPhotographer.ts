import { Request, Response } from "express";
import EventPhotographerService from "../services/eventPhotographer.service.js";

const getEvents = async (req: Request, res: Response) => {
  try {
    const { photographerId } = req.params;
    const events = await EventPhotographerService.getEvents(
      parseInt(`${photographerId}`)
    );
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getPhotographers = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const photographers = await EventPhotographerService.getPhotographers(
      parseInt(`${eventId}`)
    );
    return res.status(200).json(photographers);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default { getEvents, getPhotographers };
