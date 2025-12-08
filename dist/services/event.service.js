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
    static async getEventById(orgId, eventId) {
        const BASE_URL = process.env.BASE_URL ?? "";
        const event = await prisma.event.findFirst({
            where: {
                identity: eventId,
                orgIdentity: orgId,
            },
            include: {
                org: {
                    select: {
                        organizationName: true,
                    },
                },
            },
        });
        if (!event)
            return null;
        return {
            ...event,
            bannerImage: event.bannerImage ? `${BASE_URL}${event.bannerImage}` : null,
        };
    }
    static async updateEvent(orgId, eventId, data) {
        return prisma.event.update({
            where: { identity: eventId, orgIdentity: orgId },
            data: {
                title: data.event_title,
                description: data.description,
                bannerImage: data.bannerImage ?? undefined,
                venueName: data.venueName ?? undefined,
                mode: data.mode,
                eventDate: data.event_date,
                eventTime: data.event_time,
                venue: data.venue,
                updatedAt: new Date(),
            },
        });
    }
    static async deleteEvent(orgId, eventId) {
        return prisma.event.deleteMany({
            where: {
                identity: eventId,
                orgIdentity: orgId,
            },
        });
    }
    static async getEventsByOrg(identity) {
        const BASE_URL = process.env.BASE_URL ?? "";
        const events = await prisma.event.findMany({
            where: {
                orgIdentity: identity,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                org: {
                    select: {
                        organizationName: true,
                    },
                },
            },
        });
        return events.map((event) => ({
            ...event,
            bannerImage: event.bannerImage ? `${BASE_URL}${event.bannerImage}` : null,
        }));
    }
    static async getAllEventsService() {
        const BASE_URL = process.env.BASE_URL ?? "";
        const rawEvents = await prisma.event.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                org: {
                    select: {
                        organizationName: true,
                    },
                },
            },
        });
        const events = rawEvents.map((e) => ({
            ...e,
            bannerImage: e.bannerImage ? `${BASE_URL}${e.bannerImage}` : null,
        }));
        return events;
    }
    static async getSingleEventsService(eventId) {
        const BASE_URL = process.env.BASE_URL ?? "";
        const rawEvent = await prisma.event.findUnique({
            where: { identity: eventId },
            include: {
                org: {
                    select: {
                        organizationName: true,
                    },
                },
            },
        });
        if (!rawEvent)
            return null;
        const event = {
            ...rawEvent,
            bannerImage: rawEvent.bannerImage
                ? `${BASE_URL}${rawEvent.bannerImage}`
                : null,
        };
        return event;
    }
}
exports.EventService = EventService;
