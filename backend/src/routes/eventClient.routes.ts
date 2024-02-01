import { Router } from "express";
import EventClientController from "../controllers/eventClient.controller.js";

const router = Router();

router.get("/event-client/:clientId", EventClientController.getEventsClient);

export default router;
