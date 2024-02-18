import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import crypto from 'node:crypto'
import { z } from 'zod'
import { CustomFastifyRequest } from '../@types/fastify'
import { ensureAuth } from '../middlewares/ensureAuth'

export async function notesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', ensureAuth)

  app.get('/', async (request: CustomFastifyRequest, reply) => {
    const getNotesQuerySchema = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      tags: z.string().optional(),
    })

    const getUserSchema = z.object({
      id: z.string().uuid(),
    })

    const { id: userId } = getUserSchema.parse(request.user)

    const { title, description, tags } = getNotesQuerySchema.parse(
      request.query,
    )

    if (tags) {
      const NoteSchemaObject = z.object({
        id: z.string().uuid(),
        title: z.string(),
        user_id: z.string(),
      })

      const NoteSchema = z.array(NoteSchemaObject)
      const filterTags = tags.split(',').map((tag) => tag.trim())

      const tagsKnexQuery = knex('tags')
        .select(['notes.id', 'notes.title', 'notes.user_id'])
        .where('notes.user_id', userId)
        .whereIn('name', filterTags)
        .innerJoin('notes', 'notes.id', 'tags.note_id')

      if (title) {
        tagsKnexQuery
          .whereLike('notes.title', `%${title}%`)
          .orderBy('notes.title')
      }

      if (description) {
        tagsKnexQuery.whereLike('notes.description', `%${description}%`)
      }

      const notesFromKnex = await tagsKnexQuery

      const notes = NoteSchema.parse(notesFromKnex)

      const userTags = await knex('tags').where({ user_id: userId })
      const notesWithTags = notes.map((note) => {
        const noteTags = userTags.filter((tag) => tag.note_id === note.id)

        return {
          ...note,
          tags: noteTags,
        }
      })

      reply.send(notesWithTags)
    } else {
      try {
        const notesKnexQuery = knex('notes')
          .select()
          .where({ user_id: userId })
          .orderBy('created_at')

        if (title) {
          notesKnexQuery.whereLike('title', `%${title}%`)
        }
        if (description) {
          notesKnexQuery.whereLike('description', `%${description}%`)
        }
        // console.log('Knex Query:', notesKnexQuery.toString())
        const notes = await notesKnexQuery.orderBy('created_at')
        reply.send(notes)
      } catch (error) {
        throw new Error()
      }
    }
  })

  app.get('/:id', async (request, reply) => {
    const getNotesParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getNotesParamsSchema.parse(request.params)

    let notes

    try {
      notes = await knex('notes').select().where({ id }).first()
    } catch (err) {
      throw Error('Note not found.')
    }

    const tags = await knex('tags')
      .select()
      .where({ note_id: id })
      .orderBy('name')

    const links = await knex('links')
      .select()
      .where({ note_id: id })
      .orderBy('created_at')

    reply.send({ ...notes, tags, links })
  })

  app.post('/', async (request: CustomFastifyRequest, reply) => {
    const createNotesBodySchema = z.object({
      title: z.string(),
      description: z.string(),
      tags: z.string().array(),
      links: z.string().array(),
    })
    const getUserSchema = z.object({
      id: z.string().uuid(),
    })

    const { title, description, tags, links } = createNotesBodySchema.parse(
      request.body,
    )

    const { id: userId } = getUserSchema.parse(request.user)

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

  app.delete('/:id', async (request, reply) => {
    const getUsersParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getUsersParamsSchema.parse(request.params)

    const note = await knex('notes').select().where({ id })

    if (note.length === 0) {
      throw Error('Note not found.')
    }

    await knex('notes').delete().where({ id })

    reply.status(200).send('Note deleted successfully.')
  })
}
