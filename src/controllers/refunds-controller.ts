import { Request, Response } from 'express'

export class RefundsController {
  async create(request: Request, response: Response) {
    response.json({ message: 'ok' })
  }
}
