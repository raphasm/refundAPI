import { authConfig } from '@/configs/auth'
import { prisma } from '@/database/prisma'
import { AppError } from '@/utils/AppError'
import { compare } from 'bcrypt'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import z from 'zod'

export class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().email({ message: 'E-mail invalido' }),
      password: z.string(),
    })

    const { email, password } = bodySchema.parse(request.body)

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      throw new AppError('E-mail ou senha inválido', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('E-mail ou senha inválido', 401)
    }

    const { secret } = authConfig.jwt
    const { sign } = jwt

    const token = sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn: '1d',
    })

    const { password: _, ...userWithoutPassword } = user

    response.json({ token, user: userWithoutPassword })
  }
}
