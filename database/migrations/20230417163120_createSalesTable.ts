import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('sales', (table) => {
    table.increments('sale_id')
    table.timestamp('sale_date').defaultTo(knex.fn.now())
    table.integer('store_id').unsigned()
    table.integer('product_id').unsigned()
    table.integer('user_id').unsigned()
    table.integer('qty').notNullable().defaultTo(0)
    table.integer('order_status').notNullable().defaultTo(0)
    
    table.foreign('store_id').references('store_id').inTable('store')
    table.foreign('product_id').references('product_id').inTable('products')
    table.foreign('user_id').references('user_id').inTable('sys_user')

  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('running_stock')
}
