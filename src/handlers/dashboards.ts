import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { DashboardQueries } from '../services/dashboard';

const dashboardRoutes = (app: express.Application) => {
      app.get('/five-most-expensive', fiveMostExpensive);
};

const dashboard = new DashboardQueries();

const fiveMostExpensive = async (_req: Request, res: Response) => {
  const users = await dashboard.fiveMostExpensive()
  res.json(users)
}

export default dashboardRoutes;
