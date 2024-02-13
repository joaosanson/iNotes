import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import crypto from 'node:crypto'
import { hash, compare } from 'bcrypt'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const users = await knex('users').select()

    reply.send(users)
  })

  app.get('/:id', async (request, reply) => {
    const getUsersParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getUsersParamsSchema.parse(request.params)

    const user = await knex('users').select().where({ id })

    if (user.length === 0) {
      throw new Error('User not found.')
    }
    reply.send(user)
  })

  app.post('/', async (request, reply) => {
    const createUsersBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { name, email, password } = createUsersBodySchema.parse(request.body)
    const hashedPassword = await hash(password, 8)
    const user = await knex('users').select().where({ email })

    if (user.length !== 0) {
      throw new Error('Email already in use.')
    }

    await knex('users').insert({
      id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
    })

    reply.status(201).send({ message: 'User created successfully!' })
  })

  app.put('/:id', async (request, reply) => {
    const getUsersParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const getUsersBodySchema = z
      .object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        oldPassword: z.string(),
      })
      .partial()

    const body = getUsersBodySchema.parse(request.body)

    if (Object.keys(body).length === 0) {
      throw new Error('One of the fields must be defined.')
    }

    const { id } = getUsersParamsSchema.parse(request.params)
    const user = await knex('users').select().where({ id }).first()

    if (!user) {
      throw new Error('User not found.')
    }

    if (body.email) {
      const { email } = body
      const checkEmail = await knex('users')
        .select()
        .where({ email })
        .andWhereNot({ id })

      if (Object.keys(checkEmail).length > 0) {
        throw Error('Email already in use.')
      }
    }
    if (body.password && !body.oldPassword) {
      throw new Error(
        'Old password must be informed to change current password.',
      )
    }

    if (body.password && body.oldPassword) {
      const checkOldPassword = await compare(body.oldPassword, user.password)
      if (!checkOldPassword) {
        throw new Error('Password incorrect.')
      }
      const hashedPassword = await hash(body.password, 8)
      body.password = hashedPassword
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { oldPassword, ...bodyWithoutOldPassword } = body

    await knex('users')
      .update({ ...bodyWithoutOldPassword, updated_at: knex.fn.now() })
      .where({ id })

    reply.send()
  })

  app.delete('/:id', async (request, reply) => {
    const getUsersParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getUsersParamsSchema.parse(request.params)

    const user = await knex('users').select().where({ id })

    if (user.length === 0) {
      throw Error('User not found.')
    }

    await knex('users').delete().where({ id })

    reply.status(200).send({
      message: 'User deleted successfully.',
    })
  })
}
