import request from 'supertest';
import app from '../../src/app'; // Assuming your Express app setup is exported from 'app.ts'
import * as db from '../db';

describe('User Routes', () => {
  let accessToken: string;
  const userData = { name: 'John Doe', email: 'test@example.com', password: 'password123' };

  beforeAll(async () => {
    await db.connect();
  });
  beforeEach(async () => {
    const response = await request(app).post('/api/auth/register').send(userData);
    accessToken = response.body.data.accessToken;
  });
  afterEach(async () => {
    await db.clearDatabase();
  });
  afterAll(async () => {
    await db.closeDatabase();
  });

  describe('GET /api/users', () => {
    it('should fetch list of all registered users', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(response.body.data.users)).toBe(true);
      expect(response.body.data.total).toBeGreaterThan(0);
      expect(response.body.data.users[0]).toHaveProperty('_id');
      expect(response.body.data.users[0]).toHaveProperty('name');
      expect(response.body.data.users[0]).toHaveProperty('email');
    });
  });

  describe('GET /api/users/me', () => {
    it('should fetch current user', async () => {
      const response = await request(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('lastLoggedInAt');
      expect(response.body.data).toHaveProperty('name', userData.name);
      expect(response.body.data).toHaveProperty('email', userData.email);
      expect(response.body.data).not.toHaveProperty('password');
      expect(response.body.data).not.toHaveProperty('refreshTokens');
    });
  });

  describe('PUT /api/users/me', () => {
    it('should update user profile', async () => {
      const newName = 'Updated Name';

      const response = await request(app)
        .put('/api/users/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: newName });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('name', newName);
      expect(response.body.data).toHaveProperty('email', 'test@example.com');
      expect(response.body.data).not.toHaveProperty('password');
      expect(response.body.data).not.toHaveProperty('refreshTokens');
    });
  });

  describe('DELETE /api/users/me', () => {
    it('should delete the current user', async () => {
      await request(app).delete('/api/users/me').set('Authorization', `Bearer ${accessToken}`).expect(200);

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: userData.email, password: userData.password });
      expect(response.status).toBe(401);
    });
  });
});
