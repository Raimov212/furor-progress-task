import type { GetProductTypes, Product } from '@/types/product'
import axios from 'axios'

export default {
  state: {
    products: [],
    productsType: [],
    resultProduct: false,
    promptDialog: false,
    selectedProduct: undefined,
    loading_products: false,
    pagination_page_obj: {
      page: 1,
      rowsPerPage: 3
    }
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
    },
    setSelectedProduct(state: { selectedProduct: Product }, item: Product) {
      state.selectedProduct = item
    },
    setProductsType(state: { productsType: GetProductTypes[] }, productsType: GetProductTypes[]) {
      state.productsType = productsType
    },
    setLoadingProducts(state: { loading_products: boolean }, item: boolean) {
      state.loading_products = item
    },
    setPaginationPageObj(
      state: { pagination_page_obj: { page: number; rowsPerPage: number } },
      item: { page: number; rowsPerPage: number }
    ) {
      state.pagination_page_obj = item
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
    },

    //handle selected product
    getSelectedProduct(state: { selectedProduct: Product }) {
      return state.selectedProduct
    },

    //get products type
    getProductsType(state: { productsType: GetProductTypes[] }) {
      return state.productsType
    },

    //handle loading products
    getLoadingProducts(state: { loading_products: boolean }) {
      return state.loading_products
    },

    //handle pagination page obj
    getPaginationPageObj(state: { pagination_page_obj: { page: number; rowsPerPage: number } }) {
      return state.pagination_page_obj
    }
  },

  actions: {
    //Fetch Products start
    async fetchProduct(
      context: {
        commit: (
          arg0: string,
          arg1: Product[] | boolean | { page: number; rowsPerPage: number }
        ) => void
      },
      obj?: { page: number; rowsPerPage: number }
    ): Promise<void> {
      context.commit('setLoadingProducts', true)
      context.commit('setPaginationPageObj', obj)

      const params = {
        page: obj.page
      }

      if (obj.rowsPerPage) {
        Object.assign(params, { perPage: obj.rowsPerPage })
      }

      console.log('obj', obj)

      try {
        await axios
          .get(import.meta.env.VITE_API_URL, {
            params
          })
          .then((response) => {
            context.commit('setProducts', response.data)
          })
        // await axios.get<Product[]>(import.meta.env.VITE_API_URL).then((response) => {
        //   context.commit('setProducts', response.data)
        // })
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        context.commit('setLoadingProducts', false)
      }
    },
    //Fetch Products end

    //GET TYPES PRODUCT START
    async getTypeProducts(context: { commit: (arg0: string, arg1: GetProductTypes[]) => void }) {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/get-product-types`).then((response) => {
          context.commit('setProductsType', response.data)
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    //GET TYPES PRODUCT END

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
          .post(import.meta.env.VITE_API_URL, {
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
        await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`).then((response) => {
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
          .put(import.meta.env.VITE_API_URL, {
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
