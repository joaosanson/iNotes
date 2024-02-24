import { describe, beforeAll, afterAll, beforeEach, it } from 'vitest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { z } from 'zod'

describe('Users routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new user', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'john',
        email: 'johndoe@email.com',
        password: 'john123',
      })
      .expect(201)
  })

  it('should be able to show the current user', async () => {
    await request(app.server).post('/users').send({
      name: 'john',
      email: 'johndoe@email.com',
      password: 'john123',
    })

    const userData = await request(app.server).post('/sessions').send({
      email: 'johndoe@email.com',
      password: 'john123',
    })

    const userDataSchema = z.object({
      user: z.object({}),
      token: z.string(),
    })

    const userDataParsed = userDataSchema.parse(userData)

    const { token } = userDataParsed

    await request(app.server)
      .get('/users')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
  })
})
