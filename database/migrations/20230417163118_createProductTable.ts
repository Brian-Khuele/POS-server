import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('products', (table) => {
    table.increments('product_id')
    table.string('product_name').notNullable()
    table.string('type').notNullable()
    table.integer('default_qty').defaultTo(0)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('products')
}
