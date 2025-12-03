"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const event_service_1 = require("../services/event.service");
class EventController {
    static async createEvent(req, res) {
        try {
            const { org_id, event_title, description, event_date, event_time, mode, venue, } = req.body;
            const org_id1 = Number(org_id);
            // 🔥 Get uploaded file name from Multer
            const image = req.file ? req.file.filename : null;
            const event = await event_service_1.EventService.createEventService({
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
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
}
exports.EventController = EventController;
