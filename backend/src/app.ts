import fastify from 'fastify'

import { errorHandler } from './utils/AppError'
import { usersRoutes } from './routes/users'
import { notesRoutes } from './routes/notes'
import { tagsRoutes } from './routes/tags'

export const app = fastify()
app.setErrorHandler(errorHandler)
app.register(usersRoutes, {
  prefix: 'users',
})

app.register(notesRoutes, {
  prefix: 'notes',
})

app.register(tagsRoutes, {
  prefix: 'tags',
})
