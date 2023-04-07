import Client from '../database'
import bcrypt from 'bcrypt'

const saltRounds= process.env.SALT_ROUNDS as string
const pepper = process.env.BCRYPT_PASSWORD

export type User = {
  id?: Number;
  username: string;
  firstname?: string;
  lastname?: string;
  password_digest: string;
  token?: string
}

export class UserStore {

  async index(): Promise<User[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get users: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'

      console.log(id)
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])
      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`unable show user ${id}: ${err}`)
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'INSERT INTO users (username, firstname, lastname, password_digest) VALUES($1, $2, $3, $4) RETURNING *'

      const hash = bcrypt.hashSync(
        u.password_digest + pepper,
        parseInt(saltRounds)
      );

      const result = await conn.query(sql, [u.username, u.firstname, u.lastname, hash])
      const user = result.rows[0]

      conn.release()

      return user
    } catch(err) {
      throw new Error(`unable create user (${u.username}): ${err}`)
    }
  }

  async deleteUser(id: string): Promise<User> {
      try {
          // @ts-ignore
          const conn = await Client.connect()
          const sql = 'DELETE FROM users WHERE id=($1)'
          const result = await conn.query(sql, [id])
          conn.release()

          return result.rows[0]
      } catch (err) {
          throw new Error(`Could not delete user ${id}. Error: ${err}`)
      }
  }

}
