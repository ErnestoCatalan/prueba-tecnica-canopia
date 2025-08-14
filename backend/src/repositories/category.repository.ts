import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const categoryRepository = {
  async getAll() {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM categories WHERE status = 1');
    return rows;
  },

  async getById(id: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM categories WHERE id = ? AND status = 1', 
      [id]
    );
    return rows[0];
  },

  async create(name: string, description?: string) {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description || null]
    );
    return this.getById(result.insertId);
  },

  async update(id: number, name: string, description?: string) {
    await pool.query<ResultSetHeader>(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [name, description || null, id]
    );
    return this.getById(id);
  },

  async delete(id: number) {
    await pool.query<ResultSetHeader>(
      'UPDATE categories SET status = 0 WHERE id = ?',
      [id]
    );
    return { id };
  }
};