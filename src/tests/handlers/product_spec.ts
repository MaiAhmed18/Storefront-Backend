import supertest from 'supertest'
import app from '../../index'
import jwt from 'jsonwebtoken'

const request = supertest(app)
const data = {
    username: 'ssmith',
    firstname: 'Sally',
    lastname: 'Smothers',
    password_digest: 'test1234',
}

const token = jwt.sign({ user: data }, process.env.TOKEN_SECRET as string);

describe('Product Handlers: ', () => {
    it('should return a new product after it is created', () => {
        const data = {
            name: 'Test product',
            price: 100,
            category: 'category 1',
        }
        request
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect({
                id: 1,
                name: 'Test product',
                price: '100',
                category: 'category 1',
            })
    })

    it('create product should fail if name is not included in parameters', () => {
        const data = {
            price: 40.0,
            category: 'category b',
        }
        request
            .post('/api/products')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(400)
            .expect({
                error: 'Missing product name',
            })
    })

    it('should show all products', () => {
        request
            .get('/api/products')
            .expect({
                id: 1,
                name: 'Test product',
                price: 100,
                category: 'category 1',
            })
    })

    it('should show a product given an id', () => {
        request
            .get('/api/products/1')
            .expect({
              id: 1,
              name: 'Test product',
              price: 100,
              category: 'category 1',
            })
    })

    it('should show a product given a category', () => {
        request
            .get('/api/products/category/category 1')
            .expect({
              id: 1,
              name: 'Test product',
              price: 100,
              category: 'category 1',
            })
    })

    it('should delete a product given its id', () => {
        request
            .delete('/api/products/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('`Product 1 Was Deleted`')
    })
})
