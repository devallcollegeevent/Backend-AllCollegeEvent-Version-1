const prisma = require("../config/db.config");
import { EventType } from "../types/event.type";

export class EventService {
  static async createEventService(data: {
    org_id: String;
    event_title: string;
    description?: string;
    event_date: string;
    event_time: string;
    mode: string;
    image: string | null;
    venue: string;
  }) {
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

  static async getAllEventsService(): Promise<EventType[]> {
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

    const events: EventType[] = rawEvents.map((e: EventType) => ({
      ...e,
      bannerImage: e.bannerImage ? `${BASE_URL}${e.bannerImage}` : null,
    }));

    return events;
  }

  static async getEventById(
    orgId: string,
    eventId: string
  ): Promise<EventType | null> {
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

    if (!event) return null;

    return {
      ...event,
      bannerImage: event.bannerImage ? `${BASE_URL}${event.bannerImage}` : null,
    };
  }

  static async updateEvent(orgId: string, eventId: string, data: any) {
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

  static async deleteEvent(orgId: string, eventId: string) {
    return prisma.event.deleteMany({
      where: {
        identity: eventId,
        orgIdentity: orgId,
      },
    });
  }

  static async getEventsByOrg(identity: string): Promise<EventType[]> {
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

    return events.map((event: EventType) => ({
      ...event,
      bannerImage: event.bannerImage ? `${BASE_URL}${event.bannerImage}` : null,
    }));
  }
}
