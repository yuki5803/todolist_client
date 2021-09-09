import { type } from 'os'

export type PaginationReq = {
  page?: number
  page_size?: number
}

export type PaginationRes = {
  total_page?: number
  total_count?: number
}

export type ListWarp<T> = {
  list: T[]
}
