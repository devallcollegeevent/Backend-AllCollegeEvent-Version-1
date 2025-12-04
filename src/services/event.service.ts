const prisma = require("../config/db.config");

export class EventService {
  static async createEventService(data: {
    org_id: number;
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

  static async getAllEventsService() {
    return await prisma.event.findMany({
      orderBy: { createdBy: "desc" },
    });
  }

  static async getEventByIdService(id: String) {
    console.log(id);
    
    return await prisma.event.findUnique({
      where: { identity: id },
    });
  }

  static async updateEventService(
    id: number,
    data: {
      event_title?: string;
      description?: string;
      event_date?: string;
      event_time?: string;
      mode?: string;
      image?: string | null;
      venue?: string;
    }
  ) {
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

  static async deleteEventService(id: String) {
    return await prisma.event.delete({
      where: { identity: id },
    });
  }
}
