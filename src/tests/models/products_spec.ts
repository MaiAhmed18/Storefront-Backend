import { ProductStore } from '../../models/product'

const store = new ProductStore()

describe('Product Model', () => {
    beforeAll(async (): Promise<void> => {
        const result = await store.create({
            name: 'Test product',
            price: 100,
            category: 'Test category',
        })
        expect(result).toEqual({
            id: 1,
            name: 'Test product',
            price: 100,
            category: 'Test category',
        })
    })

    it('should return a list of products', async (): Promise<void> => {
        const result = await store.index()
        console.log("prod " +result)
        expect(result).toEqual([
            {
              id: 1,
              name: 'Test product',
              price: 100,
              category: 'Test category',
            },
        ])
    })

    it('should return the correct product', async (): Promise<void> => {
        const result = await store.show('1')
        expect(result).toEqual({
          id: 1,
          name: 'Test product',
          price: 100,
          category: 'Test category',
        })
    })

    it('should return the correct product by category', async (): Promise<void> => {
        const result = await store.showByCategory('Test category')
        expect(result).toEqual([{
          id: 1,
          name: 'Test product',
          price: 100,
          category: 'Test category',
        }])
    })

    afterAll(async (): Promise<void> => {
        const temp = await store.deleteProduct('1')
        const result = await store.index()

        expect(result).toEqual([])
    })
})
