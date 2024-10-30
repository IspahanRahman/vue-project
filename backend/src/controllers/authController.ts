import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../config/db'
import { Request, Response } from 'express'

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    )
    res.status(201).json({ user: result.rows[0] })
  } catch (error:any) {
    res.status(400).json({ error: error.message })
  }
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username])
    const user = result.rows[0]
    console.log('this is user',user);

    if (user && await bcrypt.compare(password, user.password_hash)) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
      console.log('token',token);
      res.json({ message: 'Login successful', token })
    } else {
      console.log('error password not matched')
    }
  } catch (error:any) {
    console.log('could not process password');
  }
}
