import express from 'express';
import {
  createRequestController,
  getAllRequestsController,
  getRequestByIdController,
  updateRequestController,
  deleteRequestController,
  getRequestsByEventBoothIdController,
  getRequestsByApplicantIdController,
  acceptRequestController,
} from '../controllers/requestController';

const router = express.Router();

router.post('/', createRequestController);
router.get('/', getAllRequestsController);
router.get('/:id', getRequestByIdController);
router.get('/eventBooth/:eventBoothId', getRequestsByEventBoothIdController);
router.get('/applicant/:applicantId', getRequestsByApplicantIdController);
router.put('/:id', updateRequestController);
router.put('/:id/accept', acceptRequestController);
router.delete('/:id', deleteRequestController);

export default router;
