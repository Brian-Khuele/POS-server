import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('sys_user', (table) => {
    table.increments('user_id').primary()
    table.string('firstName').notNullable()
    table.string('lastName').notNullable()
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.boolean('hasResetDefaultPassword').notNullable()
    table.string('userType').notNullable()
    table.boolean('active')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('sys_user')
}
