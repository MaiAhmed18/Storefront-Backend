import { OrderStore } from '../../models/order'
import { ProductStore } from '../../models/product'
import { UserStore } from '../../models/user'

const store = new OrderStore()
const productStore = new ProductStore()
const userStore = new UserStore()
let userId: number;

describe('Order Model', () => {
    beforeAll(async (): Promise<void> => {
      const data = await userStore.create({
        username: 'k.smith',
        firstname: 'kevin',
        lastname: 'smith',
        password_digest: 'password'
      });
      userId = data.id as unknown as number
        const result = await store.create({
            status: 'active',
            user_id: userId,
        })
        expect(result).toEqual({
            id: 1,
            status: 'active',
            user_id: (userId ),
        })
    })

    it('should return a list of orders', async (): Promise<void> => {
        const result = await store.index()
        expect(result).toEqual([
            {
              id: 1,
              status: 'active',
              user_id: userId,
            },
        ])
    })

    it('should return the correct order', async (): Promise<void> => {
        const result = await store.show('1')
        expect(result).toEqual({
          id: 1,
          status: 'active',
          user_id: userId,
        })
    })

    it('should return the active orders by user id', async (): Promise<void> => {
        const result = await store.showCurrentByUser(userId as unknown as string)
        expect(result).toEqual([{
          id: 1,
          status: 'active',
          user_id: userId,
        }])
    })

    it('should return the completed orders by user id', async (): Promise<void> => {
        const result = await store.showCompletedByUser(userId as unknown as string)
        expect(result).toEqual([])
    })

    afterAll(async (): Promise<void> => {
        await userStore.deleteUser(userId as unknown as string)
        await store.deleteOrder('1')
        const result = await store.index()
        expect(result).toEqual([])
    })
})
