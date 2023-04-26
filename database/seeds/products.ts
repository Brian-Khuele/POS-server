import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('products').del()

  // Inserts seed entries
  await knex('products').insert([
    { product_name: 'GUM MINT', default_qty: 0, type: 'Flavour' },
    { product_name: 'MINT CREAM', default_qty: 0, type: 'Flavour' },
    { product_name: 'LADY KILLER', default_qty: 0, type: 'Flavour' },
    { product_name: 'JOKER77', default_qty: 0, type: 'Flavour' },
    { product_name: 'SHEIK MONEY', default_qty: 0, type: 'Flavour' },
    { product_name: 'COCONUT CHARCOAL', default_qty: 3, type: 'Coal' },
    { product_name: 'FOIL', default_qty: 1, type: 'Hardware' },
    { product_name: 'MOUTHPIECE', default_qty: 3, type: 'Hardware' },
    { product_name: 'HUBBLY', default_qty: 1, type: 'Hardware' },
    { product_name: 'HMD', default_qty: 1, type: 'Hardware' },
    { product_name: 'KOPS', default_qty: 1, type: 'Hardware' },
  ])
}
