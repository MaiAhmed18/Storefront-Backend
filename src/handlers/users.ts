import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/user'
import verifyAuthToken from '../services/verifyToken'

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index),
    app.get('/users/:id', verifyAuthToken, show),
    app.post('/users', create)
    app.delete('/users/:id', verifyAuthToken, deleteUser)
}

const userStore = new UserStore()

const index = async (_req: Request, res: Response) => {
  const users = await userStore.index()
  res.status(200).json(users)
}

const show = async (_req: Request, res: Response) => {
  const user = await userStore.show(_req.params.id)
  res.status(200).json(user)
}

const create = async (req: Request, res: Response) => {
  if (!(req.body.username || !req.body.password_digest)) {
      return res.status(400).json({
          error: 'Missing username or password',
      })
  }
  const user: User = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password_digest: req.body.password_digest,
  }
  try {
      const newUser = await userStore.create(user)
      // @ts-ignore
      const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
      newUser.token = token;
      res.json(newUser)
  } catch (err) {
      res.status(400)
      res.json(err)
  }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await userStore.deleteUser(req.params.id)
        res.status(200).json(`User ${req.params.id} was Deleted`)
    } catch (e) {
        res.status(500).json(e)
    }
}

export default userRoutes
