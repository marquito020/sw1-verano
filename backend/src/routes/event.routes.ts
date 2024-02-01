import { Router } from "express";
import EventController from "../controllers/event.controller.js";

const router = Router();

router.get("/events", EventController.getAllEvents);

router.post("/events", EventController.addEvent);

router.get("/events/:id", EventController.getEvent);

router.put("/events/:id", EventController.updateEvent);

router.delete("/events/:id", EventController.deleteEvent);

router.get(
  "/events/organizer/:organizerId",
  EventController.getAllEventsOrganizer
);

export default router;
