const prisma = require("../config/db.config");

export class EventService {
  static async createEventService(data: {
    org_id1: number;
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
