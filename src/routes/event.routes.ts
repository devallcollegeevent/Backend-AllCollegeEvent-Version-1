import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { EventController } from "../controllers/event.controller";
import upload from "../middlewares/fileUpload";

const router = Router();

router.get("/organizations/:orgId/events", EventController.getOrgEvents);
router.get("/organizations/:orgId/events/:eventId", EventController.getEventById);
router.post(
  "/organizations/:orgId/events",
  upload.single("image"),
  EventController.createEvent
);
router.put(
  "/organizations/:orgId/events/:eventId",
  upload.single("image"),
  EventController.updateEvent
);
router.delete("/organizations/:orgId/events/:eventId", EventController.deleteEvent);

// Public API
router.get("/events", EventController.getAllEvents);
router.get("/events/:eventId",EventController.getSingleEvent)

export default router;
