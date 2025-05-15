import { Router } from 'express'
import { usersRoutes } from './users-routes'
import { sessionsRoutes } from './sessions-routes'
import { refundsRoutes } from './refunds-routes'
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated'

export const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)

// Authenticated
routes.use(ensureAuthenticated)
routes.use('/refunds', refundsRoutes)
