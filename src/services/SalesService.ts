import { ISale } from '@src/models/Sale'
import { db } from '@src/server'
import { ORDER_STATUS } from '@src/routes/constants/OrderStatus'
import { IStock } from '@src/models/Stock'
import { IRes } from '@src/routes/types/express/misc'

import HttpStatusCodes from '@src/constants/HttpStatusCodes'

// **** Variables **** //

export const SALE_NOT_FOUND_ERR = 'Sale not found'
const TABLE_NAME = 'sales'

// **** Functions **** //

/**
 * Get one sale.
 */
async function getOne(sale: ISale) {
  return db(TABLE_NAME).select().where({ order_number: sale.order_number })
}

/**
 * See if a sale with the given id exists.
 */
async function exists(sale: ISale): Promise<boolean> {
  const result = await db(TABLE_NAME).count().where({ order_number: sale.order_number })
  return result.length > 0
}

/**
 * Get all sales.
 */
async function getAll() {
  return db(TABLE_NAME).select()
}

/**
 * Add one sale.
 */
async function addOrUpdate(sale: ISale, res: IRes) {
  try {
    //check how much stock we have before we insert
    /* 1. Get product quantity where closing quantity is ZERO. 
        This means we haven't done stock taking so the opening + received stock is till active
    */
    const stock = (await db('running_stock').select().where({ product_id: sale.product_id, qty_closing: 0 })) as [IStock]
    if (!stock[0]) {
      return res.sendStatus(HttpStatusCodes.NOT_FOUND).send({ message: 'Cannot find stock for this product' })
    }

    /* 
    2. Count how many products we have sold so far
  */

    const availableStock = stock[0].qty_opening + stock[0].qty_received - stock[0].qty_sold

    /* TODO: ADD STOCK ALERT LOGIC HERE. NOTIFY MANAGER WHEN STOCK THRESHOLD IS REACHED */
    if (availableStock === 0) {
      //We're out of stock!!!!
      return res.sendStatus(HttpStatusCodes.NOT_FOUND).send({ message: 'This product is OUT OF STOCK!' })
    }

    //check is requested quantity is more than what's available
    if (sale.qty > availableStock) {
      return res.sendStatus(HttpStatusCodes.BAD_REQUEST).json({ message: 'Requested quantity exceeds available stock!' })
    }

    //MAKE THE SALE!!! SAVE TO DB!!!
    await db(TABLE_NAME)
      .insert({ ...sale, order_status: ORDER_STATUS.RECEIVED, order_number: sale.order_number })
      .onConflict('order_number')
      .merge(sale)

    //UPDATE THE STOCK TABLE!!!
    await db('running_stock')
      .update({ qty_sold: stock[0].qty_sold + sale.qty })
      .where({ product_id: sale.product_id, qty_closing: 0 })

    return res.status(HttpStatusCodes.CREATED).end()
  } catch (error) {
    console.error(error)
  }
}
/**
 * Start preparing the order.
 */
function prepare(sale: ISale) {
  return db(TABLE_NAME)
    .update({ ...sale, order_status: ORDER_STATUS.IN_PROGRESS })
    .where({ order_number: sale.order_number })
}
/**
 * Add one sale.
 */
function collect(sale: ISale) {
  return db(TABLE_NAME)
    .update({ ...sale, order_status: ORDER_STATUS.COLLECTED })
    .where({ order_number: sale.order_number })
}
/**
 * Add one sale.
 */
function deliver(sale: ISale) {
  return db(TABLE_NAME)
    .update({ ...sale, order_status: ORDER_STATUS.DELIVERED })
    .where({ order_number: sale.order_number })
}

/**
 * Delete one sale.
 */
async function delete_(sale: ISale) {
  return db(TABLE_NAME).delete().where({ order_number: sale.order_number }).returning('*')
}

// **** Export default **** //

export default {
  getOne,
  exists,
  getAll,
  addOrUpdate,
  delete: delete_,
  prepare,
  collect,
  deliver,
} as const
