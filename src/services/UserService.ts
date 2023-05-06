import { IUser } from '@src/models/User'
import { RouteError } from '@src/other/classes'
import HttpStatusCodes from '@src/constants/HttpStatusCodes'
import { db } from '@src/server'
import PwdUtil from '@src/util/PwdUtil'

// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found'
const TABLE_NAME = 'sys_user'

// **** Functions **** //

/**
 * Get all users.
 */
function getAll(){
  return db(TABLE_NAME).select(['user_id', 'firstName', 'lastName', 'email', 'hasResetDefaultPassword', 'userType', 'active'])
}

/* 
  Get one user
*/
function getOne(email: string){
  return db(TABLE_NAME).select(['user_id', 'firstName', 'lastName', 'email', 'hasResetDefaultPassword', 'userType', 'active']).where({ email })
}

/**
 * Add one user.
 */
async function addOrUpdate(user: IUser) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const password = await PwdUtil.getHash(user.password || '1235')
  return user.password
    ? db(TABLE_NAME)
      .insert({ ...user, email: user.email, password: password, hasResetDefaultPassword: true, active: true })
      .onConflict('email')
      .merge({ ...user, password: password, active: true })
    : db(TABLE_NAME)
      .insert({ ...user, email: user.email, password: password, hasResetDefaultPassword: false, active: true })
      .onConflict('email')
      .merge({ ...user, password: password, active: true })
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number) {
  const user = await db(TABLE_NAME).count().where({ id })
  if (user.length === 0) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR)
  }
  // Delete user
  return db(TABLE_NAME).delete().where({ user_id: id }).returning('user_id')
}

// **** Export default **** //

export default {
  getOne,
  getAll,
  addOrUpdate,
  delete: _delete,
} as const
