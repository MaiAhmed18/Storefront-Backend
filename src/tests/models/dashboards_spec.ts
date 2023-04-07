import supertest from 'supertest';
import app from '../../index';
import { DashboardQueries } from '../../services/dashboard';

const dashboardStore = new DashboardQueries()

describe("Dashboard Model", () => {
  it('should have an fiveMostExpensive method', () => {
    expect(dashboardStore.fiveMostExpensive).toBeDefined();
  });
});
