import { Router } from "express";
import EventPhotographerController from "../controllers/eventPhotographer.js";

const router = Router();

router.get(
  "/photographer-event/:photographerId",
  EventPhotographerController.getEvents
);

router.get(
  "/event-photographer/:eventId",
  EventPhotographerController.getPhotographers
);

export default router;
