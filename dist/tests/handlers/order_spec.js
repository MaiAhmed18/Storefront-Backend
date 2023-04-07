"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../index"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var request = (0, supertest_1.default)(index_1.default);
var data = {
    username: 'ssmith',
    firstname: 'Sally',
    lastname: 'Smothers',
    password_digest: 'test1234',
};
var token = jsonwebtoken_1.default.sign({ user: data }, process.env.TOKEN_SECRET);
describe('Orders Handlers: ', function () {
    it('/orders should return an active order ', function () {
        var data = {
            status: 'active',
            user_id: 1,
        };
        request
            .post('/api/orders')
            .set('Authorization', "Bearer ".concat(token))
            .send(data)
            .expect({
            id: 1,
            status: 'active',
            user_id: 1,
        });
    });
    it('/orders should fail if user_id is not included in parameters', function () {
        var data = {
            status: 'active',
        };
        request
            .post('/api/orders')
            .set('Authorization', "Bearer ".concat(token))
            .send(data)
            .expect(400)
            .expect({
            error: 'Missing user id or status',
        });
    });
    it('/orders should fail if status is not included in parameters', function () {
        var data = {
            user_id: 1,
        };
        request
            .post('/api/orders/create')
            .set('Authorization', "Bearer ".concat(token))
            .send(data)
            .expect(400)
            .expect({
            error: 'Missing user id or status',
        });
    });
    it('/orders should show all orders', function () {
        request
            .get('/api/orders')
            .expect({
            id: 1,
            status: 'active',
            user_id: 1,
        });
    });
    it('/orders/:id show a order', function () {
        request
            .get('/api/orders/1')
            .set('Authorization', "Bearer ".concat(token))
            .expect({
            id: 1,
            status: 'active',
            user_id: 1,
        });
    });
    it('/orders/current/:user_id should show current orders with status active for specific user', function () {
        request
            .get('/api/orders/current/1')
            .set('Authorization', "Bearer ".concat(token))
            .expect({
            id: 1,
            status: 'active',
            user_id: 1,
        });
    });
    it('/orders/completed/:user_id should show completed orders with status completed for specific user', function () {
        request
            .get('/api/orders/completed/1')
            .set('Authorization', "Bearer ".concat(token))
            .expect({});
    });
    it('/orders/:id should delete an order given its id', function () {
        request
            .delete('/api/orders/1')
            .set('Authorization', "Bearer ".concat(token))
            .expect(200)
            .expect("Order 1 Was Deleted");
    });
});
