import { Request, Response } from 'express'

export class UsersController {
  async create(request: Request, response: Response) {
    response.json({ message: 'ok' })
  }
}
