import { IProduct } from '@src/models/Product'
import { db } from '@src/server'

// **** Variables **** //

export const PRODUCT_NOT_FOUND_ERR = 'Product not found'
const TABLE_NAME = 'products'

// **** Functions **** //

/**
 * Get one product.
 */
async function getOne(product_name: string) {
  return db(TABLE_NAME).select().whereILike({ product_name })
}

/**
 * See if a product with the given id exists.
 */
async function exists(id: number): Promise<boolean> {
  const product = await db(TABLE_NAME).count().where({ id })
  return product.length > 0
}

/**
 * Get all products.
 */
async function getAll() {
  return db(TABLE_NAME).select()
}

/**
 * Add one product.
 */
function addOrUpdate(product: IProduct) {
  return db(TABLE_NAME).insert(product).returning('product_name')
}

/**
 * Delete one product.
 */
async function delete_(id: number) {
  return db(TABLE_NAME).delete().where({ product_id: id }).returning('product_name')
}

// **** Export default **** //

export default {
  getOne,
  exists,
  getAll,
  addOrUpdate,
  delete: delete_,
} as const
