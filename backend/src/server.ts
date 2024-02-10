import fastify, { FastifyRequest } from 'fastify'
import { env } from './env'

type RequestSchema = FastifyRequest<{
  Params: {
    id: string
    user: string
  }
}>

const app = fastify()

app.get('/users/:id', (request: RequestSchema, reply) => {
  console.log(request.params.id)
  console.log(request.params.user)
  reply.send('Hello World!')
})

app.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP Server running at port ${process.env.PORT}`)
})
