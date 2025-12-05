import { Router } from "express";
import { OrgController } from "../controllers/org.controller";
import upload from "../middlewares/fileUpload";
import { authMiddleware } from "../middlewares/authMiddleware";
import { auth } from "google-auth-library";

const router = Router();

// Events & Org
router.post("/eve/create", authMiddleware,upload.single("image"), OrgController.createEvent);
router.get("/eve", authMiddleware, OrgController.getAllEvents);

router.get("/", authMiddleware, OrgController.getAllOrgs);
router.get("/:id", authMiddleware, OrgController.getOrgById);
router.put("/:id", authMiddleware, OrgController.updateOrg);
router.delete("/:id", authMiddleware, OrgController.deleteOrg);

router.get("/:id/eve", authMiddleware, OrgController.getOrgEvents);
router.get("/:orgId/eve/:eventId", authMiddleware, OrgController.getEventById);
router.put(
  "/:orgId/eve/:eventId",
  authMiddleware,
  upload.single("image"),
  OrgController.updateEvent
);
router.delete(
  "/:orgId/eve/:eventId",
  authMiddleware,
  OrgController.deleteEvent
);

export default router;
