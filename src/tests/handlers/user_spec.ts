import supertest from 'supertest'
import app from '../../index'
import jwt from 'jsonwebtoken'

const request = supertest(app)
const data = {
    username: 't.smith',
    firstname: 'Tom',
    lastname: 'Smith',
    password_digest: 'test1234',
}
const token = jwt.sign({ user: data }, process.env.TOKEN_SECRET as string);
describe('Users Handlers: ', () => {
    it('/users should return a user', () => {
        request
            .post('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect({
                id: 1,
                username: 't.smith',
                firstname: 'Tom',
                lastname: 'Smith',
                token: token,
            })
    })

    it('/users should fail if required username is not sent', () => {
        const data = {
          firstname: 'Tom',
          lastname: 'Smith',
          password: 'test1234',
        }
        request
            .post('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(400)
            .expect({
                error: 'Missing username or password',
            })
    })

    it('/users should fail if required password is not sent', () => {
        const data = {
          username: 't.smith',
          firstname: 'Tom',
          lastname: 'Smith',
        }
        request
            .post('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect(400)
            .expect({
                error: 'Missing username or password',
            })
    })

    it('/users should return all users', () => {
        request
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .expect([
                {
                    id: 1,
                    username: 't.smith',
                    firstname: 'Tom',
                    lastname: 'Smith',
                },
            ])
    })

    it('/users/:id should show a user', () => {
        request
            .get('/api/users/1')
            .set('Authorization', `Bearer ${token}`)
            .expect({
                id: 1,
                username: 't.smith',
                firstname: 'Tom',
                lastname: 'Smith',
                password_digest: 'test1234',
            })
    })

    it('/users/:id should delete a user', () => {
        request.delete('/api/users/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('User 1 Deleted')
    })
})
