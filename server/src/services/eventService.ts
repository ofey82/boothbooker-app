import { PrismaClient } from '@prisma/client';
import { Event, PublicEvent } from '../models/event';

const prisma = new PrismaClient();

export const createEvent = async (
  name: string,
  date: Date,
  local: string,
  description: string,
  creatorId: number,
  status: 'O' | 'C'
): Promise<PublicEvent> => {
  const event = await prisma.event.create({
    data: { name, date, local, description, creatorId, status },
    select: {
      id: true,
      name: true,
      date: true,
      local: true,
      description: true,
      creatorId: true,
      status: true,
    },
  });
  const availableBooths = await prisma.eventBooth.count({
    where: {
      eventId: event.id,
      status: 'A',
    },
  });
  return { ...event, availableBooths, status: event.status as 'O' | 'C' };
};

export const getAllEvents = async (): Promise<PublicEvent[]> => {
  const events = await prisma.event.findMany({
    select: {
      id: true,
      name: true,
      date: true,
      local: true,
      description: true,
      creatorId: true,
      status: true,
    },
  });
  const publicEvents = await Promise.all(
    events.map(async (event: any) => {
      const availableBooths = await prisma.eventBooth.count({
        where: {
          eventId: event.id,
          status: 'A',
        },
      });
      return { ...event, availableBooths, status: event.status as 'O' | 'C' };
    })
  );
  return publicEvents;
};

export const getEventById = async (id: number): Promise<PublicEvent | null> => {
  const event = await prisma.event.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      date: true,
      local: true,
      description: true,
      creatorId: true,
      status: true,
    },
  });
  if (!event) {
    return null;
  }
  const availableBooths = await prisma.eventBooth.count({
    where: {
      eventId: event.id,
      status: 'A',
    },
  });
  return { ...event, availableBooths, status: event.status as 'O' | 'C' };
};

export const getEventsByCreator = async (
  creatorId: number
): Promise<PublicEvent[]> => {
  const events = await prisma.event.findMany({
    where: { creatorId },
    select: {
      id: true,
      name: true,
      date: true,
      local: true,
      description: true,
      creatorId: true,
      status: true,
    },
  });
  const publicEvents = await Promise.all(
    events.map(async (event) => {
      const availableBooths = await prisma.eventBooth.count({
        where: {
          eventId: event.id,
          status: 'A',
        },
      });
      return { ...event, availableBooths, status: event.status as 'O' | 'C' };
    })
  );
  return publicEvents;
};

export const getEventsForUser = async (
  userId: number
): Promise<PublicEvent[]> => {
  const events = await prisma.event.findMany({
    where: {
      booths: {
        some: {
          exhibitorId: userId,
        },
      },
    },
    select: {
      id: true,
      name: true,
      date: true,
      local: true,
      description: true,
      creatorId: true,
      status: true,
    },
  });
  const publicEvents = await Promise.all(
    events.map(async (event) => {
      const availableBooths = await prisma.eventBooth.count({
        where: {
          eventId: event.id,
          status: 'A',
        },
      });
      return { ...event, availableBooths, status: event.status as 'O' | 'C' };
    })
  );
  return publicEvents;
};

export const updateEvent = async (
  id: number,
  data: Partial<Event>
): Promise<PublicEvent | null> => {
  const event = await prisma.event.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      date: true,
      local: true,
      description: true,
      creatorId: true,
      status: true,
    },
  });
  const availableBooths = await prisma.eventBooth.count({
    where: {
      eventId: event.id,
      status: 'A',
    },
  });
  return { ...event, availableBooths, status: event.status as 'O' | 'C' };
};

export const deleteEvent = async (id: number): Promise<PublicEvent | null> => {
  const event = await prisma.event.delete({
    where: { id },
    select: {
      id: true,
      name: true,
      date: true,
      local: true,
      description: true,
      creatorId: true,
      status: true,
    },
  });
  const availableBooths = await prisma.eventBooth.count({
    where: {
      eventId: event.id,
      status: 'A',
    },
  });
  return { ...event, availableBooths, status: event.status as 'O' | 'C' };
};
