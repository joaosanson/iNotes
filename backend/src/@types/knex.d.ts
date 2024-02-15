// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
      password: string
      created_at?: Date
      updated_at?: Date
    }
    notes: {
      id: string
      title: string
      description: string
      user_id: string
      created_at?: Date
      updated_at?: Date
    }
    tags: {
      id: string
      name: string
      user_id: string
      note_id: string
    }
    links: {
      id: string
      url: string
      note_id: string
    }
  }
}
