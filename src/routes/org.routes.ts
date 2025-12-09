import { Router } from "express";
import { OrgController } from "../controllers/org.controller";
import upload from "../middlewares/fileUpload";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @route GET /api/v1/organizations
 * @desc  Get list of all organizations
 */
router.get("/organizations", OrgController.getAllOrgs);

/**
 * @route GET /api/v1/organizations/:orgId
 * @desc  Get details of a single organization by ID
 */
router.get("/organizations/:orgId", OrgController.getOrgById);

/**
 * @route PUT /api/v1/organizations/:orgId
 * @desc  Update organization details
 */
router.put("/organizations/:orgId", OrgController.updateOrg);

/**
 * @route DELETE /api/v1/organizations/:orgId
 * @desc  Delete an organization (soft delete or hard delete based on logic)
 */
router.delete("/organizations/:orgId", OrgController.deleteOrg);

export default router;
