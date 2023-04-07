import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Product, ProductStore } from '../models/product'
import verifyAuthToken from '../services/verifyToken'

const productRoutes = (app: express.Application) => {
    app.get('/products', index),
    app.get('/products/:id', show),
    app.post('/products', verifyAuthToken, create),
    app.get('/products/category/:category', showByCategory)
    app.delete('/products/:id', verifyAuthToken, deleteProduct)
}

const productStore = new ProductStore()

const index = async (_req: Request, res: Response) => {
  const products = await productStore.index()
  res.json(products)
}

const show = async (_req: Request, res: Response) => {
  const product = await productStore.show(_req.params.id)
  res.json(product)
}

const create = async (req: Request, res: Response) => {
  if (!(req.body.name)) {
      return res.status(400).json({
          error: 'Missing product name',
      })
  }
  const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
  }
  try {
      const newProduct = await productStore.create(product)
      var token = jwt.sign({ user: newProduct }, process.env.TOKEN_SECRET as string);
      res.json(newProduct)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

const showByCategory = async (_req: Request, res: Response) => {
  const product = await productStore.showByCategory(_req.params.category)
  res.json(product)
}

const deleteProduct = async (_req: Request, res: Response) => {
    try {
        const product = await productStore.deleteProduct(_req.params.id)
        res.status(200).json(`Product ${_req.params.id} Was Deleted`)
    } catch (e) {
        res.status(500).json(e)
    }
}

export default productRoutes
