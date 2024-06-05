import { Request, Response } from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  getEventsByCreator,
  updateEvent,
  deleteEvent,
} from '../services/eventService';
import { Event } from '../models/event';

export const createEventController = async (req: Request, res: Response) => {
  const { name, date, local, description, creatorId, status } = req.body;
  try {
    const event = await createEvent(
      name,
      new Date(date),
      local,
      description,
      creatorId,
      status
    );
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: 'Event creation failed' });
  }
};

export const getAllEventsController = async (req: Request, res: Response) => {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve events' });
  }
};

export const getEventByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await getEventById(Number(id));
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve event' });
  }
};

export const getEventsByCreatorController = async (
  req: Request,
  res: Response
) => {
  const { creatorId } = req.params;
  try {
    const events = await getEventsByCreator(Number(creatorId));
    res.json(events);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve events' });
  }
};

export const updateEventController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: Partial<Event> = req.body;
  try {
    const event = await updateEvent(Number(id), data);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update event' });
  }
};

export const deleteEventController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await deleteEvent(Number(id));
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete event' });
  }
};
