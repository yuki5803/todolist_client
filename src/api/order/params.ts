import { PaginationReq } from 'model/common'
import { StatusEnum } from 'model/order'

export type GetOrderReq = PaginationReq

export type AddOrderReq = {
  order_no: string
  user_name: string
  amount: number
  status: StatusEnum
  file_url: string
}

export type UpdateOrderReq = {
  order_no: string
  amount: number
  status: StatusEnum
  file_url: string
}

export type DeleteOrderReq = {
  id: number
}
