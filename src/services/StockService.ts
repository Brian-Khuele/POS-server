import { IStock } from '@src/models/Stock'
import { db } from '@src/server'

// **** Variables **** //

export const STOCK_NOT_FOUND_ERR = 'Stock not found'
const TABLE_NAME = 'running_stock'

// **** Functions **** //

/**
 * Get one stock.
 */
async function getOne(stock: IStock) {
  return db(TABLE_NAME).select().where({ stock })
}

/**
 * See if a stock with the given id exists.
 */
async function exists(stock: IStock): Promise<boolean> {
  const result = await db(TABLE_NAME).count().where({ stock })
  return result.length > 0
}

/**
 * Get all stocks.
 */
async function getAll() {
  return db(TABLE_NAME).select()
}

/**
 * Add one stock.
 */
function addOrUpdate(stock: IStock) {
  db(TABLE_NAME)
    .insert(stock)
}

/**
 * Delete one stock.
 */
async function delete_(stock: IStock) {
  return db(TABLE_NAME).delete().where({ stock }).returning('*')
}

// **** Export default **** //

export default {
  getOne,
  exists,
  getAll,
  addOrUpdate,
  delete: delete_,
} as const
