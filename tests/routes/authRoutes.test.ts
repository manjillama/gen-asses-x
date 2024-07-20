import request from 'supertest';
import app from '../../src/app'; // Assuming your Express app setup is exported from 'app.ts'
import * as db from '../db';

describe('Auth Routes', () => {
  beforeAll(async () => {
    await db.connect();
  });
  afterEach(async () => {
    await db.clearDatabase();
  });
  afterAll(async () => {
    await db.closeDatabase();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password'
      };

      const response = await request(app).post('/api/auth/register').send(userData);

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data.user).toHaveProperty('_id');
      expect(response.body.data.user).toHaveProperty('name', userData.name);
      expect(response.body.data.user).toHaveProperty('email', userData.email);
      expect(response.body.data).toHaveProperty('accessToken');
      expect(response.body.data).toHaveProperty('refreshToken');
      expect(response.body.data).not.toHaveProperty('password');
    });

    it('should return 400 if email is missing', async () => {
      const userData = {
        password: 'password'
      };

      const response = await request(app).post('/api/auth/register').send(userData);
      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login an existing user', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({ name: 'John Doe', email: 'test@example.com', password: 'password123' });

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('accessToken');
      expect(response.body.data).toHaveProperty('refreshToken');
    });

    it('should not login with incorrect credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'incorrectPassword' });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('status', 'fail');
      expect(response.body.message).toContain('Incorrect email or password');
    });
  });

  describe('POST /api/auth/refresh', () => {
    it('should refresh access token with valid refresh token', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'John Doe', email: 'test@example.com', password: 'password123' });

      const { refreshToken } = res.body.data;

      const response = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.data).toHaveProperty('accessToken');
      expect(response.body.data.accessToken).not.toBeFalsy();
    });

    it('should return 401 with invalid refresh token', async () => {
      const invalidRefreshToken = 'invalid_token';

      const response = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: invalidRefreshToken })
        .expect('Content-Type', /json/)
        .expect(401);

      expect(response.body).toHaveProperty('status', 'fail');
      expect(response.body.message).toContain('Refresh token');
    });
  });
});
