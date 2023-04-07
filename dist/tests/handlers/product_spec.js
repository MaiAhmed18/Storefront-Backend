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
describe('Product Handlers: ', function () {
    it('should return a new product after it is created', function () {
        var data = {
            name: 'Test product',
            price: 100,
            category: 'category 1',
        };
        request
            .post('/api/products')
            .set('Authorization', "Bearer ".concat(token))
            .send(data)
            .expect({
            id: 1,
            name: 'Test product',
            price: '100',
            category: 'category 1',
        });
    });
    it('create product should fail if name is not included in parameters', function () {
        var data = {
            price: 40.0,
            category: 'category b',
        };
        request
            .post('/api/products')
            .set('Authorization', "Bearer ".concat(token))
            .send(data)
            .expect(400)
            .expect({
            error: 'Missing product name',
        });
    });
    it('should show all products', function () {
        request
            .get('/api/products')
            .expect({
            id: 1,
            name: 'Test product',
            price: 100,
            category: 'category 1',
        });
    });
    it('should show a product given an id', function () {
        request
            .get('/api/products/1')
            .expect({
            id: 1,
            name: 'Test product',
            price: 100,
            category: 'category 1',
        });
    });
    it('should show a product given a category', function () {
        request
            .get('/api/products/category/category 1')
            .expect({
            id: 1,
            name: 'Test product',
            price: 100,
            category: 'category 1',
        });
    });
    it('should delete a product given its id', function () {
        request
            .delete('/api/products/1')
            .set('Authorization', "Bearer ".concat(token))
            .expect(200)
            .expect('`Product 1 Was Deleted`');
    });
});
