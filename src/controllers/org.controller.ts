import { Request, Response, NextFunction } from "express";
import { OrgService } from "../services/org.service";

export class OrgController {
  static async getAllOrgs(req: Request, res: Response) {
    try {
      const data = await OrgService.getAllOrgs();
      res.json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getOrgById(req: Request, res: Response) {
    try {
      const identity = req.params.orgId;
      const data = await OrgService.getOrgById(identity);

      if (!data) {
        return res
          .status(404)
          .json({ success: false, message: "Organization not found" });
      }

      res.json({ success: true, data });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async updateOrg(req: Request, res: Response) {
    try {
      const identity = req.params.orgId;
      const updatedData = req.body;

      const result = await OrgService.updateOrg(identity, updatedData);
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async deleteOrg(req: Request, res: Response) {
    try {
      const identity = req.params.orgId;

      const result = await OrgService.deleteOrg(identity);
      res.json({ success: true, message: "Organization deleted", result });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}
