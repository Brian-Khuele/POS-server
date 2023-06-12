/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import PwdUtil from '@src/util/PwdUtil'
import { tick } from '@src/util/misc'

import HttpStatusCodes from '@src/constants/HttpStatusCodes'
import { RouteError } from '@src/other/classes'
import { IUser } from '@src/models/User'
import { db } from '@src/server'

// **** Variables **** //

// Errors
export const Errors = {
  Unauth: 'Unauthorized',
  EmailNotFound(email: string) {
    return `User with email "${email}" not found`
  },
} as const

// **** Functions **** //

/**
 * Login a user.
 */
async function login(email: string, password: string): Promise<any> {
  try {
    // Fetch user
    const user = await db('sys_user').select().where({ email: email })

    if (!user) {
      return new RouteError(HttpStatusCodes.UNAUTHORIZED, Errors.EmailNotFound(email))
    }

    // Check password
    const hash = user[0].password ?? '',
      pwdPassed = await PwdUtil.compare(password, hash)

    if (!pwdPassed) {
      // If password failed, wait 500ms this will increase security
      await tick(500)
      throw new RouteError(HttpStatusCodes.UNAUTHORIZED, Errors.Unauth)
    }
    // Return
    return user
  } catch (error) {
    console.log(error)
  }
}

// **** Export default **** //

export default {
  login,
} as const
