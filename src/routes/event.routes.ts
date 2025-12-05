import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { EventController } from "../controllers/event.controller";
import upload from "../middlewares/fileUpload";

const router = Router();

router.get("/:orgId/events", EventController.getOrgEvents);
router.get(
  "/:orgId/events/:eventId",
  EventController.getEventById
);
router.post(
  "/:orgId/events",
  upload.single("image"),
  EventController.createEvent
);
router.put(
  "/:orgId/events/:eventId",
  upload.single("image"),
  EventController.updateEvent
);
router.delete(
  "/:orgId/events/:eventId",
  EventController.deleteEvent
);

router.get("/eve", authMiddleware, EventController.getAllEvents);

export default router;
