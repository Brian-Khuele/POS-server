import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('store').del()

  // Inserts seed entries
  await knex('store').insert([
    { region_id: 1, store_name: 'EKHAYA' },
    { region_id: 1, store_name: 'THE SOCIAL CLUB' },
    { region_id: 1, store_name: 'CHEEKYS' },
    { region_id: 2, store_name: 'AMAROS' },
  ])
}
