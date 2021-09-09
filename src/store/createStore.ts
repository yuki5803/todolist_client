import OrderStore from './order'

const createStore = () => {
  const order = new OrderStore()
  const store = {
    order: order,
  }

  return store
}

export default createStore
