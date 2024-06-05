import express from 'express';
import {
  createEventBoothController,
  getAllEventBoothsController,
  getEventBoothByIdController,
  getEventBoothsByEventIdController,
  getEventBoothsByStatusController,
  getEventBoothsByExhibitorController,
  updateEventBoothController,
  updateEventBoothExhibitorController,
  deleteEventBoothController,
} from '../controllers/eventBoothController';

const router = express.Router();

router.post('/', createEventBoothController);
router.get('/', getAllEventBoothsController);
router.get('/:id', getEventBoothByIdController);
router.get('/event/:eventId', getEventBoothsByEventIdController);
router.get('/status/:status', getEventBoothsByStatusController);
router.get('/exhibitor/:exhibitorId', getEventBoothsByExhibitorController);
router.put('/:id', updateEventBoothController);
router.put('/book/:id', updateEventBoothExhibitorController);
router.delete('/:id', deleteEventBoothController);

export default router;
