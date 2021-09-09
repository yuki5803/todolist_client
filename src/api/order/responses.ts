import { ListWarp, PaginationRes } from 'model/common'
import { OrderModel } from 'model/order'

export type GetOrderRes = ListWarp<OrderModel> & PaginationRes
