import { FastifyInstance } from 'fastify'
import { ensureAuth } from '../middlewares/ensureAuth'
import fastifyStatic from '@fastify/static'
import { UPLOADS_FOLDER } from '../config/upload'
import { z } from 'zod'

export async function filesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', ensureAuth)

  app.register(fastifyStatic, {
    root: UPLOADS_FOLDER,
  })

  app.get('/:id', (request, reply) => {
    const getParamId = z.object({
      id: z.string(),
    })

    const { id } = getParamId.parse(request.params)
    reply.sendFile(id)
  })
}
