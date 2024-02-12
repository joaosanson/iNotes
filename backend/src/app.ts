import fastify from 'fastify'

import { usersRoutes } from './routes/users'
import { errorHandler } from './utils/AppError'

export const app = fastify()
app.setErrorHandler(errorHandler)
app.register(usersRoutes, {
  prefix: 'users',
})
