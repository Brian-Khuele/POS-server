/* eslint-disable @typescript-eslint/no-unsafe-return */
import { IUser } from '@src/models/User'
import { db } from '@src/server'

// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(email: string) {
  const user = await db('sys_user').select(['firstName', 'lastName', 'email', 'userType']).where({ email })
  return user
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const user = await db('sys_user').count().where({ user_id: id })
  return user.length > 0
}

/**
 * Get all users.
 */
async function getAll(): Promise<IUser[]> {
  console.log('HUH???')
  const user = await db('sys_user').select(['firstName', 'lastName', 'email', 'userType'])
  return user
}

/**
 * Add one user.
 */
async function add(user: IUser) {
  const response = await db('sys_user').insert(user).returning('user_id')
  return response
}

/**
 * Update a user.
 */
async function update(user: IUser) {
  const response = await db('sys_user').update(user).returning('user_id')
  return response
}

/**
 * Delete one user.
 */
async function delete_(id: number) {
  const response = await db('sys_user').delete().where({ user_id: id }).returning('user_id')
  return response
}

// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const
