// 响应类型
export type SuccessRes<T> = {
  success: true
  data: T
}

export type FailRes = {
  success: false
  err_msg: string
}
