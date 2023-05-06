import HttpStatusCodes from '@src/constants/HttpStatusCodes'

import SalesService from '@src/services/SalesService'
import { IReq, IRes } from './types/express/misc'
import { ISale } from '@src/models/Sale'

// **** Functions **** //

/**
 * Get all sale/orders.
 */
async function getAll(_: IReq, res: IRes) {
  const sale = await SalesService.getAll()
  return res.status(HttpStatusCodes.OK).json({ sale })
}

/**
 * Get one sale/order.
 */
async function getOne(req: IReq<{ sale: ISale }>, res: IRes) {
  const { sale } = req.body
  await SalesService.getOne(sale)
  return res.status(HttpStatusCodes.OK).json({ sale })
}

/**
 * Add or Update one sale/order.
 */
async function addORUpdate(req: IReq<{ sale: ISale }>, res: IRes) {
  const { sale } = req.body
  await SalesService.addOrUpdate(sale, res)
}

/**
 * Delete one sale/order.
 */
async function delete_(req: IReq<{ sale: ISale }>, res: IRes) {
  const { sale } = req.body
  await SalesService.delete(sale)
  return res.status(HttpStatusCodes.OK).end()
}
/**
 * Prepare the order.
 */
async function prepare(req: IReq<{ sale: ISale }>, res: IRes) {
  const { sale } = req.body
  await SalesService.prepare(sale)
  return res.status(HttpStatusCodes.OK).end()
}
/**
 * Delete one sale/order.
 */
async function collect(req: IReq<{ sale: ISale }>, res: IRes) {
  const { sale } = req.body
  await SalesService.collect(sale)
  return res.status(HttpStatusCodes.OK).end()
}
/**
 * Delete one sale/order.
 */
async function deliver(req: IReq<{ sale: ISale }>, res: IRes) {
  const { sale } = req.body
  await SalesService.deliver(sale)
  return res.status(HttpStatusCodes.OK).end()
}

// **** Export default **** //

export default {
  getOne,
  getAll,
  addORUpdate,
  delete: delete_,
  prepare,
  collect,
  deliver,
} as const
