import { warpSend } from './request'
import { FailRes, SuccessRes } from './response'
import { axiosInstance } from './setting'

// post方法参数
type PostProps = {
  url: string
  body: any
}

class ApiBase {
  async post<T = any>({ url, body }: PostProps) {
    const res = await warpSend<SuccessRes<T> | FailRes>(
      async () => await axiosInstance.post(url, body)
    )
    if (res.success) {
      return res as SuccessRes<T>
    } else {
      return res as FailRes
    }
  }
}

export default ApiBase
