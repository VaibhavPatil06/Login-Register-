import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../database/database.js';

// Secret key for JWT
const JWT_SECRET = 'process.env.JWT_SECRET'; // Replace with your own secret key

// Register a new user
export const registerUser = async (req, res) => {
  const { email, password, name, company } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (email, password, name, company) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, name, company]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
    console.log(err)
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await pool.query('SELECT email, name, company FROM users WHERE id = ?', [userId]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user profile', error: err.message });
  }
};
