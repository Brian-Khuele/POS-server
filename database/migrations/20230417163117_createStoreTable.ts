import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('store', (table) => {
    table.increments('store_id')
    table.string('store_name')
    table.integer('region_id').unsigned()
    table.foreign('region_id').references('regions.region_id')
  })
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('store')
}
