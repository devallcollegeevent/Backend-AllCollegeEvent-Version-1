"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const event_service_1 = require("../services/event.service");
class EventController {
    static async getOrgEvents(req, res) {
        try {
            const identity = String(req.params.orgId);
            const events = await event_service_1.EventService.getEventsByOrg(identity);
            res.json({ status: true, data: events, message: "Events fetched" });
        }
        catch (err) {
            res.status(500).json({ status: false, message: err.message });
        }
    }
    static async getEventById(req, res) {
        try {
            const { orgId, eventId } = req.params;
            const event = await event_service_1.EventService.getEventById(orgId, eventId);
            if (!event) {
                return res.status(404).json({
                    status: false,
                    message: "Event not found",
                });
            }
            res.json({ status: true, data: event, message: "event fetched" });
        }
        catch (err) {
            res.status(500).json({ status: false, message: err.message });
        }
    }
    static async createEvent(req, res) {
        try {
            const { event_title, description, event_date, event_time, mode, venue } = req.body;
            const { orgId } = req.params;
            const image = req.file ? `/uploads/${req.file.filename}` : null;
            const event = await event_service_1.EventService.createEventService({
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
        }
        catch (err) {
            res.status(400).json({ status: false, message: err.message });
        }
    }
    static async updateEvent(req, res) {
        try {
            const { orgId, eventId } = req.params;
            const image = req.file ? `/uploads/${req.file.filename}` : undefined;
            const result = await event_service_1.EventService.updateEvent(orgId, eventId, {
                ...req.body,
                ...(image && { bannerImage: image }),
            });
            res.json({ status: true, data: result, message: "event updated" });
        }
        catch (err) {
            res.status(500).json({ status: false, message: err.message });
        }
    }
    static async deleteEvent(req, res) {
        try {
            const { orgId, eventId } = req.params;
            const deleted = await event_service_1.EventService.deleteEvent(orgId, eventId);
            res.json({ status: true, data: deleted, message: "event deleted" });
        }
        catch (err) {
            res.status(500).json({ status: false, message: err.message });
        }
    }
    static async getAllEvents(req, res) {
        try {
            const events = await event_service_1.EventService.getAllEventsService();
            res
                .status(200)
                .json({ status: true, data: events, message: "All events fetched" });
        }
        catch (err) {
            res.status(500).json({ status: false, message: err.message });
        }
    }
    static async getSingleEvent(req, res) {
        try {
            const { eventId } = req.params;
            const events = await event_service_1.EventService.getSingleEventsService(eventId);
            res
                .status(200)
                .json({ status: true, data: events, message: "Event fetched" });
        }
        catch (err) {
            res.status(500).json({ status: false, message: err.message });
        }
    }
}
exports.EventController = EventController;
