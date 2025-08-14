import pool from '../config/db';
import { User } from '../models/types';

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const users = rows as User[];
    return users.length ? users[0] : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const users = rows as User[];
    return users.length ? users[0] : null;
  }

  async findById(id: number): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    const users = rows as User[];
    return users.length ? users[0] : null;
  }

  async create(user: User): Promise<number> {
    const { username, password, email, role } = user;
    const [result] = await pool.query('INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)', [username, password, email, role || 'user']);
    const insertResult: any = result;
    return insertResult.insertId;
  }
}
