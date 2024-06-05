import { Request, Response } from 'express';
import {
  createEventBooth,
  getAllEventBooths,
  getEventBoothById,
  getEventBoothsByEventId,
  getEventBoothsByStatus,
  getEventBoothsByExhibitor,
  updateEventBooth,
  deleteEventBooth,
} from '../services/eventBoothService';
import { EventBooth } from '../models/eventBooth';

export const createEventBoothController = async (
  req: Request,
  res: Response
) => {
  const { eventId, name, size, price, status, exhibitorId } = req.body;
  try {
    const booth = await createEventBooth(
      eventId,
      name,
      size,
      price,
      status,
      exhibitorId
    );
    res.json(booth);
  } catch (error) {
    res.status(400).json({ error: 'Event booth creation failed' });
  }
};

export const getAllEventBoothsController = async (
  req: Request,
  res: Response
) => {
  try {
    const booths = await getAllEventBooths();
    res.json(booths);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve event booths' });
  }
};

export const getEventBoothByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const booth = await getEventBoothById(Number(id));
    if (booth) {
      res.json(booth);
    } else {
      res.status(404).json({ error: 'Event booth not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve event booth' });
  }
};

export const getEventBoothsByEventIdController = async (
  req: Request,
  res: Response
) => {
  const { eventId } = req.params;
  try {
    const booths = await getEventBoothsByEventId(Number(eventId));
    res.json(booths);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve event booths' });
  }
};

export const getEventBoothsByStatusController = async (
  req: Request,
  res: Response
) => {
  const { status } = req.params;
  try {
    const booths = await getEventBoothsByStatus(status as 'A' | 'B');
    res.json(booths);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve event booths' });
  }
};

export const getEventBoothsByExhibitorController = async (
  req: Request,
  res: Response
) => {
  const { exhibitorId } = req.params;
  try {
    const booths = await getEventBoothsByExhibitor(Number(exhibitorId));
    res.json(booths);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve event booths' });
  }
};

export const updateEventBoothController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const data: Partial<EventBooth> = req.body;
  try {
    const booth = await updateEventBooth(Number(id), data);
    if (booth) {
      res.json(booth);
    } else {
      res.status(404).json({ error: 'Event booth not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update event booth' });
  }
};

export const deleteEventBoothController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const booth = await deleteEventBooth(Number(id));
    if (booth) {
      res.json(booth);
    } else {
      res.status(404).json({ error: 'Event booth not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete event booth' });
  }
};
