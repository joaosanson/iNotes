import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { CustomFastifyRequest } from '../@types/fastify'
import { ensureAuth } from '../middlewares/ensureAuth'

export async function tagsRoutes(app: FastifyInstance) {
  app.get(
    '/',
    { preHandler: [ensureAuth] },
    async (request: CustomFastifyRequest, reply) => {
      const getUserSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getUserSchema.parse(request.user)

      const tags = await knex('tags').select().where({ user_id: id })

      if (Object.keys(tags).length === 0) {
        throw Error('Tag not found.')
      }

      reply.send(tags)
    },
  )
}
