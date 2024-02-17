import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { compare } from 'bcrypt'

export async function sessionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createBodySchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = createBodySchema.parse(request.body)

    const user = await knex('users').select().where({ email }).first()

    if (!user) {
      throw Error('Email and/or password incorrect.')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw Error('Email and/or password incorrect.')
    }

    reply.send({ user, email, password })
  })
}
