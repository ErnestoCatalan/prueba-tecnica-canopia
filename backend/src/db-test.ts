import pool from './config/db';

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    console.log('DB connected, test query result:', rows);
  } catch (error) {
    console.error('DB connection failed:', error);
  } finally {
    await pool.end();
  }
}

testConnection();
