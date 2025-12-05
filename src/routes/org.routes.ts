import { Router } from "express";
import { OrgController } from "../controllers/org.controller";
import upload from "../middlewares/fileUpload";
import { authMiddleware } from "../middlewares/authMiddleware";
import { auth } from "google-auth-library";

const router = Router();

router.get("/organizations/",  OrgController.getAllOrgs);
router.get("/organizations/:orgId",  OrgController.getOrgById);
router.put("/organizations/:orgId",  OrgController.updateOrg);
router.delete("/organizations/:orgId",  OrgController.deleteOrg);

export default router;
