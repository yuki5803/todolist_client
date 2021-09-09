import { AxiosError, AxiosPromise } from 'axios'
import { FailRes, SuccessRes } from './response'

export const warpSend = async <T>(
  //eslint-disable-next-line
  request: <T>() => AxiosPromise<any>
): Promise<SuccessRes<any> | FailRes> => {
  try {
    const res = await request<T>()
    return res.data
  } catch (err) {
    const e = err as AxiosError
    if (e.response) {
      return e.response.data
    }
    return {
      success: false,
      err_msg: '请求失败！',
    }
  }
}
