import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'
import { fromZodError } from 'zod-validation-error'

export const errorHandler = (
  error: z.ZodError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const validationError = fromZodError(error)

  if (validationError.name === 'ZodValidationError') {
    reply.status(400).send(validationError.toString())
  } else {
    const validationError = fromZodError(error)

    reply.status(500).send(validationError.toString())
  }
}
