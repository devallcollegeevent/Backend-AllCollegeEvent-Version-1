import { Request, Response, NextFunction } from "express";
import { EventService } from "../services/event.service";

export class EventController {
  static async getOrgEvents(req: Request, res: Response) {
    try {
      const identity = String(req.params.orgId);

      const events = await EventService.getEventsByOrg(identity);

      res.json({ status: true, data: events, message: "Events fetched" });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  }

  static async getEventById(req: Request, res: Response) {
    try {
      const { orgId, eventId } = req.params;

      const event = await EventService.getEventById(orgId, eventId);

      if (!event) {
        return res.status(404).json({
          status: false,
          message: "Event not found",
        });
      }

      res.json({ status: true, data: event, message: "event fetched" });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  }

  static async createEvent(req: Request, res: Response) {
    try {
      const { event_title, description, event_date, event_time, mode, venue } =
        req.body;

      const { orgId } = req.params;

      const image = req.file ? `/uploads/${req.file.filename}` : null;

      const event = await EventService.createEventService({
        org_id: orgId,
        event_title,
        description,
        event_date,
        event_time,
        mode,
        image,
        venue,
      });

      res
        .status(200)
        .json({ status: true, data: event, message: "event created" });
    } catch (err: any) {
      res.status(400).json({ status: false, message: err.message });
    }
  }

  static async updateEvent(req: Request, res: Response) {
    try {
      const { orgId, eventId } = req.params;
      const image = req.file ? `/uploads/${req.file.filename}` : undefined;

      const result = await EventService.updateEvent(orgId, eventId, {
        ...req.body,
        ...(image && { bannerImage: image }),
      });

      res.json({ status: true, data: result, message: "event updated" });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  }

  static async deleteEvent(req: Request, res: Response) {
    try {
      const { orgId, eventId } = req.params;

      const deleted = await EventService.deleteEvent(orgId, eventId);

      res.json({ status: true, data: deleted, message: "event deleted" });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  }

  static async getAllEvents(req: Request, res: Response) {
    try {
      const events = await EventService.getAllEventsService();
      res
        .status(200)
        .json({ status: true, data: events, message: "All events fetched" });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  }

  static async getSingleEvent(req: Request, res: Response) {
    try {
      const {eventId} = req.params
      const events = await EventService.getSingleEventsService(eventId);
      res
        .status(200)
        .json({ status: true, data: events, message: "Event fetched" });
    } catch (err: any) {
      res.status(500).json({ status: false, message: err.message });
    }
  }
}
