import { Request, Response, NextFunction } from "express";
import { OrgService } from "../services/org.service";

export class OrgController {
  static async getAllOrgs(req: Request, res: Response) {
    try {
      const data = await OrgService.getAllOrgs();
      res.json({ status: true, data, message: "All Organizarion" });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  }

  static async getOrgById(req: Request, res: Response) {
    try {
      const identity = req.params.orgId;
      const data = await OrgService.getOrgById(identity);

      if (!data) {
        return res
          .status(404)
          .json({ status: false, message: "Organization not found" });
      }

      res.json({ status: true, data, message: "organization fetched" });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  }

  static async updateOrg(req: Request, res: Response) {
    try {
      const identity = req.params.orgId;
      const updatedData = req.body;

      const result = await OrgService.updateOrg(identity, updatedData);
      res.json({ status: true, data: result, message:"organization updated" });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  }

  static async deleteOrg(req: Request, res: Response) {
    try {
      const identity = req.params.orgId;

      const result = await OrgService.deleteOrg(identity);
      res.json({ status: true, message: "Organization deleted", data:result });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  }
}
