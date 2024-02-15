import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tags', (table) => {
    table.uuid('id').primary()
    table.text('name').notNullable()
    table.text('user_id').references('id').inTable('users')
    table.text('note_id').references('id').inTable('notes').onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tags')
}
