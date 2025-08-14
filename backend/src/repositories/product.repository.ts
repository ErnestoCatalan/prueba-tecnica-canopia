import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const productRepository = {
  async getAll() {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM products');
    return rows;
  },

  async getById(id: number) {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  },

  async create(name: string, description: string, price: number, stock: number, category_id?: number) {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, stock, category_id || null]
    );
    return this.getById(result.insertId);
  },

  async update(id: number, name: string, description: string, price: number, stock: number, category_id?: number) {
    await pool.query<ResultSetHeader>(
      'UPDATE products SET name=?, description=?, price=?, stock=?, category_id=? WHERE id=?',
      [name, description, price, stock, category_id || null, id]
    );
    return this.getById(id);
  },

  async delete(id: number) {
    await pool.query<ResultSetHeader>('DELETE FROM products WHERE id = ?', [id]);
    return { id };
  }
};
