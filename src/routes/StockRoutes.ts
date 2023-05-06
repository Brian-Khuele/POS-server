import HttpStatusCodes from '@src/constants/HttpStatusCodes'

import StockService from '@src/services/StockService'
import { IReq, IRes } from './types/express/misc'
import { IStock } from '@src/models/Stock'

// **** Functions **** //

/**
 * Get all products.
 */
async function getAll(_: IReq, res: IRes) {
  const stock = await StockService.getAll()
  return res.status(HttpStatusCodes.OK).json({ stock })
}

/**
 * Get one product.
 */
async function getOne(req: IReq<{ stock: IStock }>, res: IRes) {
  const { stock } = req.body
  await StockService.getOne(stock)
  return res.status(HttpStatusCodes.OK).json({ stock })
}

/**
 * Add or Update one product.
 */
async function addORUpdate(req: IReq<{ stock: IStock }>, res: IRes) {
  const { stock } = req.body
  await StockService.addOrUpdate(stock)
  return res.status(HttpStatusCodes.CREATED).end()
}

/**
 * Delete one product.
 */
async function delete_(req: IReq<{ stock: IStock }>, res: IRes) {
  const { stock } = req.body
  await StockService.delete(stock)
  return res.status(HttpStatusCodes.OK).end()
}

// **** Export default **** //

export default {
  getOne,
  getAll,
  addORUpdate,
  delete: delete_,
} as const
