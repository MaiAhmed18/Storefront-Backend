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

describe('Orders Handlers: ', () => {
    it('/orders should return an active order ', () => {
        const data = {
          status: 'active',
          user_id: 1,
        }
        request
            .post('/api/orders')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect({
                id: 1,
                status: 'active',
                user_id: 1,
            })
    })

    it('/orders should fail if user_id is not included in parameters', () => {
        const data = {
            status: 'active',
        }
        request
            .post('/api/orders')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(400)
            .expect({
                error: 'Missing user id or status',
            })
    })

    it('/orders should fail if status is not included in parameters', () => {
        const data = {
            user_id: 1,
        }
        request
            .post('/api/orders/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(400)
            .expect({
                error: 'Missing user id or status',
            })
    })

    it('/orders should show all orders', () => {
        request
            .get('/api/orders')
            .expect({
                id: 1,
                status: 'active',
                user_id: 1,
            })
    })

    it('/orders/:id show a order', () => {
        request
            .get('/api/orders/1')
            .set('Authorization', `Bearer ${token}`)
            .expect({
                id: 1,
                status: 'active',
                user_id: 1,
            })
    })

    it('/orders/current/:user_id should show current orders with status active for specific user', () => {
        request
            .get('/api/orders/current/1')
            .set('Authorization', `Bearer ${token}`)
            .expect({
                id: 1,
                status: 'active',
                user_id: 1,
            })
    })

    it('/orders/completed/:user_id should show completed orders with status completed for specific user', () => {
        request
            .get('/api/orders/completed/1')
            .set('Authorization', `Bearer ${token}`)
            .expect({})
    })

    it('/orders/:id should delete an order given its id', () => {
        request
            .delete('/api/orders/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect(`Order 1 Was Deleted`)
    })


})
