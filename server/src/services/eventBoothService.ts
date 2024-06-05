import { PrismaClient } from '@prisma/client';
import { EventBooth, PublicEventBooth } from '../models/eventBooth';

const prisma = new PrismaClient();

export const createEventBooth = async (
  eventId: number,
  name: string,
  size: string,
  price: number,
  status: 'A' | 'B',
  exhibitorId?: number | null
): Promise<PublicEventBooth> => {
  const eventBooth = await prisma.eventBooth.create({
    data: { eventId, name, size, price, status, exhibitorId },
    select: {
      id: true,
      eventId: true,
      name: true,
      size: true,
      price: true,
      status: true,
      exhibitorId: true,
    },
  });
  return eventBooth as PublicEventBooth;
};

export const getAllEventBooths = async (): Promise<PublicEventBooth[]> => {
  const eventBooths = await prisma.eventBooth.findMany({
    select: {
      id: true,
      eventId: true,
      name: true,
      size: true,
      price: true,
      status: true,
      exhibitorId: true,
    },
  });
  return eventBooths.map((booth: any) => ({
    ...booth,
    status: booth.status as 'A' | 'B',
  }));
};

export const getEventBoothById = async (
  id: number
): Promise<PublicEventBooth | null> => {
  const eventBooth = await prisma.eventBooth.findUnique({
    where: { id },
    select: {
      id: true,
      eventId: true,
      name: true,
      size: true,
      price: true,
      status: true,
      exhibitorId: true,
    },
  });
  return eventBooth
    ? { ...eventBooth, status: eventBooth.status as 'A' | 'B' }
    : null;
};

export const getEventBoothsByEventId = async (
  eventId: number
): Promise<PublicEventBooth[]> => {
  const eventBooths = await prisma.eventBooth.findMany({
    where: { eventId },
    select: {
      id: true,
      eventId: true,
      name: true,
      size: true,
      price: true,
      status: true,
      exhibitorId: true,
    },
  });
  return eventBooths.map((booth: any) => ({
    ...booth,
    status: booth.status as 'A' | 'B',
  }));
};

export const getEventBoothsByStatus = async (
  status: 'A' | 'B'
): Promise<PublicEventBooth[]> => {
  const eventBooths: {
    id: number;
    eventId: number;
    name: string;
    size: string;
    price: number;
    status: string;
    exhibitorId: number | null;
  }[] = await prisma.eventBooth.findMany({
    where: { status },
    select: {
      id: true,
      eventId: true,
      name: true,
      size: true,
      price: true,
      status: true,
      exhibitorId: true,
    },
  });

  return eventBooths.map((booth) => ({
    ...booth,
    status: booth.status as 'A' | 'B',
  }));
};

export const getEventBoothsByExhibitor = async (
  exhibitorId: number
): Promise<PublicEventBooth[]> => {
  const eventBooths: {
    id: number;
    eventId: number;
    name: string;
    size: string;
    price: number;
    status: string;
    exhibitorId: number | null;
  }[] = await prisma.eventBooth.findMany({
    where: { exhibitorId },
    select: {
      id: true,
      eventId: true,
      name: true,
      size: true,
      price: true,
      status: true,
      exhibitorId: true,
    },
  });

  return eventBooths.map((booth) => ({
    ...booth,
    status: booth.status as 'A' | 'B',
  }));
};

export const updateEventBooth = async (
  id: number,
  data: Partial<EventBooth>
): Promise<PublicEventBooth | null> => {
  const eventBooth = await prisma.eventBooth.update({
    where: { id },
    data,
    select: {
      id: true,
      eventId: true,
      name: true,
      size: true,
      price: true,
      status: true,
      exhibitorId: true,
    },
  });
  return eventBooth
    ? { ...eventBooth, status: eventBooth.status as 'A' | 'B' }
    : null;
};

export const updateEventBoothExhibitor = async (
  id: number,
  exhibitorId: number
): Promise<PublicEventBooth | null> => {
  const booth = await prisma.eventBooth.update({
    where: { id },
    data: {
      exhibitorId: exhibitorId,
      status: 'B',
    },
    select: {
      id: true,
      eventId: true,
      name: true,
      size: true,
      price: true,
      status: true,
      exhibitorId: true,
    },
  });
  return booth ? { ...booth, status: booth.status as 'A' | 'B' } : null;
};

export const deleteEventBooth = async (
  id: number
): Promise<PublicEventBooth | null> => {
  const eventBooth = await prisma.eventBooth.delete({
    where: { id },
    select: {
      id: true,
      eventId: true,
      name: true,
      size: true,
      price: true,
      status: true,
      exhibitorId: true,
    },
  });
  return eventBooth
    ? { ...eventBooth, status: eventBooth.status as 'A' | 'B' }
    : null;
};
