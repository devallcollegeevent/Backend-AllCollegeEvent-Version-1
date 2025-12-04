"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const prisma = require("../config/db.config");
class EventService {
    static async createEventService(data) {
        const event = await prisma.event.create({
            data: {
                orgIdentity: data.org_id,
                title: data.event_title,
                description: data.description,
                bannerImage: data.image,
                eventDate: data.event_date,
                eventTime: data.event_time,
                mode: data.mode,
                venue: data.venue,
            },
        });
        return event;
    }
    static async getAllEventsService() {
        return await prisma.event.findMany({
            orderBy: { createdBy: "desc" },
        });
    }
    static async getEventByIdService(id) {
        console.log(id);
        return await prisma.event.findUnique({
            where: { identity: id },
        });
    }
    static async updateEventService(id, data) {
        return await prisma.event.update({
            where: { identity: id },
            data: {
                title: data.event_title,
                description: data.description,
                bannerImage: data.image ?? undefined,
                eventDate: data.event_date,
                eventTime: data.event_time,
                mode: data.mode,
                venue: data.venue,
            },
        });
    }
    static async deleteEventService(id) {
        return await prisma.event.delete({
            where: { identity: id },
        });
    }
}
exports.EventService = EventService;
