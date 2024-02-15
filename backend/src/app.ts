import fastify from 'fastify'

import { usersRoutes } from './routes/users'
import { errorHandler } from './utils/AppError'
import { notesRoutes } from './routes/notes'

export const app = fastify()
app.setErrorHandler(errorHandler)
app.register(usersRoutes, {
  prefix: 'users',
})

app.register(notesRoutes, {
  prefix: 'notes',
})
