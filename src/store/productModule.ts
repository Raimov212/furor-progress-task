import type { Product } from '@/types/product'
import axios from 'axios'

export default {
  state: {
    products: [],
    resultProduct: false
  },
  mutations: {
    setProducts(state: { products: Product[] }, products: Product[]) {
      state.products = products
    },
    setAddLoadingProducts(state: { resultProduct: boolean }, item: boolean) {
      state.resultProduct = item
    }
  },
  getters: {
    getAllProducts(state: { products: Product[] }) {
      return state.products
    },
    getAddLoadingProducts(state: { resultProduct: boolean }) {
      return state.resultProduct
    }
  },

  actions: {
    async fetchProduct(context: {
      commit: (arg0: string, arg1: Product[]) => void
    }): Promise<void> {
      try {
        await axios.get<Product[]>('http://94.158.54.194:9092/api/product').then((response) => {
          context.commit('setProducts', response.data), console.log(response.data)
        })
        // console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async addProducts(context: any, obj: Product) {
      console.log('obj', obj)
      try {
        await axios
          .post('http://94.158.54.194:9092/api/product', {
            name_uz: obj.name_uz,
            product_type_id: obj.product_type_id,
            cost: obj.cost,
            address: obj.address,
            created_date: obj.created_date
          })
          .then((response) => {
            if (response.status === 200) {
              context.commit('setAddLoadingProducts', true)
            }
          })
        context.dispatch('fetchProduct')
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }
}
