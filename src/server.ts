/* eslint-disable no-console */
/* eslint-disable node/no-process-env */
/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import express, { Request, Response, NextFunction } from 'express'
import logger from 'jet-logger'

import 'express-async-errors'

import BaseRouter from '@src/routes/api'

import EnvVars from '@src/constants/EnvVars'
import HttpStatusCodes from '@src/constants/HttpStatusCodes'

import { NodeEnvs } from '@src/constants/misc'
import { RouteError } from '@src/other/classes'
import { knex } from 'knex'
import config from 'knexfile'
import UserService from './services/UserService'

// eslint-disable-next-line max-len, @typescript-eslint/no-unsafe-argument
console.log('env:', process.env.NODE_ENV)
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const db = knex(config[process.env.NODE_ENV || 'development'])
// **** Variables **** //

const app = express()

// **** Setup **** //

// Basic middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(EnvVars.CookieProps.Secret))

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'))
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production) {
  app.use(helmet())
}

// Add APIs, must be after middleware
app.use(BaseRouter)

// Add error handler
app.use(
  (
    err: Error,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) => {
    if (EnvVars.NodeEnv !== NodeEnvs.Test) {
      logger.err(err, true)
    }
    let status = HttpStatusCodes.BAD_REQUEST
    if (err instanceof RouteError) {
      status = err.status
    }
    return res.status(status).json({ error: err.message })
  },
)

export default app
