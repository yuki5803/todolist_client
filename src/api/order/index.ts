import ApiBase from 'api/apibase/apibase'
import * as Params from 'api/order/params'
import * as Responses from 'api/order/responses'

class OrderApi extends ApiBase {
  addOrder(params: Params.AddOrderReq) {
    return this.post({ url: '/add_order', body: params })
  }

  getOrder(params: Params.GetOrderReq) {
    return this.post<Responses.GetOrderRes>({
      url: '/get_order',
      body: params,
    })
  }

  updateOrder(params: Params.UpdateOrderReq) {
    return this.post({ url: 'update_order', body: params })
  }

  deleteOrder(params: Params.DeleteOrderReq) {
    return this.post({ url: 'delete_order', body: params })
  }
}

export default OrderApi
