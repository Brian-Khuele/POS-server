export interface ISale {
    sale_id?: number,
    sale_date?: Date,
    store_id: number,
    product_id: number,
    user_id: number,
    qty: number,
    order_status: number,
    order_number: string
}