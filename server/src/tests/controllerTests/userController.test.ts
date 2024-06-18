import request from 'supertest';
import app from '../../index';

describe('loginController', () => {
  it('should login a user with valid credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'johndoe@example.com',
        password: 'password1'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'John Doe');
  });

  it('should not login a user with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'johndoe@example.com',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid email or password');
  });
});

describe('createUserController', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users/')
      .send({
        username: 'Jane Doe',
        email: 'janedoe@example.com',
        password: 'password4'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('email', 'janedoe@example.com');
  });
});

describe('getAllUsersController', () => {
  it('should get all users', async () => {
    const res = await request(app)
      .get('/api/users/');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('getUserByIdController', () => {
  it('should get a user by ID', async () => {
    const res = await request(app)
      .get('/api/users/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'John Doe');
  });
});
