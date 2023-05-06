import HttpStatusCodes from '@src/constants/HttpStatusCodes'

import ProductService from '@src/services/ProductService'
import { IProduct } from '@src/models/Product'
import { IReq, IRes } from './types/express/misc'

// **** Functions **** //

/**
 * Get all products.
 */
async function getAll(_: IReq, res: IRes) {
  const products = await ProductService.getAll()
  return res.status(HttpStatusCodes.OK).json({ products })
}

/**
 * Get one product.
 */
async function getOne(req: IReq, res: IRes) {
  const products = await ProductService.getOne(req.params.product_name)
  return res.status(HttpStatusCodes.OK).json({ products })
}

/**
 * Add or Update one product.
 */
async function addORUpdate(req: IReq<{ product: IProduct }>, res: IRes) {
  const { product } = req.body
  await ProductService.addOrUpdate(product)
  return res.status(HttpStatusCodes.CREATED).end()
}

/**
 * Delete one product.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id
  await ProductService.delete(id)
  return res.status(HttpStatusCodes.OK).end()
}

// **** Export default **** //

export default {
  getOne,
  getAll,
  addORUpdate,
  delete: delete_,
} as const
