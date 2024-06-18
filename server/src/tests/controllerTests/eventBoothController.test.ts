import httpMocks, { Params } from 'node-mocks-http';
import {
  createEventBoothController,
  getAllEventBoothsController,
  getEventBoothByIdController,
  getEventBoothsByEventIdController,
  getEventBoothsByStatusController,
  getEventBoothsByExhibitorController,
  updateEventBoothController,
  updateEventBoothExhibitorController,
  deleteEventBoothController
} from '../../controllers/eventBoothController';
import {
  createEventBooth,
  getAllEventBooths,
  getEventBoothById,
  getEventBoothsByEventId,
  getEventBoothsByStatus,
  getEventBoothsByExhibitor,
  updateEventBooth,
  updateEventBoothExhibitor,
  deleteEventBooth
} from '../../services/eventBoothService';

jest.mock('../../services/eventBoothService');

// Mock data
const mockBooth = {
  eventId: 1,
  name: 'Test Booth',
  size: '10x10',
  price: 100,
  status: 'A',
  exhibitorId: 1
};

const mockBooths = [
  {
    eventId: 1,
    name: 'Test Booth 1',
    size: '10x10',
    price: 100,
    status: 'A',
    exhibitorId: 1
  },
  {
    eventId: 2,
    name: 'Test Booth 2',
    size: '20x20',
    price: 200,
    status: 'B',
    exhibitorId: 2
  },
  {
    eventId: 3,
    name: 'Test Booth 3',
    size: '30x30',
    price: 300,
    status: 'C',
    exhibitorId: 3
  }
];


// Mock request and response
const mockRequest = (body: any, params: any) => {
  return httpMocks.createRequest({
    method: 'POST',
    url: '/eventBooth',
    body,
    params
  });
};
const mockResponse = () => {
  const res = httpMocks.createResponse();
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
};

describe('Event Booth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an event booth', async () => {
    const req = mockRequest(mockBooth, {});
    const res = mockResponse();

    (createEventBooth as jest.Mock).mockResolvedValue(mockBooth);

    await createEventBoothController(req, res);

    expect(res.json).toHaveBeenCalledWith(mockBooth);
  });

});

describe('getAllEventBoothsController', () => {
  it('should get all event booths', async () => {
    const req = mockRequest({}, {});
    const res = mockResponse();

    const mockBooths = [mockBooth, mockBooth];

    (getAllEventBooths as jest.Mock).mockResolvedValue(mockBooths);

    await getAllEventBoothsController(req, res);

    // Check that res.json was called with mockBooths
    expect(res.json).toHaveBeenCalledWith(mockBooths);
  });
});

describe('getEventBoothByIdController', () => {
  it('should get an event booth by ID', async () => {
    const req = mockRequest({}, { id: 1 });
    const res = mockResponse();

    (getEventBoothById as jest.Mock).mockResolvedValue(mockBooth);

    await getEventBoothByIdController(req, res);

    // Check that res.json was called with mockBooth
    expect(res.json).toHaveBeenCalledWith(mockBooth);
  });
});

describe('getEventBoothsByEventIdController', () => {
  it('should get event booths by event ID', async () => {
    const req = mockRequest({}, { eventId: 1 });
    const res = mockResponse();

    (getEventBoothsByEventId as jest.Mock).mockResolvedValue(mockBooths);

    await getEventBoothsByEventIdController(req, res);

    expect(res.json).toHaveBeenCalledWith(mockBooths);
  });
});

describe('updateEventBoothController', () => {
  it('should update an event booth', async () => {
    const req = mockRequest({ name: 'Updated Booth' }, { id: 1 });
    const res = mockResponse();

    (updateEventBooth as jest.Mock).mockResolvedValue({ ...mockBooth, name: 'Updated Booth' });

    await updateEventBoothController(req, res);

    expect(res.json).toHaveBeenCalledWith({ ...mockBooth, name: 'Updated Booth' });
  });
});

describe('updateEventBoothExhibitorController', () => {
  it('should update an event booth exhibitor', async () => {
    const req = mockRequest({ exhibitorId: 2 }, { id: 1 });
    const res = mockResponse();

    (updateEventBoothExhibitor as jest.Mock).mockResolvedValue({ ...mockBooth, exhibitorId: 2 });

    await updateEventBoothExhibitorController(req, res);

    expect(res.json).toHaveBeenCalledWith({ ...mockBooth, exhibitorId: 2 });
  });
});

describe('deleteEventBoothController', () => {
  it('should delete an event booth', async () => {
    const req = mockRequest({}, { id: 1 });
    const res = mockResponse();

    (deleteEventBooth as jest.Mock).mockResolvedValue({ message: 'Booth deleted successfully' });

    await deleteEventBoothController(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Booth deleted successfully' });
  });
});

describe('getEventBoothsByStatusController', () => {
  it('should get event booths by status', async () => {
    const req = mockRequest({}, { status: 'A' });
    const res = mockResponse();

    // According to Nuno the getEventBoothsByStatus returns an array of booths with the same status
    (getEventBoothsByStatus as jest.Mock).mockResolvedValue([mockBooth]);

    await getEventBoothsByStatusController(req, res);

    expect(res.json).toHaveBeenCalledWith([mockBooth]);
  });
});

describe('getEventBoothsByExhibitorController', () => {
  it('should get event booths by exhibitor', async () => {
    const req = mockRequest({}, { exhibitorId: 1 });
    const res = mockResponse();

    (getEventBoothsByExhibitor as jest.Mock).mockResolvedValue([mockBooth]);

    await getEventBoothsByExhibitorController(req, res);

    expect(res.json).toHaveBeenCalledWith([mockBooth]);
  });
});