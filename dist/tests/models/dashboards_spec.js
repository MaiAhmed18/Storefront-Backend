"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dashboard_1 = require("../../services/dashboard");
var dashboardStore = new dashboard_1.DashboardQueries();
describe("Dashboard Model", function () {
    it('should have an fiveMostExpensive method', function () {
        expect(dashboardStore.fiveMostExpensive).toBeDefined();
    });
});
