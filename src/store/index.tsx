import React from 'react'
import createStore from './createStore'

export type Stores = ReturnType<typeof createStore>

const storeContext = React.createContext<Stores | null>(null)

export const StoreProvider: React.FC<{}> = ({ children }) => {
  const store = createStore()
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}

const useStore = () => {
  const store = React.useContext(storeContext)
  if (!store) {
    throw new Error('useStore 只能在被StoreProvider包裹的组件内使用！')
  }
  return store
}

export default useStore
