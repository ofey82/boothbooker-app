import express from 'express';
import {
  createEventController,
  getAllEventsController,
  getEventByIdController,
  getEventsByCreatorController,
  updateEventController,
  deleteEventController,
  getEventsForUserController,
} from '../controllers/eventController';
import upload from '../middlewares/upload';

const router = express.Router();

router.post('/', upload.single('image'), createEventController);
router.get('/', getAllEventsController);
router.get('/:id', getEventByIdController);
router.get('/creator/:creatorId', getEventsByCreatorController);
router.get('/user/:userId', getEventsForUserController);
router.put('/:id', updateEventController);
router.delete('/:id', deleteEventController);

export default router;
