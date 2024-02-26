import { describe, beforeAll, afterAll, beforeEach, it } from 'vitest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'
import request from 'supertest'

interface UserSchema {
  user: {
    id: string
    name: string
    email: string
    password: string
    avatar?: string
    created_at: string
    updated_at: string
  }
  token: string
}

describe('Notes routes', () => {
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

  it('should be able create a note', async () => {
    await request(app.server).post('/users').send({
      name: 'john',
      email: 'johndoe@email.com',
      password: 'john123',
    })

    const userData = await request(app.server).post('/sessions').send({
      email: 'johndoe@email.com',
      password: 'john123',
    })

    const userDataResponse: UserSchema = JSON.parse(userData.text)

    const { token } = userDataResponse

    await request(app.server)
      .post('/notes')
      .set('Authorization', `bearer ${token}`)
      .send({
        title: 'test',
        description: 'test',
        tags: ['node', 'express'],
        links: ['link1', 'link2'],
      })
      .expect(201)
  })

  it('should be able show notes', async () => {
    await request(app.server).post('/users').send({
      name: 'john',
      email: 'johndoe@email.com',
      password: 'john123',
    })

    const userData = await request(app.server).post('/sessions').send({
      email: 'johndoe@email.com',
      password: 'john123',
    })

    const userDataResponse: UserSchema = JSON.parse(userData.text)

    const { token } = userDataResponse

    await request(app.server)
      .get('/notes')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
  })
})
