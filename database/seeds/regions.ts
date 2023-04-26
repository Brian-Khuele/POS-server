import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('regions').del()

  // Inserts seed entries
  await knex('regions').insert([
    { region_id: 1, region_name: 'HATFIELD' },
    { region_id: 2, region_name: 'AMAROS' },
  ])
}
