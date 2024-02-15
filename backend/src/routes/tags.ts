import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

export async function tagsRoutes(app: FastifyInstance) {
  app.get('/:id', async (request, reply) => {
    const getTagsParams = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTagsParams.parse(request.params)

    const tags = await knex('tags').select().where({ user_id: id })

    if (Object.keys(tags).length === 0) {
      throw Error('Tag not found.')
    }

    reply.send(tags)
  })
}
