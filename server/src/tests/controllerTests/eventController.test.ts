import request from 'supertest';
import app from '../../index';


describe('createEventController', () => {

describe('getAllEventsController', () => {
  it('should get all events', async () => {
    const res = await request(app)
      .get('/api/events');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('getEventByIdController', () => {
  it('should get an event by id', async () => {
    const res = await request(app)
      .get('/api/events/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
  });
});

describe('getEventsByCreatorController', () => {
  it('should get events by creator id', async () => {
    const res = await request(app)
      .get('/api/events/creator/1');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('getEventsForUserController', () => {
  it('should get events for a user', async () => {
    const res = await request(app)
      .get('/api/events/user/1');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('updateEventController', () => {
  it('should update an event', async () => {
    const res = await request(app)
      .put('/api/events/1')
      .send({
        name: 'Updated Event'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated Event');
  });
});

describe('deleteEventController', () => {
  it('should delete an event', async () => {
    const res = await request(app)
      .delete('/api/events/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
    });
  });

});
