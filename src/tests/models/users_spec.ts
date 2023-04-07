import { UserStore } from '../../models/user'

const userStore = new UserStore()

describe('User Model', () => {
    beforeAll(async (): Promise<void> => {
        const result = await userStore.create({
          username: 't.smith',
          firstname: 'Tom',
          lastname: 'Smith',
          password_digest: 'password123',
        })
      //  expect(result.username).toEqual('t.smith')
    })

    it('should return a list of users', async (): Promise<void> => {
        const result = await userStore.index()
        expect(result.length).toEqual(1)
    })

    it('should return the correct user', async (): Promise<void> => {
        const result = await userStore.show('1')
        console.log("res " + result)
        expect(result.username).toEqual('t.smith')
    })

    afterAll(async (): Promise<void> => {
      const temp = await userStore.deleteUser('1')
      let users = await userStore.index()

      expect(users.length).toEqual(0)
    })
})
