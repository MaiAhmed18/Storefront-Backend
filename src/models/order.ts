import Client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id?: number;
}

export class OrderStore {
// show order by user id
  async showCurrentByUser (user_id: string): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=\'active\';'
      //@ts-ignoreX$
      const conn = await Client.connect()

      const result = await conn.query(sql, [user_id])

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable to show current order for user id ${user_id}: ${err}`)
    }
  }

  async showCompletedByUser (user_id: string): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=\'completed\';'
      //@ts-ignoreX$
      const conn = await Client.connect()

      const result = await conn.query(sql, [user_id])

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable to show completed orders ${user_id}: ${err}`)
    }
  }

  async index (): Promise<Order[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get orders: ${err}`)
    }
  }

  async show (id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      //@ts-ignoreX$
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`unable show order ${id}: ${err}`)
    }
  }

  async create (o: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'

      const result = await conn.query(sql, [o.status, o.user_id])
      const order = result.rows[0]

      conn.release()

      return order
    } catch(err) {
      throw new Error(`unable to create order for user id (${o.user_id}): ${err}`)
    }
  }

  async deleteOrder(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=$1';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not delete order ${id}. Error: ${err}`
      );
    }
  }
}
