export interface IStock {
    stock_id: number,
    region_id: number,
    product_id: number,
    user_id: number,
    qty_opening: number,
    qty_received: number,
    qty_closed: number,
    qty_sold: number
}