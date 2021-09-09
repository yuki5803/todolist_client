export enum StatusEnum {
  Start = '1',
  End = '2',
}

export const StatusMap = {
  [StatusEnum.Start]: '开始',
  [StatusEnum.End]: '结束',
}

export type OrderModel = {
  id: number
  created_at: string
  deleted_at: string
  updated_at: string
  order_no: string
  user_name: string
  amount: number
  status: StatusEnum
  file_url: string
}
