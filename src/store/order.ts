import { orderApi } from 'api'
import * as Params from 'api/order/params'
import { GetOrderRes } from 'api/order/responses'

class OrderStore {
  async getOrder(params: Params.GetOrderReq) {
    const defalutRes: GetOrderRes = {
      list: [],
      total_count: 0,
      total_page: 1,
    }
    const res = await orderApi.getOrder(params)
    if (res.success) {
      if (res.data.list) {
        return res.data
      }
      return { ...res.data, ...defalutRes }
    }
    return defalutRes
  }

  async addOrder(params: Params.AddOrderReq) {
    return await orderApi.addOrder(params)
  }

  async updateOrder(params: Params.UpdateOrderReq) {
    return await orderApi.updateOrder(params)
  }

  async deleteOrder(params: Params.DeleteOrderReq) {
    return await orderApi.deleteOrder(params)
  }
}

export default OrderStore
