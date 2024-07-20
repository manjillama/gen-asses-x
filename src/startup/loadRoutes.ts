import express, { Application } from 'express';
import routesV1 from '../routes';

export function loadRoutes(app: Application): void {
  app.use(express.json());
  app.use('/api', routesV1);
}
