import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('running_stock', (table) => {
    table.increments('stock_id')
    table.integer('region_id').unsigned()
    table.integer('product_id').unsigned()
    table.integer('user_id').unsigned()
    table.integer('qty_opening').notNullable().defaultTo(0)
    table.integer('qty_received').notNullable().defaultTo(0)    
    table.integer('qty_closing').notNullable().defaultTo(0)    
    table.integer('qty_sold').notNullable().defaultTo(0)    
    table.foreign('region_id').references('region_id').inTable('regions')
    table.foreign('product_id').references('product_id').inTable('products')
    table.foreign('user_id').references('user_id').inTable('sys_user')

    table.timestamps(false, true, false)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('running_stock')
}
