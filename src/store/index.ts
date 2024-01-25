import { createStore } from 'vuex'
import productModule from './productModule'

export const store = createStore({
  modules: {
    product: productModule
  }
})
