import express from 'express';
import {
  createEventController,
  getAllEventsController,
  getEventByIdController,
  getEventsByCreatorController,
  updateEventController,
  deleteEventController,
} from '../controllers/eventController';

const router = express.Router();

router.post('/', createEventController);
router.get('/', getAllEventsController);
router.get('/:id', getEventByIdController);
router.get('/creator/:creatorId', getEventsByCreatorController);
router.put('/:id', updateEventController);
router.delete('/:id', deleteEventController);

export default router;
