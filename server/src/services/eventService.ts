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
  return event as PublicEvent;
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
  return events.map((event: any) => ({
    ...event,
    status: event.status as 'O' | 'C',
  }));
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
  return event ? { ...event, status: event.status as 'O' | 'C' } : null;
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
  return events.map((event: any) => ({
    ...event,
    status: event.status as 'O' | 'C',
  }));
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
  return event ? { ...event, status: event.status as 'O' | 'C' } : null;
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
  return event ? { ...event, status: event.status as 'O' | 'C' } : null;
};
