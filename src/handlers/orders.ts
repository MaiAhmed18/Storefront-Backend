import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../services/verifyToken'

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index),
  app.get('/orders/:id', show),
  app.post('/orders', verifyAuthToken, create),
  app.delete('/orders/:id', verifyAuthToken, deleteOrder),
  app.get('/orders/current/:user_id', verifyAuthToken, showCurrentByUser),
  app.get('/orders/completed/:user_id', verifyAuthToken, showCompletedByUser)
}

const orderStore = new OrderStore()

const index = async (_req: Request, res: Response) => {
  const orders = await orderStore.index()
  res.json(orders)
}

const show = async (_req: Request, res: Response) => {
  const order = await orderStore.show(_req.params.id)
  res.json(order)
}

const create = async (req: Request, res: Response) => {
  if (!(req.body.status || !req.body.user_id)) {
      return res.status(400).json({
          error: 'Missing user id or status',
      })
  }
  const order: Order = {
      status: req.body.status,
      user_id: parseInt(req.body.user_id as string)
  }
  try {
      const newOrder = await orderStore.create(order)
      var token = jwt.sign({ user: newOrder }, process.env.TOKEN_SECRET as string);
      newOrder.user_id = newOrder.user_id as unknown as number
      res.json(newOrder)
  } catch (err) {
      res.status(400)
      res.json(err)
  }
}

const showCurrentByUser = async (_req: Request, res: Response) => {
  const order = await orderStore.showCurrentByUser(_req.params.user_id)
  res.json(order)
}

const showCompletedByUser = async (_req: Request, res: Response) => {
  const order = await orderStore.showCompletedByUser(_req.params.user_id)
  res.json(order)
}

const deleteOrder = async (_req: Request, res: Response) => {
  const order = await orderStore.deleteOrder(_req.params.id)
  res.status(200).json(`Order ${_req.params.id} Was Deleted`)
}
export default orderRoutes
