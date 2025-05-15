import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { authConfig } from '@/configs/auth'
import { AppError } from '@/utils/AppError'

interface TokenPayload {
  role: string
  sub: string
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new AppError('JWT token not found', 401)
    }

    const [, token] = authHeader.split(' ')
    const { verify } = jwt

    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret,
    ) as TokenPayload

    request.user = {
      id: user_id,
      role,
    }

    return next()
  } catch (error) {
    throw new AppError('Invalid JWT token', 401)
  }
}
