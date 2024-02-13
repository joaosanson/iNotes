import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'
import { fromZodError } from 'zod-validation-error'

export const errorHandler = (
  error: FastifyError | z.ZodError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error instanceof z.ZodError) {
    const validationError = fromZodError(error)

    if (validationError.name === 'ZodValidationError') {
      reply.status(400).send(validationError.toString())
    } else {
      reply.status(500).send(validationError.toString())
    }
  } else {
    if (error.message === 'User not found.') {
      error.statusCode = 404
      reply.status(error.statusCode).send(error)
    }
    if (
      error.message ===
      'Old password must be informed to change current password.'
    ) {
      error.statusCode = 400
      reply.status(error.statusCode).send(error)
    }
    if (error.message === 'Password incorrect.') {
      error.statusCode = 400
      reply.status(error.statusCode).send(error)
    }
    if (error.message === 'Email already in use.') {
      error.statusCode = 409
      reply.status(error.statusCode).send(error)
    }
    if (error.message === 'One of the fields must be defined.') {
      error.statusCode = 404
      reply.status(error.statusCode).send(error)
    } else {
      reply.status(500).send(error)
    }
  }
}
