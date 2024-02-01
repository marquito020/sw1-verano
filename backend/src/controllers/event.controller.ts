import { Request, Response } from "express";
import EventService from "../services/event.service.js";

const getAllEvents = async (req: Request, res: Response) => {
  try {
    const allEvents = await EventService.getAllEvents();
    return res.status(200).json(allEvents);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const addEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      location,
      dateTime,
      photographers,
      organizerId,
      invitations,
    } = req.body;
    const newEvent = await EventService.addEvent({
      title,
      description,
      location,
      dateTime,
      photographers,
      organizerId,
      invitations,
    });

    if (!newEvent)
      return res.status(400).json({ message: "No eres un organizador" });

    return res.status(201).json(newEvent);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const getEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await EventService.getEvent(parseInt(id));
    if (!event) return res.status(400).json({ message: "event not exist" });

    return res.status(200).json(event);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedEvent = await EventService.updateEvent(parseInt(id), req.body);

    if (!updatedEvent)
      return res.status(400).json({ message: "event not exist" });

    return res.status(200).json(updatedEvent);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedEvent = await EventService.deleteEvent(parseInt(id));

    if (!deletedEvent)
      return res.status(400).json({ message: "event not exist" });

    return res.status(200).json(deletedEvent);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

const getAllEventsOrganizer = async (req: Request, res: Response) => {
  try {
    const { organizerId } = req.params;
    const allEventsOrganizer = await EventService.getAllEventsOrganizer(
      parseInt(`${organizerId}`)
    );

    return res.status(200).json(allEventsOrganizer);
  } catch (error) {
    console.log("ERROR SERVER!", error);
    return res.status(500).json(error);
  }
};

export default {
  getAllEvents,
  addEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  getAllEventsOrganizer,
};
