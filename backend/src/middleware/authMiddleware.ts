import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Access denied' })

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' })
  }
}
