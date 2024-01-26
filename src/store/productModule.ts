import type { Product } from '@/types/product'
import axios from 'axios'

export default {
  state: {
    products: [],
    resultProduct: false,
    promptDialog: false
  },
  mutations: {
    setProducts(state: { products: Product[] }, products: Product[]) {
      state.products = products
    },
    setAddLoadingProducts(state: { resultProduct: boolean }, item: boolean) {
      state.resultProduct = item
    },
    setPromptDialog(state: { promptDialog: boolean }, item: boolean) {
      state.promptDialog = item
    }
  },
  getters: {
    //all computed get products
    getAllProducts(state: { products: Product[] }) {
      return state.products
    },

    //handle prompt dialog
    getPromptDialogProducts(state: { promptDialog: boolean }) {
      return state.promptDialog
    },

    //handle loading products
    getAddLoadingProducts(state: { resultProduct: boolean }) {
      return state.resultProduct
    }
  },

  actions: {
    //Fetch Products start
    async fetchProduct(context: {
      commit: (arg0: string, arg1: Product[]) => void
    }): Promise<void> {
      try {
        await axios.get<Product[]>('http://94.158.54.194:9092/api/product').then((response) => {
          context.commit('setProducts', response.data), console.log(response.data)
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    //Fetch Products end

    //Added Products start
    async addProducts(
      context: {
        dispatch(arg0: string): unknown
        commit: (arg0: string, arg1: boolean) => void
      },
      obj: Product
    ) {
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
    },
    //Added Products end

    //Delete Products start
    async deleteProducts(
      context: {
        dispatch(arg0: string): unknown
        commit: (arg0: string, arg1: boolean) => void
      },
      id: number
    ) {
      try {
        await axios.delete(`http://94.158.54.194:9092/api/product/${id}`).then((response) => {
          if (response.data) {
            context.commit('setAddLoadingProducts', true)
          }
          console.log(response)
        })
        context.dispatch('fetchProduct')
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    //Delete Products end

    //Update product start
    async updateProducts(
      context: {
        dispatch(arg0: string): unknown
        commit: (arg0: string, arg1: boolean) => void
      },
      obj: { id: number; obj: Product }
    ) {
      try {
        console.log('obj', obj)
        await axios
          .put('http://94.158.54.194:9092/api/product', {
            id: obj.id,
            name_uz: obj.obj.name_uz,
            product_type_id: obj.obj.product_type_id,
            cost: obj.obj.cost,
            address: obj.obj.address,
            created_date: obj.obj.created_date
          })
          .then((response) => {
            if (response.status === 200) {
              context.commit('setAddLoadingProducts', true)
            }
            console.log(response)
          })
        context.dispatch('fetchProduct')
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    //Update product start
  }
}
