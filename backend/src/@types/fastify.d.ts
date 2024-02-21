import { FastifyRequest } from 'fastify'

export interface CustomFastifyRequest extends FastifyRequest {
  user?: {
    id: string
  }
  file?: {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
  }
}
