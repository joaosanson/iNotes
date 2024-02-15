import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import crypto from 'node:crypto'
import { z } from 'zod'

export async function notesRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const notes = await knex('notes').select()

    reply.send(notes)
  })

  app.get('/:id', async (request, reply) => {
    const getNotesParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getNotesParamsSchema.parse(request.params)

    const notes = await knex('notes').select().where({ id })
    if (notes.length === 0) {
      throw Error('Note not found.')
    }
    reply.send(notes)
  })

  app.post('/:id', async (request, reply) => {
    const createNotesBodySchema = z.object({
      title: z.string(),
      description: z.string(),
      tags: z.string().array(),
      links: z.string().array(),
    })

    const { title, description, tags, links } = createNotesBodySchema.parse(
      request.body,
    )

    const getNotesParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const params = getNotesParamsSchema.parse(request.params)
    const userId = params.id

    const noteId = crypto.randomUUID()

    await knex('notes').insert({
      id: noteId,
      title,
      description,
      user_id: userId,
    })

    const linksInsert = links.map((link) => {
      return {
        id: crypto.randomUUID(),
        url: link,
        note_id: noteId,
      }
    })

    await knex('links').insert(linksInsert)

    const tagsInsert = tags.map((name) => {
      return {
        id: crypto.randomUUID(),
        name,
        user_id: userId,
        note_id: noteId,
      }
    })

    await knex('tags').insert(tagsInsert)

    reply.status(201).send()
  })
}
