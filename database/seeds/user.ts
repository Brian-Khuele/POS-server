import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('sys_user').del()

  // Inserts seed entries
  await knex('sys_user').insert([
    {
      firstName: 'admin',
      lastName: 'user',
      email: 'admin@example.com',
      password: '$2b$12$U9KIMflyCgFkrzWrz1Q7CuEAhXiAs1M10XlsbZE6sF5xhqeXX2xFi',
      hasResetDefaultPassword: true,
      userType: 'admin',
      active: true,
    },
    {
      firstName: 'waiter',
      lastName: 'user',
      email: 'waiter@example.com',
      password: '$2b$12$U9KIMflyCgFkrzWrz1Q7CuEAhXiAs1M10XlsbZE6sF5xhqeXX2xFi',
      hasResetDefaultPassword: true,
      userType: 'waiter',
      active: true,
    },
    {
      firstName: 'station',
      lastName: 'user',
      email: 'station@example.com',
      password: '$2b$12$U9KIMflyCgFkrzWrz1Q7CuEAhXiAs1M10XlsbZE6sF5xhqeXX2xFi',
      hasResetDefaultPassword: true,
      userType: 'station',
      active: true,
    },
  ])
}
