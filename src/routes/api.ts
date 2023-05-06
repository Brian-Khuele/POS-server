import { Router } from 'express'
//import jetValidator from 'jet-validator'

//import adminMw from './middleware/adminMw'
import Paths from './constants/Paths'
//import { IUser } from '@src/models/User'
import AuthRoutes from './AuthRoutes'
import UserRoutes from './UserRoutes'
import ProductRoutes from './ProductRoutes'
import StockRoutes from './StockRoutes'
import SalesRoutes from './SalesRoutes'

// **** Variables **** //

const apiRouter = Router()
//const validate = jetValidator()

// **** Setup AuthRouter **** //

const authRouter = Router()
// Login user
authRouter.post(Paths.Auth.Login, AuthRoutes.login)

// Logout user
authRouter.get(Paths.Auth.Logout, AuthRoutes.logout)

// Add AuthRouter
apiRouter.use(Paths.Auth.Base, authRouter)

// ** Add UserRouter ** //

const userRouter = Router()

/* USERS */
userRouter.get(Paths.Users.Get, UserRoutes.getAll)

// Add one user
userRouter.post(Paths.Users.Add, UserRoutes.add)

// Delete one user
userRouter.delete(Paths.Users.Delete, UserRoutes.delete)

// Add UserRouter
apiRouter.use(Paths.Users.Base , userRouter)

// **** Products routes **** //
const productsRouter = Router()

productsRouter.get(Paths.Products.Get, ProductRoutes.getAll)

// Add one product
productsRouter.post(Paths.Products.Add, ProductRoutes.addORUpdate)

// Delete one product
productsRouter.delete(Paths.Products.Delete, ProductRoutes.delete)

// Add productRouter
apiRouter.use(Paths.Products.Base , productsRouter)

// **** Stock routes **** //
const stockRouter = Router()

stockRouter.get(Paths.Stock.Get, StockRoutes.getAll)

// Add one Stock
stockRouter.post(Paths.Stock.Add, StockRoutes.addORUpdate)

// Delete one Stock
stockRouter.delete(Paths.Stock.Delete, StockRoutes.delete)

// Add productRouter
apiRouter.use(Paths.Stock.Base , stockRouter)

// **** Sales routes **** //
const salesRouter = Router()

salesRouter.get(Paths.Sale.Get, SalesRoutes.getAll)

// Add one Sales
salesRouter.post(Paths.Sale.Add, SalesRoutes.addORUpdate)
salesRouter.post(Paths.Sale.Prepare, SalesRoutes.prepare)
salesRouter.post(Paths.Sale.Collect, SalesRoutes.collect)
salesRouter.post(Paths.Sale.Deliver, SalesRoutes.deliver)

// Delete one Sales
salesRouter.delete(Paths.Sale.Delete, SalesRoutes.delete)

// Add SalesRouter
apiRouter.use(Paths.Sale.Base , salesRouter)


// **** Export default **** //

export default apiRouter
