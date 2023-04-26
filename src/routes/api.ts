import { Router } from 'express'
import jetValidator from 'jet-validator'

import adminMw from './middleware/adminMw'
import Paths from './constants/Paths'
//import { IUser } from '@src/models/User'
import AuthRoutes from './AuthRoutes'
import UserRoutes from './UserRoutes'

// **** Variables **** //

const apiRouter = Router()
const validate = jetValidator()

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

// Get all users
userRouter.get('/test', (req, res)=>{
  res.json({message: 'WHAT THE FUCK???'})
})

userRouter.get(Paths.Users.Get, UserRoutes.getAll)

// Add one user
userRouter.post(Paths.Users.Add, UserRoutes.add)

// Update one user
userRouter.put(Paths.Users.Update, UserRoutes.update)

// Delete one user
userRouter.delete(Paths.Users.Delete, UserRoutes.delete)

// Add UserRouter
apiRouter.use(Paths.Users.Base , userRouter)

// **** Export default **** //

export default apiRouter
