"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const prisma = require("../config/db.config");
class EventService {
    static async createEventService(data) {
        const event = await prisma.event.create({
            data: {
                org_id: data.org_id1,
                title: data.event_title,
                description: data.description,
                banner_image: data.image, // 🔥 Store the uploaded filename
                event_date: data.event_date,
                event_time: data.event_time,
                mode: data.mode,
                venue_name: data.venue,
            },
        });
        return event;
    }
}
exports.EventService = EventService;
