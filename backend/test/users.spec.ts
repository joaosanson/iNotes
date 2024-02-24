import { describe, beforeAll, afterAll, beforeEach, it } from 'vitest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'
import request from 'supertest'
import path from 'node:path'

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

    const userDataResponse: UserSchema = JSON.parse(userData.text)

    const { token } = userDataResponse

    await request(app.server)
      .get('/users')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
  })

  it('should be able change the password of current user', async () => {
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
      .put('/users')
      .set('Authorization', `bearer ${token}`)
      .send({
        name: 'john',
        email: 'johndoe@email.com',
        password: 'john1',
        oldPassword: 'john123',
      })
      .expect(200)
  })

  it.skip('should be able change user image', async () => {
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

    const imgFile = `${path.resolve(__dirname, 'Appearance.png')}`

    console.log(imgFile)

    await request(app.server)
      .patch('/users/avatar')
      .set('Authorization', `bearer ${token}`)
      .field('name', 'avatar')
      .attach('file', `${imgFile}`)
      .expect(200)
  })
})
