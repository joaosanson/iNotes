import { FastifyInstance } from 'fastify'
import crypto from 'node:crypto'
import { knex } from '../database'
import { z } from 'zod'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const users = await knex('users').select()

    reply.send(users)
  })

  app.post('/', async (request, reply) => {
    const createUsersBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { name, email, password } = createUsersBodySchema.parse(request.body)

    await knex('users').insert({
      id: crypto.randomUUID(),
      name,
      email,
      password,
    })

    reply.status(201).send('User created successfully!')
  })
}
