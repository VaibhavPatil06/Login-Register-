import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

const pool = mysql.createPool({
  host: process.env.DB_HOST, // Update with your database host
  user: process.env.DB_USER, // Update with your database user
  password: process.env.DB_PASSWORD, // Update with your database password
  database: 'process.env.DB_NAME', // Update with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const sequelize = new Sequelize({
  dialect: 'sqlite', // or 'mysql', 'postgres', etc.
  storage: './database.sqlite', // For SQLite; adjust for other DBs
  logging: false, // Set to true to see SQL queries in the console
});


export default pool;
