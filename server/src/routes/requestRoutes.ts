import express from 'express';
import {
  createRequestController,
  getAllRequestsController,
  getRequestByIdController,
  updateRequestController,
  deleteRequestController,
  getRequestsByEventBoothIdController,
  getRequestsByApplicantIdController,
  getRequestsForEventsCreatedByUserController,
  acceptRequestController,
  declineRequestController,
} from '../controllers/requestController';

const router = express.Router();

router.post('/', createRequestController);
router.get('/', getAllRequestsController);
router.get('/:id', getRequestByIdController);
router.get('/eventBooth/:eventBoothId', getRequestsByEventBoothIdController);
router.get('/applicant/:applicantId', getRequestsByApplicantIdController);
router.get('/creator/:id', getRequestsForEventsCreatedByUserController);
router.put('/:id', updateRequestController);
router.put('/:id/accept', acceptRequestController);
router.put('/:id/decline', declineRequestController);
router.delete('/:id', deleteRequestController);

export default router;
