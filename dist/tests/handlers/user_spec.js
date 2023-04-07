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
    username: 't.smith',
    firstname: 'Tom',
    lastname: 'Smith',
    password_digest: 'test1234',
};
var token = jsonwebtoken_1.default.sign({ user: data }, process.env.TOKEN_SECRET);
describe('Users Handlers: ', function () {
    it('/users should return a user', function () {
        request
            .post('/api/users')
            .set('Authorization', "Bearer ".concat(token))
            .send(data)
            .expect({
            id: 1,
            username: 't.smith',
            firstname: 'Tom',
            lastname: 'Smith',
            token: token,
        });
    });
    it('/users should fail if required username is not sent', function () {
        var data = {
            firstname: 'Tom',
            lastname: 'Smith',
            password: 'test1234',
        };
        request
            .post('/api/users')
            .set('Authorization', "Bearer ".concat(token))
            .send(data)
            .expect(400)
            .expect({
            error: 'Missing username or password',
        });
    });
    it('/users should fail if required password is not sent', function () {
        var data = {
            username: 't.smith',
            firstname: 'Tom',
            lastname: 'Smith',
        };
        request
            .post('/api/users')
            .set('Authorization', "Bearer ".concat(token))
            .send(data)
            .expect(400)
            .expect({
            error: 'Missing username or password',
        });
    });
    it('/users should return all users', function () {
        request
            .get('/api/users')
            .set('Authorization', "Bearer ".concat(token))
            .expect([
            {
                id: 1,
                username: 't.smith',
                firstname: 'Tom',
                lastname: 'Smith',
            },
        ]);
    });
    it('/users/:id should show a user', function () {
        request
            .get('/api/users/1')
            .set('Authorization', "Bearer ".concat(token))
            .expect({
            id: 1,
            username: 't.smith',
            firstname: 'Tom',
            lastname: 'Smith',
            password_digest: 'test1234',
        });
    });
    it('/users/:id should delete a user', function () {
        request.delete('/api/users/1')
            .set('Authorization', "Bearer ".concat(token))
            .expect(200)
            .expect('User 1 Deleted');
    });
});
