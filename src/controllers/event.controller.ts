import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { EventService } from "../services/event.service";

export class EventController {
  static async createEvent(req: Request, res: Response) {
    try {
      const {
        org_id,
        event_title,
        description,
        event_date,
        event_time,
        mode,
        venue,
      } = req.body;

      const org_id1 = Number(org_id);

      // 🔥 Get uploaded file name from Multer
      const image = req.file ? req.file.filename : null;

      const event = await EventService.createEventService({
        org_id1,
        event_title,
        description,
        event_date,
        event_time,
        mode,
        image,
        venue,
      });

      res.status(200).json({ success: true, event });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}
