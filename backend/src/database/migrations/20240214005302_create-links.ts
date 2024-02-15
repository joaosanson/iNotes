import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('links', (table) => {
    table.uuid('id').primary()
    table.text('url').notNullable()
    table.text('note_id').references('id').inTable('notes').onDelete('CASCADE')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('links')
}
