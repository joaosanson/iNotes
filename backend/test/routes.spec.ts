import {
  describe,
  beforeAll,
  afterAll,
  beforeEach,
  it,
  afterEach,
} from 'vitest'
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

beforeAll(async () => {
  await app.ready()
})

beforeEach(() => {
  execSync('npm run knex migrate:latest')
})

afterEach(() => {
  execSync('npm run knex migrate:rollback --all')
})

afterAll(async () => {
  await app.close()
})

describe('Users routes', () => {
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

  it('should be able to change the password of current user', async () => {
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

  it.skip('should be able to change user image', async () => {
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

    const imgPath = `${path.resolve(__dirname, '..', 'test', 'Appearance.png')}`

    await request(app.server)
      .patch('/users/avatar')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'avatar')
      .attach('file', imgPath)
      .expect(200)
  })
})

describe('Notes routes', () => {
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

  it('should be able to show one note', async () => {
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
      .post(`/notes`)
      .set('Authorization', `bearer ${token}`)
      .send({
        title: 'test',
        description: 'test',
        tags: ['node', 'express'],
        links: ['link1', 'link2'],
      })

    const noteData = await request(app.server)
      .get('/notes')
      .set('Authorization', `bearer ${token}`)
      .expect(200)

    const notesResponse = noteData.text
    const [note] = JSON.parse(notesResponse)
    await request(app.server)
      .get(`/notes/${note.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
  })

  it('should be able to delete notes', async () => {
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
      .post(`/notes`)
      .set('Authorization', `bearer ${token}`)
      .send({
        title: 'test',
        description: 'test',
        tags: ['node', 'express'],
        links: ['link1', 'link2'],
      })

    const noteData = await request(app.server)
      .get('/notes')
      .set('Authorization', `bearer ${token}`)
      .expect(200)

    const notesResponse = noteData.text
    const [note] = JSON.parse(notesResponse)
    await request(app.server)
      .delete(`/notes/${note.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
  })
})
