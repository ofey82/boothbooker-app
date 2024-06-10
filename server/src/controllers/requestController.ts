import { Request, Response } from 'express';
import {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
  getRequestsByEventBoothId,
  getRequestsByApplicantId,
  getRequestsForEventsCreatedByUser,
  acceptRequestAndDeclineOthers,
  declineRequest,
} from '../services/requestService';

export const createRequestController = async (req: Request, res: Response) => {
  const { eventBoothId, applicantId, status } = req.body;
  try {
    const request = await createRequest(eventBoothId, applicantId, status);
    res.json(request);
  } catch (error) {
    res.status(400).json({ error: 'Request creation failed' });
  }
};

export const getAllRequestsController = async (req: Request, res: Response) => {
  try {
    const requests = await getAllRequests();
    res.json(requests);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve requests' });
  }
};

export const getRequestByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const request = await getRequestById(Number(id));
    if (request) {
      res.json(request);
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve request' });
  }
};

export const getRequestsByEventBoothIdController = async (
  req: Request,
  res: Response
) => {
  const { eventBoothId } = req.params;
  try {
    const requests = await getRequestsByEventBoothId(Number(eventBoothId));
    res.json(requests);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve requests' });
  }
};

export const getRequestsByApplicantIdController = async (
  req: Request,
  res: Response
) => {
  const { applicantId } = req.params;
  try {
    const requests = await getRequestsByApplicantId(Number(applicantId));
    res.json(requests);
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve requests' });
  }
};

export const getRequestsForEventsCreatedByUserController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const requests = await getRequestsForEventsCreatedByUser(Number(id));
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve requests' });
  }
};

export const updateRequestController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const request = await updateRequest(Number(id), data);
    if (request) {
      res.json(request);
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update request' });
  }
};

export const acceptRequestController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const request = await acceptRequestAndDeclineOthers(Number(id));
    if (request) {
      res.json(request);
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to accept request' });
  }
};

export const declineRequestController = async (req: Request, res: Response) => {
  try {
    const requestId = parseInt(req.params.id, 10);
    console.log('requestId: ', requestId);
    const request = await declineRequest(requestId);
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: 'Request not found' });
  }
};

export const deleteRequestController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const request = await deleteRequest(Number(id));
    if (request) {
      res.json(request);
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete request' });
  }
};
