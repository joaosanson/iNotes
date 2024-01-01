import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

import { CreateCustomerController } from './controllers/CreateCustomerController'
import { ListCustomersController } from './controllers/ListCustomersController'
import { DeleteCustomerController } from './controllers/DeleteCustomerController'

export async function routes(fastify: FastifyInstance) {
  fastify.get('/teste', async () => {
    return { ok: true }
  })

  fastify.post(
    '/customer',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateCustomerController().handle(request, reply)
    },
  )

  fastify.get(
    '/customers',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListCustomersController().handle(request, reply)
    },
  )

  fastify.delete(
    '/customer',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteCustomerController().handle(request, reply)
    },
  )
}
