import UserRepo from '@src/repos/UserRepo';
import { IUser } from '@src/models/User';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { db } from '@src/server'
import PwdUtil from '@src/util/PwdUtil'


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<IUser[]> {
  return UserRepo.getAll();
}

/**
 * Add one user.
 */
async function addOne(user: IUser) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const password = await PwdUtil.getHash(user.password ||'1235')
  return user.password ? db('sys_user').insert({...user, password: password, hasResetDefaultPassword: true}) 
    : db('sys_user').insert({...user, password: password, hasResetDefaultPassword: false})
}

/**
 * Update one user.
 */
async function updateOne(user: IUser) {
  const persists = await UserRepo.persists(user.user_id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Return user
  return UserRepo.update(user);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number){
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return UserRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
